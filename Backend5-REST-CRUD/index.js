let express = require("express");
let app = express();
let port  = 8080;

let path = require("path");
app.use(express.urlencoded({extended:true}));//for parsing data in such fornate that express can understand and use.
app.set("view engine" , "ejs");//allowing rendering of ejs files
app.set("views" , path.join(__dirname , "views"));//setting views folder as default of ejs files
app.use(express.static(path.join(__dirname,"public")));//for getting css file from this folder

app.listen(port , ()=>{
    console.log(`Listening on port number : ${port}`);
})

let data = [     
    {
        id:"1a",
        username  :"shezzy",
        content : "Into the same river , no man can enter twice"
    } , 
    {
        id:"2b",
        username : "hania" , 
        content : "Creamy eyes in the Silvery chest"
    }
]


app.get("/posts" , (req,res)=>{ //page for rendering all the posts at this route
    res.render("view.ejs" , {data});
})
app.get("/posts/new" , (req,res)=>{//route for creating a new post 
    res.render("new.ejs");
})

app.post("/posts" , (req,res)=>{//adding post to data after new post will be submitted. 
    let {username , content} = req.body;//destructuring from req dody as in post method data is present in request body
    data.push({username , content});//push new posts info in our array data
    // res.send("Post created successfully");//send response back.
    res.redirect("/posts");
})
//now after posting new post our page will take us at above data "Post created successfully" but we want to go to see all the posts after pushing it.For this purpose we have to connect these pages that after submitinig it should take us to view.ejs . We can also do this by repalcing send with render and rendering view.ejs file here.But we want to use get method only for seeing posts and we want to use post method for send data only.
//So for this purpose express contains a method name 'redirect'.This method takes a url and sends resqust to this url and by default this request is get.
//And this redirect method belongs to res.
//so if we replace res.send with res.redirect("/posts");this it will send a request to current server at posts route and as its request type is get by default so our first api starting from line no 27 will be rendered.

//now we will create an api that will get show a post in detail.For this purpose we will pass an id in query params for seeing a post in detail.
app.get("/posts/:id" , (req,res)=>{
    let {id} = req.params;
    //now we will find post with this given id in our data by using find method of array
    let post = data.find((p)=>id===p.id);
    //we have create a template 'show.ejs' which gets post's whole data in params and displays the post
    //but first we can check whether any post with given id exists or not.WE will be render only if a post with this id exists.
    if(post){
        res.render("show.ejs" , {post});
    }
    else{
        res.send("Invalid id , no post exists with this id");
    }
})
app.get("*" , (req,res)=>{//for all invalid routes this will be called
    res.send("Invalid route.Nothing found on this route! ")
})
