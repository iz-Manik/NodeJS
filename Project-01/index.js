const express=require('express');
const app=express();
const Port=8000;
const users=require('./MOCK_DATA.json');

//Routes
app.get('/api/users',(req,res)=>{
    return res.json(users);
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
    const user=users.find(user=>user.id===id);
    if(user){
        return res.json(user);
    }
    return res.status(404).send("User not found");
});

app.post('/api/users',(req,res)=>{
    const {first_name,last_name,email}=req.body;
    if(!first_name || !last_name || !email){
        return res.status(400).send("Please provide all details");
    }
    const newUser={id:users.length+1,first_name,last_name,email};
    users.push(newUser);
    return res.status(201).json(newUser);
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