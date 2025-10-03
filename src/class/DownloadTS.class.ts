import axios, { AxiosError } from "axios";
import fs from "fs";
import path from "path";
import { PathManager } from "./PathManager.class";


export class DownloadTS extends PathManager {
    constructor(){
        super();
    }

    async download(startSegment: number, url: string, identifier: string){
        let segmentCounting = startSegment;
        while(true){
            try {
                const response = await axios.get(url.replace(identifier, String(segmentCounting)), {
                    responseType: "stream"
                });

                const writer = fs.createWriteStream(path.join(__dirname, "../../cache/stream/encrypted", `stream-segment-${segmentCounting}.ts`));
                response.data.pipe(writer);

                await this.writeResult(writer)
                    .then(() => console.log("write file success : ", segmentCounting))
                    .catch(() => console.log("write file error: ", segmentCounting));
                
                segmentCounting++;
            }
            catch(error: any){
                const err = error as AxiosError;
                if (err.response) {
                    if (err.response.status === 404) {
                        console.log(`[ Info ] Ended Download at segment : ${segmentCounting - 1}`);
                        break;
                    }
                }
                console.log(`[ Error ] Retrying download segment ${segmentCounting}:`, err);
            }
        }
        console.log(`Download completed. Total segments: ${segmentCounting - 1}`);
    }   

    private writeResult(writer: fs.WriteStream): Promise<void>{
        return new Promise((resolve, rejects) => {
            writer.on("finish", () => {
                resolve();
            });
            writer.on("error", () => {
                rejects();
            });
        });
    }
}