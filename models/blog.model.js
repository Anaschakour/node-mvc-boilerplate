const mongoose = require("mongoose");

const schema = new mongoose.Schema({
    title: {
        type: String,
        unique: [true, "every blog must have a unique title"],
        required: [true, "every blog must have a title"]
    },
    description: {
        type: String,
        required: [true, "every blog must have a dzscriprion"]
    }
});
const Blog = mongoose.model("blog", schema);

module.exports = { Blog };
