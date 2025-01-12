const mongoose=require('mongoose');

async function connect(){
    try{
        await mongoose.connect('mongodb://localhost:27017/test',{useNewUrlParser:true,useUnifiedTopology:true});
        console.log("Connected to MongoDB");
    }catch(err){
        console.log(err);
    }
}

module.exports=connect;