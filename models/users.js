const mong = require("mongoose");
const schema =mong.Schema({
    name:{
        type:String,
        required:true,
    },
    uname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    psd:{
        type:String,
        required:true,
    },
    mobile:{
        type:String,
        required:true,
    }
});

module.exports=mong.model("users",schema);