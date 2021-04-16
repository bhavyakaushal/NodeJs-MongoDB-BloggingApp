const express = require('express');
const router = express.Router();
const Blog=require('../../models/blog');
const {IsLoggedIn}=require('../../middleware');

router.get("/",(req,res)=>{
    res.render('landingPage');
});

//get a blog

router.get("/blogs",IsLoggedIn,async(req,res)=>{
    const blogs=await Blog.find({});
    res.render('blogs/index',{
        blogs:blogs
    });
})

//new blog

router.get('/blogs/new',IsLoggedIn, (req, res) => {
    res.render('blogs/new');
})
router.post("/blogs", async (req, res) => {
    await Blog.create(req.body.blog);
    res.redirect('/blogs');
})

//showing a particular blog

router.get('/blogs/:id',IsLoggedIn, async (req, res) => {
    const blog = await Blog.findById(req.params.id);
    res.render('blogs/show', {
        blog: blog
    });
})


//edit that blog

router.get('/blogs/:id/edit',IsLoggedIn, async(req, res) => {
    
    const blog = await Blog.findById(req.params.id);

    res.render('blogs/edit', { blog: blog });
})

//patch

router.patch('/blogs/:id',async(req,res)=>{
    const blog=await Blog.findByIdAndUpdate(req.params.id,req.body.blog);

    res.redirect(`/blogs`);
})

//delete

router.delete('/blogs/:id',IsLoggedIn,async(req,res)=>{
    await Blog.findByIdAndDelete(req.params.id);

    res.redirect('/blogs');
})



module.exports=router;