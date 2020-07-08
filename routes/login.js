const exp=require("express");
const router= exp.Router();
const passport=require("passport");
 
router.get('/',(req,res)=>{
    res.render("login");
});

router.post('/',(req,res,next)=>{
    passport.authenticate('local',{
        successRedirect:'/',
        failureRedirect:'/login',
        failureFlash:true
    })(req,res,next);
});

module.exports=router;