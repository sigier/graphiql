const { User } = require("../../models/user");
const {  AuthenticationError } = require("apollo-server-express");
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
        }
    }
}