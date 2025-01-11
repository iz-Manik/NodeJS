const http=require('http');
const fs=require('fs');
const url=require('url');

const myServer=http.createServer((req,res)=>{
    const log=`${req.url} ${req.method} ${new Date()}\n`;
    const parsedUrl=url.parse(req.url,true);//true to parse query string
    console.log(parsedUrl);
    fs.appendFile('./log.txt',log,(err,data)=>{
        if(err){
            console.log(err);
        }else{
            switch(req.url){
                case '/':
                    res.write("Hello World");
                    break;
                case '/about':
                    const username=parsedUrl.query.username;
                    res.write(`Hello ${username}`);
                    break;
                default:
                    res.write("404 Not Found");
            }
            console.log("Log written");
            res.end();
        }
    });
});

myServer.listen(8000,()=>{console.log("Server is running on port 8000")});