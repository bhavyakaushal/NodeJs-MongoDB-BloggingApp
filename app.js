const express = require('express');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
const Blog=require('./models/blog');
const seedDB=require('./seedDB');
const methodOverride = require('method-override');
const blogRoutes=require('./routes/blogs/blog');

mongoose.connect('mongodb://localhost:27017/blog-app', { useNewUrlParser: true, useUnifiedTopology: true})
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

   // seedDB();

//Routes

app.use(blogRoutes);

app.listen(8000, () => {
    console.log("Server Running At port 8000");
})
    
    
