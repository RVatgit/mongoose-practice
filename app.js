const exp= require('express');
const app = exp();
const path =require("path");
const mong = require('mongoose');
const body = require('body-parser');
const config=require('./config/database');
const session= require("express-session");
let articles= require('./models/articles');
const passport=require("passport");
const flash= require("connect-flash");
const localstrategy=require('passport-local').Strategy;
const User=require('./models/users');
const bcrypt=require('bcryptjs');


mong.connect(config.database,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});
let db =mong.connection;

db.once('open',()=>{
    console.log("db con");
});

db.on('error',(err)=>{
    console.log("error here 15");
});


app.use(body.json());
app.use(body.urlencoded({extended:false}));


app.use(exp.static(path.join(__dirname,"public")));

app.set("views",path.join(__dirname,"views"));
app.set("view engine","pug");

app.use((req,res,next)=>{
    res.locals.messages=require("express-messages")(req,res);
    next();
});
passport.use( new localstrategy({
    usernameField:'uname',
    passwordField:'psd',
    passReqToCallback:true},
    (req,uname,psd,done)=>{
        User.findOne({uname:uname})
        .then(user=>{
            console.log("user",user);
            if(!user) return done(null,false,req.flash('danger',"email not registered"));
            bcrypt.compare(psd,user.psd,(err,ism)=>{
                if(err) throw err;
                if(ism) return done(null,user);
                return done(null,false,req.flash('danger',"paswd not amched"));
            });
        })
        .catch(err=>console.log("mot found user"))
    })
);

passport.serializeUser((user, done) =>{
    done(null, user.id);
});  
passport.deserializeUser((id, done)=> {
    User.findById(id, (err, user)=>   {
    done(err, user);
});
});


//exp session middlesware
app.use(session({
    secret:'nosecret',
    resave:true,
    saveUninitialized:true
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(flash());






app.get('/',(req,res)=>{
    articles.find({},(err,all)=>{
        if(err) console.log("error");
        else {
            res.render('index',{
                title:"Articles",
                con:all
            })
        }
    });
});
app.use('/add',require("./routes/form"));
app.use('/articles',require("./routes/articles"));
app.use('/register',require("./routes/register"));
app.use('/login',require("./routes/login"));



app.listen("3000");