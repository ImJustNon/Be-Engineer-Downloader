import axios from "axios";
import fs from "fs";
import path from "path";
import { DownloadTS } from "./DownloadTS.class";
import { DecryptTS } from "./DecryptTS.class";
import { Convert } from "./Convert.class";


type BeEngOptionSpecs = {
    startSegment: number;
    url: string;
    identifier: string; // | "<<>>" | "[]" | "$$$";
}

export class BeEngDL {
    private startSegment: number;
    private url: string;
    private identifier: string;

    constructor({startSegment, url, identifier}: BeEngOptionSpecs) {
        this.startSegment = startSegment;
        this.url = url;
        this.identifier = identifier;
    }

    async download(){
        await new DownloadTS().download(this.startSegment, this.url, this.identifier);
    }

    async decrypt(){
        const getKey = fs.readFileSync(path.join(__dirname, "../../enckeybeonline.key")) as Buffer;
        new DecryptTS({key: getKey}).DecryptAndWriteFile();
    }

    async concatAndConvert(){
        const filename = this.url.replace(".ts", "").replace(this.identifier, "").split("/");
        await new Convert().concatAndConvert(decodeURIComponent(filename[filename.length - 1]));
    }
}