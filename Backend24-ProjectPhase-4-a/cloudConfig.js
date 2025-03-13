// here we will be making asetup for cloudinary(for uploading images on cloud).All this code is present on cloudinary documentation.
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
// we have to config cour cloudinary sysytem for us.For this purpose we have to send cloud_name,api_key,api_secret to this function as an argumetn and it performs some operation and connects our server with cloudinary 
cloudinary.config({
    cloud_name : process.env.CLOUD_NAME,
    api_key : process.env.CLOUD_API_KEY,
    api_secret : process.env.CLOUD_API_SECRET
})

// now we have to define at which place we want to place our data in cloudinary and this function is also given in npm multer-storage-cloudinary documentation
const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'wonderlust_DEV', //what should be the name of folder on clouds
      allowedFormates: ["png","jpg","jpeg"], // types of files we support for our folder
     
    },
  });

  module.exports={
    storage,cloudinary
  }