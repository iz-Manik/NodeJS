const http=require('http');
const express=require('express');
const {Server}=require('socket.io');

const app=express();
const server=http.createServer(app);
const path=require('path');
const io=new Server(server);
const PORT=8000;

//Socket.io

io.on('connection',(socket)=>{
    console.log('User connected',socket.id);
    socket.on('disconnect',()=>{
        console.log('User disconnected');
    });
    socket.on('chat message',(msg)=>{
        io.emit('chat message',msg);
    });
});


app.use(express.static(path.resolve('./public')));

app.get('/',(req,res)=>{
    return res.sendFile('/public/index.html')
})
server.listen(PORT,()=>{console.log(`Server is running on port ${PORT}`)});
