const exp=require("express");
const router= exp.Router();
const User= require("../models/users");
const bcrypt= require("bcryptjs")
const {check,validationResult} =require("express-validator");



router.get('/',(req,res)=>{
    return res.render("register");
});

router.post('/',[
    check("name","name is required").notEmpty(),
    check("uname","user name is required").notEmpty().custom(value=>{
        return User.findOne({uname:value})
        .then(user=> {if(user) return Promise.reject("Username is in use")});
    }),
    check("email","Email should be Valid").custom((value) =>{
        return  User.findOne({email:value})
        .then((user)=>{
            if(user) return Promise.reject("Email is in use");
        });
    }),
    check("psd","must pass password criteria").isAlphanumeric().isLength(8).custom((value,{req})=>{
        if(value!=req.body.cpsd) throw new Error("Password didd not match");
        return true;
    }),
    check("mobile","valid mobile number").isMobilePhone().isLength(10,13).custom(value=>{
        return User.findOne({mobile:value})
        .then(user=> {if(user) return Promise.reject("Mobile is in use")});
    })
],(req,res)=>{
    const errors=validationResult(req);
    if(errors.isEmpty()){
        let newuser= new User({
            name:req.body.name,
            uname:req.body.uname,
            email:req.body.email,
            psd:req.body.psd,
            mobile:req.body.mobile
        });
        bcrypt.genSalt(10,(err,salt)=>{
            if(err) console.log("salt missing");
            bcrypt.hash(newuser.psd,salt,(err,hash)=>{
                if(err) console.log("regiter js+++Hash error");
                newuser.psd=hash;
                newuser.save((err)=>{
                    if(err) console.log("user not saved",err);
                    else {
                        req.flash('success',"you are registered, now login");
                        res.redirect('/login');
                    }
                });
            });
        });
        
    }
    else return res.render("register",{
            errors,
            old:req.body
        });
});

module.exports=router;