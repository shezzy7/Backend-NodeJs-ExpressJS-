//Joi :  Joi is the most powerful schema description language and data validator for JavaScript.We use joi for validing our schema at backend side.Mean if user gives us some inout data and we want to add this data in our database but before inserting this data into our database we want to first analyse that whether data given by the user is under the constraint written in our schema.This help us in handling server side errors.

let Joi  = require("joi");
let listingSchema = Joi.object({
    listing:Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        location : Joi.string().required(),
        country : Joi.string().required(),
        price : Joi.number().required().min(0),
        image : Joi.string().allow("",null),
        options:Joi.array().items(Joi.string()).optional(),
        // tax:Joi.number().required(),

    }).required()
})
let reviewSchema = Joi.object({
    review : Joi.object({
        rating : Joi.number().required().min(1).max(5),
        comment : Joi.string().required()
    }).required()
})

module.exports = {listingSchema,reviewSchema};

// const Joi = require("joi");

// const listingSchema = Joi.object({
//     listing: Joi.object({
//         title: Joi.string().required(),
//         description: Joi.string().required(),
//         location: Joi.string().required(),
//         country: Joi.string().required(),
//         price: Joi.number().required().min(0),
//         image: Joi.string().allow("", null)
//     }).required()
// });

// const reviewSchema = Joi.object({
//     review: Joi.object({
//         rating: Joi.number().required().min(1).max(5),
//         comment: Joi.string().required()
//     }).required()
// });

// module.exports = { listingSchema, reviewSchema };

