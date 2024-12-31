let express = require("express");
let router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");

router.get("/signup", (req, res) => {
    res.render("./user/signup.ejs")
})
router.post("/signup", wrapAsync(async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ email, username });
        console.log(newUser)
        await User.register(newUser, password);
        req.flash("success", "Welcome to wanderlust!")
        res.redirect("/listings");
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup")
    }
}))

// login
router.get("/login",(req,res)=>{
    res.render("./user/login.ejs")
})
//here in this post request info of our user will be coming so we have to authenticate the user wheather he is loged-in or not.For authenticating a user we can use authenticate mthod of passport.We pass this method as a middleware in our request and inside this middleware we pass some options.First option is that we have to tell by which strategy we are authenticating as here we are using local strategy so we will pass local,then second option is failureRedirect which means we have to tell if our authentication fails then at which route we have to redirect and third option is optional which is failureFlash which means if authentication fails then wheather we want to send a flash message or not
router.post("/login",passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),(req,res)=>{
    req.flash("success","Welcome to wanderlast,login successfully!");
    res.redirect("/listings")
})

router.post("/login",)

module.exports = router;