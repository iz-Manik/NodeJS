const express=require('express');a
const app=express();
const Port=8000;
const userrouter=require('./routes/user');
const connect=require('./connection');
const log=require('./middlewares/index');

//Database connection
connect();

//Middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(log('log.txt'));

//Routes
app.use('/api/users',userrouter);


app.listen(Port,()=>{console.log(`Server is running on port ${Port}`)});