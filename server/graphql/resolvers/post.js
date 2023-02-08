const { Post } = require("../../models/post");
const { Category } = require("../../models/category");
const { User } = require("../../models/user");
const { sortArgsHelper } = require('../../util/tools');


module.exports = {
    Post:{
        author: async(parent, args, context, info) =>{
            try {
                const userId = parent.author;
                const author = await User.findOne({id: userId});

                return {...author._doc, password :null};

            } catch (err) {
                throw err;
            }
        },
        category: async(parent, args, context, info) =>{
            try {
                const categoryId = parent.category;
                const category = await Category.findById({_id: categoryId});

                return {...category._doc};

            } catch (err) {
                throw err;
            }
        },
        related: async(parent, {sort}, context, info) =>{
            try {
                let sortArgs = sortArgsHelper(sort);
                const posts = await Post
                .find({"category":parent.category})
                .sort([[sortArgs.sortBy, sortArgs.order]])
                .skip(sortArgs.skip)
                .limit(sortArgs.limit);

                return posts;
                
            } catch (error) {
                throw error;
            }
        }
    }
}