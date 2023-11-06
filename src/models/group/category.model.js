//cấp 1
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const categorySchema = new Schema(
    {
        IDCategory: {
            type: String,
            query: true,
        },
        NameCategory: {
            type: String,
            query: true,
        }
    },
    { timestamps: true },
);
//
const categoryModule = mongoose.model('category', categorySchema);
module.exports = categoryModule;