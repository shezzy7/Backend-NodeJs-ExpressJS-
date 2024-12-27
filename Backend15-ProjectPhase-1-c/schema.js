//Joi :  Joi is the most powerful schema description language and data validator for JavaScript.We use joi for validing our schema at backend side.Mean if user gives us some inout data and we want to add this data in our database but before inserting this data into our database we want to first analyse that whether data given by the user is under the constraint written in our schema.This help us in handling server side errors.

let Joi  = require("joi");
let lisitngSchema = Joi.object({
    listing:Joi.object({
        title : Joi.string().required(),
        description : Joi.string().required(),
        location : Joi.string().required(),
        country : Joi.string().required(),
        price : Joi.number().required().min(0),
        image : Joi.string().allow("",null)

    }).required()
})

module.exports  = lisitngSchema;