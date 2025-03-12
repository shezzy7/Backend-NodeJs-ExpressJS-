let express = require("express");
let router = express.Router();
let wrapAsync = require("../utils/wrapAsync.js");
const multer = require("multer");//Multer is node.js middleware for handling multi-part form data.As here we are also uploading a file in our site(image of listing).So to makke our server able to read files we have to use multer in our code.

const {storage} = require("../cloudConfig.js");
const upload = multer({storage});//here we have to pass name of storage.
// const upload = multer({dest:"uploads/"});//we also have to define name of destination which is baiscally name of folder where our uploaded files will be saved by the server automatically.Our server will also create this directory automatically.

let { isLoggedIn, isOwner, validateListing } = require("../middleware.js");


const lisitngController = require("../controller/listing.js")

//Here in our code we are sending different type of requests on same route.For example on route "/listings/:id" we are sending three types of requests get,put,delete so wiht the help of route method we can combite all of these together.Here instead of defining route in for each request we write route name in route mehtod and then write all the requests.As bellow.We can also see details of route method on documentation

//see all
router.route("/")
.get(wrapAsync(lisitngController.index))
.post(isLoggedIn,upload.single("listing[image]"), validateListing, wrapAsync(lisitngController.createListing));

// .post(,(req,res)=>{//for uploading a file we will also pass upload as a middlewar in which we'll also have to pass name of input section which is taking image
//     res.send(req.file)
// })
//add one
// We must check first whether user is login or not before doing any operation on this site.For this purpose we are using a middleware which first check wheather user is logged in or not
router.route("/filter").get(wrapAsync(lisitngController.filterListing));
router.route("/new").get(isLoggedIn, lisitngController.renderNewForm);
router.route("/applyTax").get(lisitngController.applyTax);
router.route("/removeTax").get(lisitngController.removeTax);
router.route("/search").get(wrapAsync(lisitngController.searchCountry));
router.route("/getData").get(lisitngController.getData);
// router.route("/filter").get(wrapAsync(lisitngController.filterListing));
// combining all those routes those have same request route.

router.route("/:id")
.get(wrapAsync(lisitngController.showListing))
.put(isLoggedIn, isOwner,upload.single("listing[image]"), validateListing, wrapAsync(lisitngController.updateListing))
.delete(isLoggedIn, isOwner, wrapAsync(lisitngController.destroyListing))

//edit
// AS we want that only that user can edit a listing who is the user of that listing.For this purpose we can identify wheather current user is the owner of that listing or not.If he is the owner then we will allow him to edit else we will not allow him.Foe thi purpose we have defined a middleware in middleware.js file and are using that middleware here nemed 'isOwner'
router.route("/:id/edit").get( isLoggedIn, isOwner, wrapAsync(lisitngController.renderEditForm))

module.exports = router;
