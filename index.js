const mongoose = require("mongoose");
const httpStatus = require("http-status");
const ErrorApi = require("./utils/errorApi.js");
const http = require("http");
const logger = require("./config/logger.js");
const { uri } = require("./config/config.js");
const { app } = require("./server.js");
const { port } = require("./config/config.js");
mongoose
    .connect(uri)
    .then(() => {
        logger.info("connected to database");
    })
    .catch(err => {
        logger.error(err);
    });

const httpServer = http.createServer(app);
httpServer.listen(port, err => {
    if (err) {
        logger.error(err);
        process.exit(1);
    }
    logger.info(`server is listening in port ${port}`);
});
const exitHandler = () => {
    if (httpServer) {
        httpServer.close(() => {
            logger.info("server closed");
            process.exit(1);
        });
    } else {
        process.exit(1);
    }
};
const uncaughtErrorHandler = error => {
    logger.error(error);
    exitHandler();
};
process.on("uncaughtException", uncaughtErrorHandler);
process.on("unhandledRejection", uncaughtErrorHandler);
process.on("SIGINT", () => {
    logger.info("SIGTERM recieved");
    if (httpServer) {
        httpServer.close();
    }
});
