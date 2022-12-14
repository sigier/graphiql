const { Post } = require("../../models/post");
const { Category } = require("../../models/category");



module.exports = {
    User:{
        posts: async(parent, args, context, info) =>{
            try {
                const userId = parent._id;
                const posts = await Post.findOne({author: userId});

                return posts;

            } catch (err) {
                throw err;
            }
        },
        categories: async(parent, args, context, info) =>{
            try {
                const userId = parent._id;
                const categories = await Category.findOne({author: userId});

                return categories;

            } catch (err) {
                throw err;
            }
        }
    }
}