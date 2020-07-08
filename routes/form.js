const exp=require("express");
const router = exp.Router();
const {check,validationResult}=require("express-validator");
let articles= require('../models/articles');

router.get('/',(req,res)=>{
    return res.render('form');
});

router.post('/',[
    check('title',"ITs REQUIREs").notEmpty(),
    check('author',"ITs REQUIREs").notEmpty(),
    check('body',"ITs REQUIREs").notEmpty()
    ],(req,res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.render('form',{
            title:"ADD ARTICLE",
            errors:errors
        });
    }
    else{
        let article= new articles();
        article.title=req.body.title;
        article.author=req.body.author;
        article.body=req.body.body;
        article.save(err=>{
            if(err) console.log(err);
            else {
                req.flash('Success',"Added Article");
                res.redirect('/');
            }
        });
    }
});

module.exports=router;