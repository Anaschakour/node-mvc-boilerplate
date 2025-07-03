const joi = require("joi");
require("dotenv").config();
const ErrorApi = require("./../utils/errorApi.js");
const { enVarSchema } = require("./../validation/env.validate.js");
const {logger} = require("./../config");

const { error, value: enVars } = enVarSchema.validate(process.env);

if (error) {
    logger.error(error.message);
    process.exit(1);
}

module.exports = { port: enVars.PORT, uri: enVars.DB, env: enVars.ENV };
