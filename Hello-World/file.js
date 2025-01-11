const fs=require("fs");
const os=require("os");
//Sync
fs.writeFileSync("./test.txt","Hey There");

//Async requires callbacks to handle results and errors
fs.writeFile("./test.txt","Hey There",()=>{
    console.log("File Written");
});

const result=fs.readFileSync("./test.txt","utf8");
console.log(result);

fs.readFile("./test.txt","utf8",(err,data)=>{
    if(err){
        console.log(err);
    }
    console.log(data);
});

fs.appendFileSync("./test.txt","Hello World");

//to copy file to another location
fs.cpSync("./test.txt","./test2.txt");

//to delete file
fs.rmSync("./test.txt");

//default thread pool size is 4
//we can extend thread pool size to maximum number of cores available
console.log(os.cpus().length);