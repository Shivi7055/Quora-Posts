const express = require("express");
const app = express();
const path = require("path");
const port = 8080;
const { v4: uuidv4 } = require('uuid');

const methodOverride = require("method-override");
// Override with POST request having ? _method = PATCH
app.use(methodOverride("_method"));

app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(express.static(path.join(__dirname, "public")));

let posts = [
    {
        id : uuidv4(),
        username : "mridul sharma",
        content : "I love coding"
    },
    {
        id : uuidv4(),
        username : "riya mavi",
        content : "Hard work is important"
    },
    {
        id : uuidv4(),
        username : "rahul kumar",
        content : "I got selected for my 1st internship!"
    },
];

// To get all the posts
app.get("/posts", (req, res) =>{
    res.render("index.ejs", {posts});
});

// To create new post
app.get("/posts/new", (req, res) =>{
    // console.log(req.body);
    res.render("new.ejs");
});

// To add your post
app.post("/posts", (req, res) =>{
    let {username, content} = req.body;
    let id = uuidv4();
    posts.push({id, username, content});
    res.redirect("/posts"); 
})

// To access an id
app.get("/posts/:id", (req, res) =>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("show.ejs", {post});
});

// To update the post 
app.patch("/posts/:id", (req, res) =>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p) => id === p.id);
    post.content = newContent;
    console.log(post);
    res.redirect("/posts");
});

// To edit the post
app.get("/posts/:id/edit", (req, res) =>{
    let {id} = req.params;
    let post = posts.find((p) => id === p.id);
    res.render("edit.ejs", {post});
});

// To delete the post
app.delete("/posts/:id/", (req, res) =>{
    let {id} = req.params;
    posts = posts.filter((p) => id !== p.id);
    res.redirect("/posts");
});
app.listen(port, () =>{
    console.log(`listening to port ${port}`);
});