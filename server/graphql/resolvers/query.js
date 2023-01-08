const { User } = require("../../models/user");
const authorize = require("../../utils/isAuth")
const { AuthenticationError } = require("apollo-server-express");
const { Category } = require("./category");


module.exports = {
    Query:{
        user: async(parent, args, context, info) =>{
            try {
                const req = authorize(context.req)
                const user = await User.findOne({'_id':args.id});

                if(req._id.toString() !== user._id.toString()){
                    throw new AuthenticationError("Not authorized");
                }
                return user;
            } catch (error) {
                throw error;
            }
        },
        isAuth: async(parent, args, context, info) =>{
            try {
                const req = authorize(context.req, true);

                if(!req._id){
                    throw new AuthenticationError('Bad token');
                }

                return { _id: req._id, email: req.email, token: req.token }

            } catch (error) {
                throw error;
            }
        },
        categories:async(parent, {catId}, context, info) =>{
            try {
                let catQuery = {};

                if(catId){
                    catQuery['_id'] = catId;
                }
                const categories = await Category.find(category);
                return categories;
            } catch (error) {
                throw error;
            }
        }
    }
}