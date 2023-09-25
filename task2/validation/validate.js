const joi = require("@hapi/joi");


const reqSchema = joi.object({
    name: joi.string().required(),
    link: joi.string().uri(),
    status: joi.string(),
    desktopImage: joi.string(),
    mobileImage: joi.string(),
})


module.exports={
    reqSchema,
}