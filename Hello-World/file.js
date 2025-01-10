const fs=require("fs");
//Sync
fs.writeFileSync("./test.txt","Hey There");

//Async requires callbacks to handle results and errors
fs.writeFile("./test.txt","Hey There",()=>{
    console.log("File Written");
});

fs.readFileSync("./test.txt","utf8");