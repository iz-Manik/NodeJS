const http=require('http');
const fs=require('fs');
const myServer=http.createServer((req,res)=>{
    const log=`${req.url} ${req.method} ${new Date()}\n`;
    fs.appendFile('./log.txt',log,(err,data)=>{
        if(err){
            console.log(err);
        }else{
            switch(req.url){
                case '/':
                    res.write("Hello World");
                    break;
                case '/about':
                    res.write("About Us");
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