const mongoose = require("mongoose");

const schema  = mongoose.Schema;

const categorySchema = mongoose.Schema({
    name:{
        required: true,
        type: String,
        trim: true,
        unique: true,
        lowercase: true,
        maxlength: 250
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
    },
    category:{
        type: schema.Types.ObjectId,
        ref: 'Category',
        require: true
    },

},{timestamp: {createdAt: 'created_at', updatedAt: 'updated_at'}});

const Category = mongoose.model('Category', categorySchema);
module.exports({ Category  });