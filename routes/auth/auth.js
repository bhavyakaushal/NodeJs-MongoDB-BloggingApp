
const express = require('express');
const router = express.Router();
const User = require('../../models/user');
const passport = require('passport');


// Get signup page
router.get('/register', (req, res) => {
    res.render('auth/signup');
})



// Register the new user
router.post('/register', async(req, res) => {
    
    const user = {
        username: req.body.username,
        email:req.body.email
    }

    const newUser=await User.register(user, req.body.password);

    res.redirect('/login');
})

router.get('/login',(req,res)=>{
    res.render('auth/login');
})
//automatically un or pwd lega and try to find if that user exists or not
router.post('/login',passport.authenticate('local',{failureRedirect:'/login'}),(req,res)=>{
  
    res.redirect('/blogs');
})

router.get('/logout',(req,res)=>{
    req.logout();
  
    res.redirect('/login');
})

module.exports=router;