import crypto from "crypto";
import fs from "fs";
import path from "path";
import { PathManager } from "./PathManager.class";

type DecryptTSOptionSpecs = {
    key: string | Buffer;
}

export class DecryptTS extends PathManager {
    private key: string | Buffer;
    private decryptedData: Buffer<ArrayBuffer> | null;

    constructor({key}: DecryptTSOptionSpecs){
        super();
        this.key = key;
        this.decryptedData = null;
    }

    public decrypt(encryptedData: Buffer<ArrayBuffer>, filename: string): Buffer<ArrayBuffer> | null{
        console.log(`[ Info ] Encrypted first byte: 0x${encryptedData[0].toString(16)} (should NOT be 0x47)`);

        const iv = Buffer.alloc(16);
        const decipher = crypto.createDecipheriv('aes-128-cbc', this.key, iv);
        decipher.setAutoPadding(false);

        const decryptedData = Buffer.concat([
            decipher.update(encryptedData),
            decipher.final()
        ]);

        console.log(`[ Info ] Decrypted first byte: 0x${decryptedData[0].toString(16)} (should be 0x47)`);

        if (decryptedData[0] === 0x47) {
            this.decryptedData = decryptedData;
            console.log(`[ Info ] Decrypted : ${filename}`);
            return decryptedData;
        } else {
            this.decryptedData = null;
            console.log(`[ Error ] Fail to decrypt : ${filename}`);
            return null;
        }
    }

    public getDecrypt(){
        return this.decryptedData
    }

    public DecryptAndWriteFile(){

        const files = fs.readdirSync(path.join(__dirname, "../../cache/stream/encrypted")).filter(name => name.startsWith("stream-segment") && name.endsWith(".ts"));
        for(const file of files){
            const readFile = fs.readFileSync(path.join(__dirname, "../../cache/stream/encrypted", file));
            const decryptData = this.decrypt(readFile, file);
            
            if(decryptData == null){
                console.log(`[ Error ] Will not write this file : cache/decrypted/${file}`);
                continue;
            }

            fs.writeFileSync(path.join(__dirname, "../../cache/stream/decrypted", `decrypted-${file}`), decryptData);
            console.log(`[ Info ] Write file success : cache/decrypted/${file}`);
        }
    }
}