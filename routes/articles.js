const exp=require("express");
const router = exp.Router();
let articles= require('../models/articles');


router.get('/:id',(req,res)=>{
    articles.findById(req.params.id,(err,data)=>{
        res.render('article',{
            data
        });
    });
});

router.get('/edit/:id',(req,res)=>{
    articles.findById(req.params.id,(err,data)=>{
        res.render('edit',{
            data
        });
    })
});

router.post('/edit/:id',(req,res)=>{
    let article={};
    article.title=req.body.title;
    article.author=req.body.author;
    article.body=req.body.body;

    let query={_id:req.params.id}
    articles.update(query,article,err=>{
        if(err) console.log(err);
        else {
            req.flash('Primary',"updated Article");
            res.redirect('/');
        }
    })
});

router.delete('/:id',(req,res)=>{
    let q={_id:req.params.id};
    articles.remove(q,err=>{
        if(err) console.log(err);
        req.flash('danger',"deleted Article");
        res.send('Success');
    });
});

module.exports=router;