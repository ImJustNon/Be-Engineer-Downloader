import fs from "fs";
import path from "path";
import { promisify } from "util";
import { exec, spawn } from "child_process";

const execAsync = promisify(exec);

export class Convert {
    
    private deleteOldConcat(){
        try {
            fs.rmSync(path.join(__dirname, "../../cache/ffmpeg/concat_list.txt"), { recursive: true, force: true });
            console.log("[ Info ] Deleted /cache/ffmpeg/concat_list.txt");
        }
        catch(e){
            console.log("[ Error ] Fail to delete or create /cache/ffmpeg/concat_list.txt");
        }
    }

    async concatAndConvert(fileName: string){
        this.deleteOldConcat();

        try {
            console.log('[ Info ] Creating file list for FFmpeg');
            
            const outputDir = path.join(__dirname, "../../output");
            if (!fs.existsSync(outputDir)) {
                fs.mkdirSync(outputDir, { recursive: true });
            }
            
            const files = fs.readdirSync(path.join(__dirname, "../../cache/stream/decrypted")).filter(f => f.endsWith('.ts')).sort((a, b) => {
                const matchA = a.match(/(\d+)/);
                const matchB = b.match(/(\d+)/);
                const numA = matchA ? parseInt(matchA[1]) : 0;
                const numB = matchB ? parseInt(matchB[1]) : 0;
                return numA - numB;
            });

            console.log(`[ Info ] Found ${files.length} decrypted TS files`);

            const fileList = files.map(f => `file '${path.join(__dirname, "../../cache/stream/decrypted", f)}'`).join('\n');
            fs.writeFileSync(path.join(__dirname, "../../cache/ffmpeg", 'concat_list.txt'), fileList);

            console.log('[ Info ] Converting to MP4');
            const outputPath = path.join(__dirname, "../../output", `${fileName}.mp4`);
            const ffmpegCommand = `ffmpeg -f concat -safe 0 -i ${path.join(__dirname, "../../cache/ffmpeg/concat_list.txt")} -c copy -y "${outputPath}"`;
            await execAsync(ffmpegCommand);
            console.log(`[ Info ] SUCCESS: Created ${fileName}.mp4`);
        
            const stats = fs.statSync(outputPath);
            console.log(`[ Info ] File Size: ${(stats.size / 1024 / 1024).toFixed(1)} MB`);
        }
        catch(error: any){
            console.log('[ Info ] Error:', error.message);
        }
    }
}