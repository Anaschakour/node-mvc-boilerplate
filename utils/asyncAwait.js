const ErrorApi = require("./../utils/errorApi.js");
const asyncAwait = fn => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(err => {
        next(err);
    });
};

module.exports = { asyncAwait };
