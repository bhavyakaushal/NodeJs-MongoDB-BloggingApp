module.exports.IsLoggedIn=(req,res,next)=>{
    if(!req.isAuthenticated()){
        console.log("You must log in first");
        return res.redirect('/login');
    }
    next();
}