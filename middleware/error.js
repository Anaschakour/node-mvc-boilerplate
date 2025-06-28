const { env } = require("./../config/config.js");
const ErrorApi = require("./../utils/errorApi.js");
const mongoose = require("mongoose");
const httpStatus = require("http-status");
const logger = require("./../config/logger.js");
const errorConverter = (err, req, res, next) => {
    let error = err;
    if (!(error instanceof ErrorApi)) {
        const statusCode =
            error.statusCode || error instanceof mongoose.Error
                ? httpStatus.status.BAD_REQUEST
                : httpStatus.status.INTERNAL_SERVER_ERROR;
        const message = err.message || httpStatus[statusCode];
        error = new ErrorApi(
            statusCode,
            message,
            error instanceof mongoose.Error ? true : false,
            error.stack
        );
    }

    next(error);
};

const errorHandler = (err, req, res, next) => {
    let { statusCode, message } = err;

    if (env === "production" && !err.isOperational) {
        statusCode = httpStatus.status.INTERNAL_SERVER_ERROR;
        message = httpStatus.status[statusCode];
    }

    const response = {
        error: true,
        code: statusCode,
        message,
        ...(env === "development" && { stack: err.stack })
    };
    res.locals.errMessage = message;

    if (env === "development") {
        logger.info({ ...response });
    }
    res.status(statusCode).json(response);
};

module.exports = { errorHandler, errorConverter };
