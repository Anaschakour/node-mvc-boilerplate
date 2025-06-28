const joi = require("joi");
const { validate } = require("./../middleware/validate.js");
const enVarSchema = joi
    .object({
        DB: joi.string().required(),
        PORT: joi.number().default(3000),
        ENV: joi.string()
    })
    .unknown();

validate(enVarSchema);
module.exports = { enVarSchema };
