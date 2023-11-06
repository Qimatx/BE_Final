//cấp 2
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const typeSchema = new Schema(
    {
        IDType: {
            type: String,
            query: true,
        },
        //trường phụ thuộc
        IDCategory: {
            type: String,
            query: true,
        },
        NameType: {
            type: String,
            query: true,
        }
    },
    { timestamps: true },
);
//
const typeModule = mongoose.model('type', typeSchema);
module.exports = typeModule;