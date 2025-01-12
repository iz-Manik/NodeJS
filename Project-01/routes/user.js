const express=require('express');

const router=express.Router();

router.get('/',async(req,res)=>{
    const users=await User.find({});
    return res.json(users);
});


router.get('/:id',async(req,res)=>{
    const user=await User.findById(req.params.id);
    res.setHeader('Content-Type','routerlication/json');
    if(user){
        return res.json(user);
    }
    return res.status(404).send("User not found");
});

router.post('/',async(req,res)=>{
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

router.patch('/:id',async(req,res)=>{
    const id=await User.findByIdAndUpdate(req.params.id,{last_name:"changed"},{new:true});
    if(!id){
        return res.status(404).send("User not found");
    }
    return res.json(id);
});

router.delete('/:id',async(req,res)=>{
    const id=await User.findByIdAndDelete(req.params.id);
    if(!id){
        return res.status(404).send("User not found");
    }
    return res.status(204).send("User deleted");
});

module.exports=router;