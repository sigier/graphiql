const { User } = require("../../models/user");
const { UserInputError, AuthenticationError, ApolloError } = require("apollo-server-express");

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
        }
    }
}