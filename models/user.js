const mongoose=require('mongoose');
const passportLocalMongoose=require('passport-local-mongoose');

const Blogt=require('./blog');

const userSchema=new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
   

});

userSchema.plugin(passportLocalMongoose);//automatically pwd and username khudse add krdega
module.exports=mongoose.model('User',userSchema);