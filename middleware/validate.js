const joi = require("joi");
const ErrorApi = require("./../utils/errorApi.js");
const httpStatus = require("http-status");
const validate = schema => (req, res, next) => {
    const keys = Object.keys(schema);
    const object = keys.reduce((obj, key) => {
        if (Object.prototype.hasOwnProperty.call(req, key)) {
            obj[key] = req[key];
        }
        return obj;
    }, {});
    const { error, value } = joi.compile(schema).validate(object);
    if (error) {
        const errors = error.details
            .map(detail => {
                return detail.message;
            })
            .join(",");

        next(new ErrorApi(httpStatus.status
          .BAD_REQUEST, errors));
    }
    next();
};

module.exports = { validate };
