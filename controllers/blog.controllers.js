const { asyncAwait } = require("./../utils/asyncAwait.js");
const blogServices = require("./../services/blog.services.js");
const getAllBlogs = asyncAwait(async (req, res) => {
    const data = await blogServices.getBlogs();
    res.status(200).json({ status: 200, items: data.length, data: data });
});
const addBlog = asyncAwait(async (req, res) => {
    const created = await blogServices.createBlog(req.body);
    res.status(200).json({ status: 200, createdPost: created });
});

module.exports = { getAllBlogs, addBlog };
