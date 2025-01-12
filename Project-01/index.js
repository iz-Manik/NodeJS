const express=require('express');a
const app=express();
const Port=8000;
const userrouter=require('./routes/user');
const connect=require('./connection');

//Database connection
connect();

//Middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use((req,res,next)=>{
    console.log("Middleware is working");
    next();
});

//Routes
app.use('/users',userrouter);


app.listen(Port,()=>{console.log(`Server is running on port ${Port}`)});