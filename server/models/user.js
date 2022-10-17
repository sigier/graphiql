const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();
const SALT_I = 10;

const userSchema  = mongoose.Schema(
    {
        email:{
            type:String,
            required:true,
            trim:true,
            unique:true,
            lowecase:true,
            validate: [validator.isEmail, 'invalid email']
        },
        password:{
            type:String,
            required:true,
            minlength:5,
        },
        name:{
            type:String,
            maxlength:20,
        },
        lastname:{
            type:String,
            maxlength:20,
        },
        token:{
            type:String,
        }
    }
);

userSchema.pre('save', function(next){
    let user = this;

    if(user.isModified('password')){
        bcrypt.genSalt(SALT_I, function(err, salt){
            if(err){
                return next(err);
            }

            bcrypt.hash(user.password, salt, function(err,hash){
                if(err){
                    return next(err);
                }

                user.password = hash;
                next();
            });
        });

    }else{
        next();
    }
});

userSchema.methods.isValidPassword = function(candidatePass) {
    let user = this;
    return bcrypt.compare(candidatePass, user.password).then(function(result){
        return result;
    });
};

userSchema.methods.generateToken() = async function(){
    let user = this;

    let token = jwt.sign({
        _id:user._id,
        email:user.email
    },
    process.env.SECRET, {
        expiresIn:'7d'
    });

    user.token = token;
    return user.save(); 
};

const User = mongoose.model('User', userSchema);
module.exports = { User };