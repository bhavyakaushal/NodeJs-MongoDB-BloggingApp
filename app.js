const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Blog=require('./models/blog');
const seedDB=require('./seedDB');
const methodOverride = require('method-override');
const blogRoutes=require('./routes/blogs/blog');
//authentication

const session=require('express-session');
const passport=require('passport');
const LocalStrategy=require('passport-local');
const User=require('./models/user');
const authRoutes=require('./routes/auth/auth');

mongoose.connect('mongodb://localhost:27017/blog-app', { useNewUrlParser: true, useUnifiedTopology: true,useFindAndModify:false, useCreateIndex:true})
    .then(() => {
        console.log("Database Connected");
    })
    .catch(err => {
        console.log("DB Not Connected");
        console.log(err);
    })



    app.set('view engine', 'ejs');
    app.set('views', path.join(__dirname, '/views'));
    app.use(express.urlencoded({ extended: true }));
    app.use(express.static(path.join(__dirname, 'public')));
    mongoose.set('useFindAndModify', false);
    app.use(methodOverride('_method'));



app.use(session({
    secret:'thisisnotagoodsecret',
    resave:false,
    saveUninitialized:true
}))

app.use(passport.initialize());//ye middleware use krte h hm 
app.use(passport.session());
   // seedDB();

//Routes

passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get('/', (req, res) => {
    res.render('landingPage');
})

app.use((req,res,next)=>{
    res.locals.currentUser=req.user;
    next();
})


app.use(blogRoutes);
app.use(authRoutes);

app.listen(8000, () => {
    console.log("Server Running At port 8000");
})
    
    
