import express from "express";
import bodyParser from "body-parser"

const app = express();
const port = 3000;

app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended : true }));

var postName = [];
var postContent = [];

app.get( "/" , (req,res) => {
    res.render("index.ejs");
})

app.get( "/home" , (req,res) => {
    res.render("index.ejs",{nameArr:postName,contentArr:postContent})
})

app.get("/blog",(req,res) => {
    res.render("blog.ejs");
})

app.post("/blog",(req,res) => {
    postName.push(req.body["name"]);
    postContent.push(req.body["content"]);
    res.render("index.ejs",{nameArr : postName, contentArr : postContent});
})

app.post("/delete",(req,res) =>{
    const index = parseInt(req.body.index);
    if(index >=0 && index < postName.length){
        postName.splice(index,1);
        postContent.splice(index,1);
        res.redirect("/home");
    }
})

app.post("/update",(req,res) => {
    const prevBlog = req.body.blogDate;
    const position = parseInt(req.body.index);
    res.render("updatePost.ejs",{oldBlog:prevBlog,index:position});
})

app.post("/updateComplete",(req,res) => {
    var pos = req.body.pos;
    var newBlog = req.body.newBlog;
    if(newBlog.length!=0){
        postContent[pos] = newBlog;
    }
    res.redirect("/home");
})

app.listen( port , () => {
    console.log(`Running on port ${port}`);
})