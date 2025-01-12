const express=require('express');
const fs=require('fs');
const app=express();
const Port=8000;
// const users=require('./MOCK_DATA.json');
const mongoose=require('mongoose');

//Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/test',{useNewUrlParser:true,useUnifiedTopology:true})
.then(()=>{console.log("Connected to MongoDB")})
.catch(err=>{console.log(err)});


//Schema
const userSchema=new mongoose.Schema({
    first_name:{type:String,required:true},
    last_name: {type:String,},
    email:{type:String,required:true,unique:true},
    job_title:{type:String},
    gender:{type:String},
},{timestamps:true});

const User=mongoose.model('User',userSchema);

//Routes
app.get('/api/users',(req,res)=>{
    return res.json(users);
});
//Middleware
app.use(express.urlencoded({extended:false}));
app.use(express.json());

app.use((req,res,next)=>{
    console.log("Middleware");
    req.myData="Hello World";
    next();
});



app.get('/users',(req,res)=>{
    const html=`
    <ul>
        ${users.map(user=>`<li>${user.first_name}</li>`).join('')}
    </ul>
    `;
    return res.send(html);
});

app.get('/api/users/:id',(req,res)=>{
    const id=Number(req.params.id);
    res.setHeader('Content-Type','application/json');
    const user=users.find(user=>user.id===id);
    if(user){
        return res.json(user);
    }
    return res.status(404).send("User not found");
});

app.post('/api/users',async(req,res)=>{
    const body=req.body;
    if(!body.first_name || !body.last_name || !body.email || !body.job_title || !body.gender){
        return res.status(400).send("Please provide all details");
    }
    // const newUser={id:users.length+1,first_name,last_name,email};
    // users.push(newUser);
    // fs.writeFile('./MOCK_DATA.json',JSON.stringify(users),err=>{
    //     if(err){
    //         return res.status(500).send("Could not write to file");
    //     }
    //     return res.status(201).json(newUser);
    // });
    try {
        const newUser = await User.create(body);

        return res.status(201).json(newUser);
    } catch (err) {

        return res.status(500).send("Could not save the user to the database");
    }
});

app.patch('/api/users/:id',(req,res)=>{
    const id=Number(req.params.id);
    const user=users.find(user=>user.id===id);
    if(!user){
        return res.status(404).send("User not found");
    }
    const {first_name,last_name,email}=req.body;
    user.first_name=first_name||user.first_name;
    user.last_name=last_name||user.last_name;
    user.email=email||user.email;
    return res.json(user);
});

app.delete('/api/users/:id',(req,res)=>{
    const id=Number(req.params.id);
    const user=users.find(user=>user.id===id);
    if(!user){
        return res.status(404).send("User not found");
    }
    users=users.filter(user=>user.id!==id);
    return res.status(204).send("User deleted");
});

app.listen(Port,()=>{console.log(`Server is running on port ${Port}`)});