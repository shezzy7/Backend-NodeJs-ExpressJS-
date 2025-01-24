let express = require("express");
let router = express.Router();
const User = require("../models/user.js");
const wrapAsync = require("../utils/wrapAsync.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const userController = require("../controller/user.js");

router.route("/signup")
.get(userController.renderSignupForm)
.post( wrapAsync(userController.sigup));

// login
//here in this post request info of our user will be coming so we have to authenticate the user wheather he is loged-in or not.For authenticating a user we can use authenticate mthod of passport.We pass this method as a middleware in our request and inside this middleware we pass some options.First option is that we have to tell by which strategy we are authenticating as here we are using local strategy so we will pass local,then second option is failureRedirect which means we have to tell if our authentication fails then at which route we have to redirect and third option is optional which is failureFlash which means if authentication fails then wheather we want to send a flash message or not.
// now if any user who is not logged-in on website and he wants to add a new listing then our server will ask him to login first.Then when user will enter his credential then as he will press login button our site should take him to add new listing route on seccessfull log-in for this before going for login page we must sotre path for which user requested for in some variable then at successfull login we must take our user to that requested page.
//For this purpose we have defined a middleware writen in our middleware.js file.
router.route("/login")
.get(userController.renderLoginForm)
.post(saveRedirectUrl, passport.authenticate("local",{failureRedirect:"/login",failureFlash:true}),userController.login)



router.get("/logout",userController.logout)

module.exports = router;