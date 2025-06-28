const joi = require("joi");

const blogSchema = {
    body:{
      title: joi.string().required(),
    description: joi.string().required()
    }
};

module.exports = { blogSchema };
