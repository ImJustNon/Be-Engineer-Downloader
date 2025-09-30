import axios, { AxiosError } from "axios";
import fs from "fs";
import path from "path";


export class DownloadTS {
    constructor(){}

    private deleteCache(){
        try {
            fs.rmSync(path.join(__dirname, "../../cache/stream/encrypted"), { recursive: true, force: true });
            fs.rmSync(path.join(__dirname, "../../cache/stream/decrypted"), { recursive: true, force: true });
            console.log("[ Info ] Deleted /cache/stream dir");
            fs.mkdirSync(path.join(__dirname, "../../cache/stream/encrypted"), { recursive: true });
            fs.mkdirSync(path.join(__dirname, "../../cache/stream/decrypted"), { recursive: true });
            console.log("[ Info ] Created /cache/stream dir");
        }
        catch(e){
            console.log("[ Error ] Fail to delete or create /cache/stream");
        }
    }

    async download(startSegment: number, url: string, identifier: string){
        // Delete Old cache before download
        this.deleteCache();

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