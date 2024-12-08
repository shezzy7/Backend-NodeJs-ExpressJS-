let express = require("express");
let app = express();
let {v4 : uuidv4} = require("uuid");
let path = require("path");
let methodOverride = require("method-override");
app.use(methodOverride("_method"));
let port = 3000;
app.use(express.urlencoded({extended:true}));
app.set("view engine" ,"ejs");
app.set("views" , path.join(__dirname , "views"));
app.use("/assets", express.static(path.join(__dirname,"assets")));
app.use( express.static(path.join(__dirname,"public")));
let posts = 
    [
        {
        id : uuidv4(),
        username : "Malang" , 
        content : "Into the same river , no can enter twice" , 
        img : "/assets/download3.jpg" , 
        date : new Date()
        },
        {
            id : uuidv4(),
            username : "Tasty" , 
            content : "On Faisalabad Streets" , 
            img : "/assets/dahi bhale.jpg" , 
            date : new Date()
            }

    ]

app.listen(port,()=>{
    console.log(`Listening on port no : ${port}`);
})

app.get("/posts",(req,res)=>{
    console.log(posts[0].img);
    res.render("view.ejs",{posts} );

})

// create a post
app.get("/posts/create",(req,res)=>{
    res.render("new.ejs");
})

// add data of new post
app.post("/posts" ,(req,res)=>{
    let { username , content , img } = req.body;
    let id = uuidv4();
    let date =  new Date();
    posts.push({username ,  content , img , id ,date});
    console.log(img);
    res.redirect("/posts");
})

// see in detail
app.get("/posts/:id/detail" , (req,res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>id===p.id);
    res.render("detail.ejs" , {post});
})
// update
app.get("/posts/:id/update" , (req , res)=>{
    let {id} = req.params;
    let post = posts.find((p)=>p.id===id);
    res.render("update.ejs" , {post});
})
app.patch("/posts/:id" , (req,res)=>{
    let {id} = req.params;
    let newContent = req.body.content;
    let post = posts.find((p)=>p.id===id);
    post.content = newContent;
    res.redirect("/posts");
})

// Delete
app.delete("/posts/:id",(req,res)=>{
    let {id} = req.params;
    posts = posts.filter((p)=>p.id!==id);
    res.redirect("/posts");
})
app.get("*" , (req,res)=>{
    res.send("Invalid route");
})