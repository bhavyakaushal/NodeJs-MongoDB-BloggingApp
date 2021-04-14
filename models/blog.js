const mongoose = require('mongoose');


const blogSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    author: {
        type: String,
        required:true
    },
    
    desc: {
        type: String,
        minLength:10
    }

})

const Blog = mongoose.model('Blog', blogSchema);

module.exports = Blog;