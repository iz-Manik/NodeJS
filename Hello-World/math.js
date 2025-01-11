function sum(a,b){
    return a+b;
}

function sub(a,b){
    return a-b;
}

//if exports statement not written then it will not be available to other files
module.exports ={
    addFun:sum,
    subFun:sub,
};

//exports.add=(a,b)=>a+b;
//exports.sub=(a,b)=>a-b;