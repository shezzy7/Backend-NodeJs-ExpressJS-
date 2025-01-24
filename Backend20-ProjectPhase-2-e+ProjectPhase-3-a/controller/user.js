const User = require("../models/user.js");


module.exports.sigup = async (req, res) => {
    try {
        let { username, email, password } = req.body;
        let newUser = new User({ email, username });
        console.log(newUser)
        await User.register(newUser, password);//register method is used to store info of user who is registering.This method takes some paramas one of them is object containing info like username,email etc and other is password.A third param is optional.

        // if we want that after signup we must be loged-in to our site automatically then we use passport's method login
        req.login(newUser,(err)=>{ //in this login mthod we pass newly signed up user alongside with a callback which says what to do after loging in
            if(err){
                return next(err);
            }
            req.flash("success", "Welcome to wanderlust!")
            res.redirect("/listings");
        })
        
        
    } catch (e) {
        req.flash("error", e.message);
        res.redirect("/signup")
    }
}

module.exports.renderSignupForm=(req, res) => {
    res.render("./user/signup.ejs")
}
module.exports.renderLoginForm=(req,res)=>{
    res.render("./user/login.ejs")
}

module.exports.login=(req,res)=>{

    // now this login page's request can be done by user directly or indirectly(indirectly means if  our user didn't press login link but he tries to do something on our website which requires login first so after loggin-in our server should take user to that page where our user was trying to go.)
    // If user pressed login link directly then in the varaible req.locals.redirectUrl created by our middleware saveRedirectUrl will be empty else will contain some route for which user requested for.If req.locals.redirectUrl is empty then in this case we will redirect to all listings else to the user required page.
    let redirectLink = res.locals.redirectUrl || "/listings";
    console.log(redirectLink)
    req.flash("success","Welcome to wanderlast,login successfully!");
    res.redirect(`${redirectLink}`)
}

module.exports.logout = (req,res,next)=>{
    //We can write code for logging out a user but passport provides a method to our req object named 'logout' which perfoms the same work for us
    req.logout((err)=>{ //our logout method takes a callback in it.In this callback we define what to do after logging out.We can pass an argument err to this callback.
        if(err){
            return next(err);
        }
        req.flash("success","You're logged out successfully!")
        res.redirect("/listings");
    })
}