//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const { redirect } = require("express/lib/response");
const { forEach } = require("lodash");
var _ = require('lodash');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neq";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque..";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien.";
let posts = [{ title: 'Home ', content: homeStartingContent }];

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function(req, res){
  res.render("home",{startingContent:homeStartingContent,posts:posts});
  
    
})

app.get("/about", function(req, res){
  res.render("about",{aboutContent:aboutContent});
})

app.get("/contact", function(req, res){
  res.render("contact ",{contactContent:contactContent});
})

app.get("/compose", function(req, res){
  res.render("compose");
})

app.post("/compose", function(req,res){
  const post = {
    title:req.body.postTitle,
    content:req.body.postBody
  };
  posts.push(post);
  console.log(posts)
  res.redirect("/");
})

app.get("/posts/:postName",function(req, res){
  const requestedTitle = _.lowerCase(req.params.postName);
  posts.forEach(function(post){
    storedTitle= _.lowerCase(post.title);
    if(storedTitle === requestedTitle){
      res.render("post",{title:post.title,content:post.content});
    }
    
  });
  

});




app.listen(3000, function() {
  console.log("Server started on port 3000");
});
