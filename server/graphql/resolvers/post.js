const { Post } = require("../../models/post");
const { Category } = require("../../models/category");
const { User } = require("../../models/user");



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
        }
    }
}