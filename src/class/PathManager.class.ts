import fs from "fs";
import path from "path";

export class PathManager {
    public encryptStreamPath: string;
    public decryptStreamPath: string;
    public ffmpegCachePath: string;
    public beOnlineEncryptKeyPath: string;
    public outputPath: string;
    
    constructor(){
        this.encryptStreamPath = "cache/stream/encrypted/";
        this.decryptStreamPath = "cache/stream/decrypted/";
        this.ffmpegCachePath = "cache/ffmpeg/";
        this.beOnlineEncryptKeyPath = "enckeybeonline.key";
        this.outputPath = "output/";
    }

    
    protected verifyAndloadKey(): Buffer<ArrayBuffer> | null {
        console.log("[ Info ] Loading Key");
        const isKeyExits = fs.existsSync(path.join(__dirname, "../../", this.beOnlineEncryptKeyPath));
        if(!isKeyExits){
            console.log("[ Info ] Key not found; Please download key then pasted to root project root directory");
            throw new Error("Where Da Fuk is your key?");
        }
        return fs.readFileSync(path.join(__dirname, "../../", this.beOnlineEncryptKeyPath));   
    }

    protected verifyEncryptCachePath(): void{
        console.log("[ Info ] Verifying Encrypt Cache Path");
        // Check encrypt path
        const checkEncryptPath = fs.existsSync(path.join(__dirname, "../../", this.encryptStreamPath));
        if(!checkEncryptPath){
            fs.mkdirSync(path.join(__dirname, "../../", this.encryptStreamPath), { 
                recursive: true 
            });
            console.log("[ Info ] Created Directory :", this.encryptStreamPath);
            return;
        }
        console.log("[ Info ] Directory already exists:", this.encryptStreamPath);
    }

    protected verifyDecryptCachePath(): void{
        console.log("[ Info ] Verifying Decrypt Cache Path");
        // Check decrypt path
        const checkDecryptPath = fs.existsSync(path.join(__dirname, "../../", this.decryptStreamPath));
        if(!checkDecryptPath){
            fs.mkdirSync(path.join(__dirname, "../../", this.decryptStreamPath), { 
                recursive: true 
            });
            console.log("[ Info ] Created Directory :", this.decryptStreamPath);
            return;
        }
        console.log("[ Info ] Directory already exists:", this.decryptStreamPath);
    }

    protected verifyFFmpegCachePath(): void{
        console.log("[ Info ] Verifying FFmpeg Cache Path");
        // Check ffmpeg path
        const checkDecryptPath = fs.existsSync(path.join(__dirname, "../../", this.ffmpegCachePath));
        if(!checkDecryptPath){
            fs.mkdirSync(path.join(__dirname, "../../", this.ffmpegCachePath), { 
                recursive: true 
            });
            console.log("[ Info ] Created Directory :", this.ffmpegCachePath);
            return;
        }
        console.log("[ Info ] Directory already exists:", this.ffmpegCachePath);
    }

    protected verifyOutputPath(): void {
        console.log("[ Info ] Verifying Output Cache Path");
        // Check ffmpeg path
        const checkDecryptPath = fs.existsSync(path.join(__dirname, "../../", this.outputPath));
        if(!checkDecryptPath){
            fs.mkdirSync(path.join(__dirname, "../../", this.outputPath), { 
                recursive: true 
            });
            console.log("[ Info ] Created Directory :", this.outputPath);
            return;
        }
        console.log("[ Info ] Directory already exists:", this.outputPath);
    }

    protected deleteEncryptCache(){
        this.verifyEncryptCachePath();

        const files = fs.readdirSync(path.join(__dirname, "../../", this.encryptStreamPath));
        for(const file of files){
            fs.unlinkSync(path.join(__dirname, "../../", this.encryptStreamPath, file));
            console.log("[ Info ] Deleted Encrypt File : ", file);
        }

        console.log("[ Info ] Deleted Encrypt File Success");
    }

    protected deleteDencryptCache(){
        this.verifyDecryptCachePath();

        const files = fs.readdirSync(path.join(__dirname, "../../", this.decryptStreamPath));
        for(const file of files){
            fs.unlinkSync(path.join(__dirname, "../../", this.decryptStreamPath, file));
            console.log("[ Info ] Deleted Decrypt File : ", file);
        }

        console.log("[ Info ] Deleted Decrypt File Success");
    }

    protected deleteFFmpegCache(){
        this.verifyFFmpegCachePath();

        const files = fs.readdirSync(path.join(__dirname, "../../", this.ffmpegCachePath));
        for(const file of files){
            fs.unlinkSync(path.join(__dirname, "../../", this.ffmpegCachePath, file));
            console.log("[ Info ] Deleted FFmpeg File : ", file);
        }

        console.log("[ Info ] Deleted FFmpeg File Success");
    }

    protected deleteOutput(){
        this.verifyOutputPath();

        const files = fs.readdirSync(path.join(__dirname, "../../", this.outputPath));
        for(const file of files){
            fs.unlinkSync(path.join(__dirname, "../../", this.outputPath, file));
            console.log("[ Info ] Deleted FFmpeg File : ", file);
        }

        console.log("[ Info ] Deleted FFmpeg File Success");
    }

}