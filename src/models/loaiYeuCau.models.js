// Using Node.js `require()`
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const loaiYeuCauSchema = new Schema(
    {
        IDLoaiYeuCau: {
            type: String,
            query: true,
        },
        NameLoaiYeuCau: {
            type: String,
            query: true,
        },

        Note: {
            type: String,
            query: true,
        },
    },
    { timestamps: true },
);
//
const loaiYeuCauModule = mongoose.model('loaiYeuCau', loaiYeuCauSchema);
module.exports = loaiYeuCauModule;
