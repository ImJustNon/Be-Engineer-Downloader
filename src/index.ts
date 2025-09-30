import { BeEngDL } from "./class/BeEngDL.class";


const beeng = new BeEngDL({
    startSegment: 0,
    url: "https://vdo.inclass.me/beonline/1.66%20module2%20Physics1/Physics1%20M2%20-%200.%20Introduction/Physics1%20M2%20-%200.%20Introduction<<>>.ts",
    identifier: "<<>>",
    encryptKey: ""
});


(async() => {
    console.log("Step 1) Download TS Stream file with encryption");
    await beeng.download();
    
    console.log("Step 2) Decrypt");
    setTimeout(async() => await beeng.decrypt(), 2000);

    console.log("Step 3) Concat and Convert to mp4");
    setTimeout(async() => await beeng.concatAndConvert(), 2000);
})();