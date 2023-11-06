// cấp 3
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const majorSchema = new Schema(
    {
        IDMajor: {
            type: String,
            query: true,
        },
        //trường phụ thuộc
        IDCategory: {
            type: String,
            query: true,
        },
        //trường phụ thuộc
        IDType: {
            type: String,
            query: true,
        },
        NameMajor: {
            type: String,
            query: true,
        }
    },
    { timestamps: true },
);
//
const majorModule = mongoose.model('major', majorSchema);
module.exports = majorModule;