const express = require("express");
const cors = require("cors");
const morgan = require("./config/morgan.js");
const blogRouter = require("./routes/blog.router.js");
const httpStatus = require('http-status');
const { errorHandler, errorConverter } = require("./middleware/error.js");
const ErrorApi = require("./utils/errorApi.js");
const app = express();
app.use(cors());
app.use(morgan.successHandler);
app.use(morgan.errorHandler);
app.use(express.json());
app.use(blogRouter);
app.use((req, res, next) => {
    next(
        new ErrorApi(
            httpStatus.status.NOT_FOUND,
            httpStatus.status[httpStatus.status.NOT_FOUND]
        )
    );
});
app.use(errorConverter);
app.use(errorHandler);

module.exports = { app };
