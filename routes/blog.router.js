const express = require("express");
const { validate } = require("./../middleware/validate.js");
const { blogSchema } = require("./../validation/blog.validate.js");

const {
    getAllBlogs,
    addBlog
} = require("./../controllers/blog.controllers.js");

const router = express.Router();

router.get("/blogs", getAllBlogs);
router.post("/blog", validate(blogSchema), addBlog);

module.exports = router;
