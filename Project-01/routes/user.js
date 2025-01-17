const express=require('express');
const {handleGetAllUsers, handlegetUserById,handleCreateUser,handleUpdateUserById,handleDeleteUserById,}=require('../controllers/user');
const router=express.Router();

router.get('/',async(req,res)=>{
    const users=await User.find({});
    return res.json(users);
});


router.get('/:id',handleGetAllUsers);

router.post('/',handleCreateUser);

router.patch('/:id',handleUpdateUserById);

router.delete('/:id',handleDeleteUserById);

module.exports=router;