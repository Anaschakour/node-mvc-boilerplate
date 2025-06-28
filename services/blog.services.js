const { Blog } = require("./../models/blog.model.js");

const getBlogs = async () => {
    const data = await Blog.find({});
    return data;
};
const createBlog = async body => {
    const created = await Blog.create(body);
    return created;
};

module.exports = { getBlogs, createBlog };
