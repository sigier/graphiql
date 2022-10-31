const mongoose = require("mongoose");

const schema  = mongoose.Schema;

const postSchema = mongoose.Schema({
    title:{
        required: true,
        type: String,
        maxlength: 100
    },
    excerpt:{
        required: true,
        type: String,
        maxlength: 1000
    },
    content:{
        required: true,
        type: String,
        maxlength: 10000
    },
    author:{
        type: schema.Types.ObjectId,
        ref: 'User',
        require: true
    },
    status:{
        type: String,
        enum: ['DRAFT','PUBLIC'],
        default: 'DRAFT'
    }

},{timestamp: {createdAt: 'created_at', updatedAt: 'updated_at'}});

const Post = mongoose.model('Post', postSchema);
module.exports({ Post  });