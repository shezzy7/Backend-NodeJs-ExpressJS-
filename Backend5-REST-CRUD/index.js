let express = require("express");
let app = express();
let port  = 8080;

let path = require("path");
app.use(express.urlencoded({extended:true}));//for parsing data in such formate that express can understand and use.When we want to get data from request body we have to write this line of code as it converts data present in request body into a special form that express can understand.
app.set("view engine" , "ejs");//allowing rendering of ejs files
app.set("views", path.join(__dirname , "views"));//setting views folder as default of ejs files
app.use(express.static(path.join(__dirname,"public")));//for getting css file from this folder

//for overriding a method over another we have to use this funtionality of express known as method-override.We are using this because while updating or deleting a post/data we need patch/put and delete method respectively but we can write only one of two methods name in method section post,get.So for overriding patch,delete over get,post we use this this functionality of express. 
const methodOverride = require("method-override");
app.use(methodOverride('_method'));
//As we know that each post should have unique id for seeing it in detail/editing/deleting or for performing any operation on a specific post and this post will be identifed uniquely on the basis of this id.For assiging an id to eac post which should be unique we use a built-in method known as UUID(universally unique identifier).
//First we need to require it
const {v4 : uuidv4} = require("uuid");

    app.listen(port , ()=>{
    console.log(`Listening on port number : ${port}`);
})
let postTime = new Date();
let data = [     
    {
        id:uuidv4(),
        username  :"shezzy",
        content : "Into the same river , no man can enter twice",
        time:postTime
    } , 
    {
        id:uuidv4(),
        username : "hania" , 
        content : "Creamy eyes in the Silvery chest",
        time:postTime
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
    //assign a unique id
    let id = uuidv4();
    let time = new Date();
    
    data.push({id,username , content , time});//push new posts info in our array data
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

app.get("/posts/:id/edit" , (req,res)=>{
    let {id} = req.params;
    let post = data.find((d)=>id==d.id);
    if(post){

        res.render("edit.ejs" , {post});
    }
    else{
        res.send("no post found");
    }
})
// For editing a post we use patch method.But our forms in html do not support patch method we can use only get or post method for our requests.But for editing we need a patch request type.For this purpose we use method-override functionality of methods.This method will do what it will change the request(eg. get or post) type to given request type(patch,put,delete).
//First we have to install it by terminal using command -> npm i method-override
//we can read about it on mdn

app.patch("/posts/:id" , (req, res)=>{
    let newContent = req.body.content;
    let {id} = req.params;
    let post = data.find((p)=>id==p.id);
    post.content = newContent;
    res.redirect("/posts");
   
})

// Deleting a post
app.delete("/posts/:id" , (req,res)=>{
    let {id} = req.params;
    data = data.filter((p)=>id!==p.id);
    
    res.redirect("/posts");
})
app.get("*" , (req,res)=>{//for all invalid routes this will be called
    res.send("Invalid route.Nothing found on this route! ")
})
