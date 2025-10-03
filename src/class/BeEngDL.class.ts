import axios from "axios";
import fs from "fs";
import path from "path";
import { DownloadTS } from "./DownloadTS.class";
import { DecryptTS } from "./DecryptTS.class";
import { Convert } from "./Convert.class";
import { PathManager } from "./PathManager.class";


type BeEngOptionSpecs = {
    startSegment: number;
    url: string;
    identifier: string; // | "<<>>" | "[]" | "$$$";
}

export class BeEngDL extends PathManager {
    private startSegment: number;
    private url: string;
    private identifier: string;

    constructor({startSegment, url, identifier}: BeEngOptionSpecs) {
        super();
        this.startSegment = startSegment;
        this.url = url;
        this.identifier = identifier;
    }

    public async download(){
        await new DownloadTS().download(this.startSegment, this.url, this.identifier);
    }

    public async decrypt(){
        const getKey = this.verifyAndloadKey() as Buffer;
        new DecryptTS({key: getKey}).DecryptAndWriteFile();
    }

    public async concatAndConvert(){
        const filename = this.url.replace(".ts", "").replace(this.identifier, "").split("/");
        await new Convert().concatAndConvert(decodeURIComponent(filename[filename.length - 1]));
    }

    public async verifyAndDeleteCacheAllPath(){
        this.verifyAndloadKey();
        this.verifyEncryptCachePath();
        this.verifyDecryptCachePath();
        this.verifyFFmpegCachePath();
        this.verifyOutputPath();
        this.deleteEncryptCache();
        this.deleteDencryptCache();
        this.deleteFFmpegCache();
    }
}