const { User } = require("../../models/user");
const { Post } = require("../../models/post");
const {  AuthenticationError, ApolloError } = require("apollo-server-express");
const authorize = require('../../util/isAuth');
const { userOwnership } = require("../../util/tools");

module.exports = {
    Mutation:{
        authUser: async(parent, args, context, info) =>{
            try {
                const user = User.findOne({ 'email': args.fields.email });

                if(!user){
                    throw new AuthenticationError("something went wrong, try again!");
                }

                const checkPassword = await user.isValidPassword(args.fields.password);
                if(!checkPassword){ 
                    throw new AuthenticationError("something went wrong, try again!");
                }

                const getToken = await user.generateToken();
                if(!getToken){
                    throw new AuthenticationError("something went wrong, try again!");
                }

                return { _id: user._id, email: user.email, token: getToken.token };
            } catch (error) {
                
            }
        },
        signUp: async(parent, args, context, info) =>{
            try {
                const user = new User({
                    email: args.fields.email,
                    password:args.fields.password
                });

                const getToken = await user.generateToken();
                if(!getToken){
                    throw new AuthenticationError("something went wrong, try again!");
                }

                const result = await user.save();
                return {...result._doc};

            } catch (err) {
                if (err.code === 11000){
                    throw new AuthenticationError("duplicated email used!");
                }
            }
        
        },
        updateUserProfile: async(parent, args, context, info) => {
            try {
                const req = authorize(context.req);

                if(!userOwnership(req, args._id)){
                    throw new AuthenticationError("Not your user!");
                }

                const user = await User.findOneAndUpdate(
                    {_id:args._id},
                    {
                        "$set": {
                            name: args.name,
                            lastname: args.lastname
                        }
                    },
                    {new: true}
                );
                
                return {...user._doc};
            } catch (err) {
                throw err;
            }
  
        },
        updateUserEmailPass: async(parent, args, context, info) => {
            try {
                const req = authorize(context.req);

                if(!userOwnership(req, args._id)){
                    throw new AuthenticationError("Not your user!");
                }
                const user = await User.findOne({_id: req._id});

                if(!user){
                    throw new AuthenticationError("No user found!");
                }
                
                if(args.email) { 
                    user.email = args.email;
                }

                if(args.password) { 
                    user.password = args.password;
                }

                const getToken = await user.generateToken();

                if(!getToken){
                    throw new AuthenticationError("No user found!");
                }

                return {...getToken._doc, token: getToken.token};

                
            } catch (err) {
                throw new ApolloError("No user found!", err);
            }
        },
        createPost: async(parent, { fields }, context, info) => {
            try {
                const req = authorize(context.req);
                const post = new Post({
                    title: fields.title,
                    excerpt: fields.excerpt,
                    content: fields.content,
                    author: req._id,
                    status: fields.status
                });

                const result = await post.save();
                return {...result._doc};

            } catch (err) {
                throw err;
            }
        }
    }
}