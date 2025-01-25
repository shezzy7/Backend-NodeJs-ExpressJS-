const Listing = require("../models/listing.js");
const mbxGeocoding = require('@mapbox/mapbox-sdk/services/geocoding');
const mapToken = process.env.MAP_TOKEN;
const geocodingClient = mbxGeocoding({ accessToken: mapToken });
//index
module.exports.index = async (req, res) => {
    const listing = await Listing.find({});
    res.render("./listing/index.ejs", { listing });
}
// render form for input new listing
module.exports.renderNewForm = async (req, res) => {
    res.render("./listing/create.ejs")
}
//render form for posting new listing
module.exports.createListing = async (req, res, next) => {
    //if user does not enter any data and press submit button then in this a error will be generated tho handle this we will first check whether our post request contains any data or not
    //let result = listingSchema.validate(req.body);//this will validate that user's input fine or not according to our defined schema's constraints.
    // if(result.error){
    //     throw new ExpressError(400 , "Please enter all the fields in correct syntax");
    // }
    // if(!req.body.listing){ //Now we don't need this as our joi is working such type of functionality for us.
    //     throw new ExpressError(400,"Please enter valid data")
    // }
    // below code for gecoding is copied from documentation

    let coordinates1 = await geocodingClient.forwardGeocode({
        query: req.body.listing.location,
        limit: 1 //limit is the number of how many possible coordinates we want.
      })
        .send()
        // our varibale coordinates will give us a whole object body inside this object there's another object features(which is an array of size 1) inside which there is an object named geometry which contains an of size of 2 which contains our given locations  
        
    
    let list = new Listing(req.body.listing);//fetching data from request body.As we have named each input section as a key of an object named lisitng.
    list.owner = req.user;
    // we also have to save info of image 
    let url= req.file.path;
    let filename = req.file.filename;
    list.image = {url,filename}
    list.geometry = coordinates1.body.features[0].geometry;
    await list.save();
    console.log(list);
    req.flash("success", "New Listing added successfully!");
    res.redirect("/listings");

}
//show a specifc listing
module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    let list = await Listing.findById(id)
    .populate({
        path: "reviews",
         populate: {
            path: "author"
        },
    }).populate("owner"); //we want to show name of author of each review with it.As we know that in each listing there is a reveiws section in which each element  is refering to Review model.In review model there is a author section which and this author is refering to User model which will provide us info of that user.
    //So here we are populating our listing such as we say that  in Listing populate reviews and then for each review populate author and then after this we are populating owner of that listing.
    if (!list) {
        req.flash("error", "Listing you are asking for does not exists!")
        res.redirect("/listings");
    }
    res.render("./listing/show.ejs", { list });
}

//delete listing
module.exports.destroyListing = async (req, res) => {
    let { id } = req.params;
    // let result = await Listing.findById(id);
    // await Review.deleteMany({_id:{$in:res.orders}})
    await Listing.findByIdAndDelete(id);
    req.flash("success", "Listing Deleted Successfully!");
    res.redirect("/listings");
}           

//render Edit form
module.exports.renderEditForm=async (req, res) => {
    let { id } = req.params;
    let list = await Listing.findById(id);
    if (!list) {
        req.flash("error", "Listing you are asking for does not exists!")

        res.redirect("/listings");
    }
    // now we want that while editing a listing a user should be also able to see previous image.But we want to change its pixels for reducing load from website.For reducing pixles of an image cloudaniry provides us a method.In each uploaded link cloudaniry adds an upload route if we go to cloudaniry site then we can see that how we can change pixels.So here we will be first fetching image's url and replaceing "/uploads" by "/uploads/w_300" which will change its pixles and we will change its pixles
    let originalImageUrl = list.image.url;
    console.log(originalImageUrl);
    originalImageUrl.replace("/upload","/upload/h_250,w_300")
    console.log(originalImageUrl);
    res.render("./listing/edit.ejs", { list ,originalImageUrl});
}
//update a listing
module.exports.updateListing=async (req, res) => {

    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });
    if(typeof req.file !== "undefined"){//user can upload a new image or not while editing.If he is not uploading a new image then req.file will be undefined else it will be containing some data and we will add to listing.
        let url = req.file.path;
        let filename = req.file.filename;
        listing.image = {url,filename};
        list.geometry = coordinates1.body.features[0].geometry;
        await listing.save();
    }
    req.flash("success", "Listing Updated!");

    res.redirect(`/listings/${id}`);
}

// search country
module.exports.searchCountry = async(req,res)=>{
    let {search:country} = req.query;
    console.log(country);
    
    let listing = await Listing.find({country});
    console.log(listing)
    if(!(listing && listing.length)){
        req.flash("error",`Sorry,We found no place in ${country}!`)
        return res.redirect("/listings");
    }
    res.render("./listing/index.ejs",{listing});
}