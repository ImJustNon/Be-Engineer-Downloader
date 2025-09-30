import { BeEngDL } from "./class/BeEngDL.class";


const beeng = new BeEngDL({
    startSegment: 0,
    url: "https://vdo.inclass.me/beonline/1.66%20module2%20Physics1/Physics1%20M2%20-%205.1%20Angular%20Position%2C%20Angular%20Velocity%20and%20Angular%20Acceleration/Physics1%20M2%20-%205.1%20Angular%20Position,%20Angular%20Velocity%20and%20Angular%20Acceleration<<>>.ts",
    identifier: "<<>>",
});


(async() => {
    console.log("Step 1) Download TS Stream file with encryption");
    await beeng.download();
    
    console.log("Step 2) Decrypt");
    setTimeout(async() => await beeng.decrypt(), 2000);

    console.log("Step 3) Concat and Convert to mp4");
    setTimeout(async() => await beeng.concatAndConvert(), 2000);
})();