import { BeEngDL } from "./class/BeEngDL.class";
// import dotenv from "dotenv";
// dotenv.config();

const beeng = new BeEngDL({
    startSegment: 0,
    url: "https://vdo.inclass.me/beonline/1.66%20module2%20Physics1/Physics1%20M2%20-%206.2%20Vector%20Product/Physics1%20M2%20-%206.2%20Vector%20Product<<>>.ts",
    identifier: "<<>>",
});


(async() => {
    await beeng.verifyAndDeleteCacheAllPath();
    await beeng.download();
    await beeng.decrypt();
    await beeng.concatAndConvert();
})();