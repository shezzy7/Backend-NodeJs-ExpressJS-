let express = require("express");
let app = express();
let mysql = require("mysql2");
let path = require("path");
let { v4: uuidv4 } = require("uuid");
app.use(express.urlencoded({ extended: true }));
//for patch/delete requests
let methodOverride = require("method-override");
app.use(methodOverride("_method"));
//for css files
app.use(express.static(path.join(__dirname, "public")));
//for views files
app.set("views", path.join(__dirname, "/views"));
//for rendering ejs files
app.set("view engine", "ejs");

//database info
const connection = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        database: "apna_database",
        password: "hania46636"
    }
)


app.listen(8080, () => {
    console.log("App is listening on port number ", 8080);
})

//Get count of all the users in table
app.get("/", (req, res) => {

    let q = `SELECT count(*) FROM posts`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;

            let ans = result;//this will return an array of objects.In this objects we have our results in 
            let count = result[0]["count(*)"]; //if we print result.Then we will see that in first object(at 0 index) a key value pair {"count(*):valule"} would have been stored and we have to access it 
            res.render("view.ejs", { count });
        })
    }
    catch (err) {
        console.log(err);
        res.send("Some error occurs in database");
    }
})


//see all the data in table
app.get("/user", (req, res) => {
    let q = "SELECT * FROM posts";
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let i = 1;
            res.render("show.ejs", { result, i });
        })
    }
    catch (err) {
        console.log(err);
        res.send("An error occured with our database");
    }
})

//edit request handling
app.get("/user/:id/edit", (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM posts WHERE id='${id}'`;//here we using single quotation arround our variable name because we need to pass a string in this query and by default id will return us value withour quotes,so need to add them here.
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let user = result[0];
            res.render("edit.ejs", { user , errorMsg:null  });
        })
    }
    catch (err) {
        console.log(err);
    }
})

//update the username
app.patch("/user/:id", (req, res) => {
    let { id } = req.params;
    let { formPass, newUsername } = req.body;

    let q = `SELECT * FROM posts WHERE id = '${id}'`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let user = result[0];
            if (user["password"] === formPass) {//check password
                let q2 = `UPDATE posts SET username='${newUsername}' WHERE id='${id}'`;
                connection.query(q2, (err, result) => {
                    if (err) throw err;
                    res.redirect("/user");
                })
            }
            else {
                

                res.render("edit.ejs" , {user , errorMsg:"Invalid Password.Please again"});
            }
        })
    }
    catch (err) {
        res.send("Some error occured with your database");
    }
})

// Add a new user
app.get("/user/add", (req, res) => {
    res.render("new.ejs" , {errorMsg:null});
})

//add new user into table
app.post("/user/add/new", (req, res) => {
    let { username, email, password } = req.body;
    let id = uuidv4();
    
    // first check if user with this email/username already exists then we will not add him.
    let q = `SELECT * FROM posts WHERE (username='${username}' OR email='${email}')`;
    try {
        connection.query(q, (err, result) => {
            if (err) {
                res.render('new.ejs', { errorMsg: "User with this username or email already exists" });
            }
            else {
                let q2 = `INSERT INTO posts(id,username,email,password) VALUES('${id}','${username}','${email}','${password}')`;
                try {
                    connection.query(q2, (err, result) => {
                        if (err) throw err;
                        res.redirect("/user");
                    })
                }
                catch (er) {
                    res.send("some error with database or invalid entry");
                }
            }

        })
    }
    catch (err) {
        res.send("some error with database or invalid entry");
    }



})

//Delete a user
app.get("/user/:id/del", (req, res) => {
    let { id } = req.params;
    let q = `SELECT * FROM posts WHERE id='${id}'`;
    try {
        connection.query(q, (err, result) => {
            if (err) throw err;
            let user = result[0];
            res.render("delete.ejs", { user, errorMessage: null });
        })
    }
    catch (err) {
        res.send("Some error with database");
    }
})

app.delete("/user/:id", (req, res) => {

    let { id } = req.params;
    let { password } = req.body;
    let q = `SELECT * FROM posts WHERE id='${id}'`;
    connection.query(q, (err, result) => {
        if (err) throw err;
        let user = result[0];
        if (password === user["password"]) {
            let q2 = `DELETE FROM posts WHERE id='${id}'`;
            connection.query(q2, (err, result) => {
                if (err) throw err;

                res.redirect("/user");
            })
        }
        else {

            // If password does not match, re-render the page with an error message
            res.render('delete', {
                user,
                errorMessage: 'Invalid password. Please try again.'
            });
        }

    })
})