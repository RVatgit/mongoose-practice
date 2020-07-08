let mong = require('mongoose');

let aticle = mong.Schema({
    title:{
        type:String,
        required:true
    },
    author:{
        type:String,
        required:true
    },
    body:{
        type:String,
        required:true
    }
});

 module.exports=mong.model('articles',aticle);