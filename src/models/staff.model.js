// Using Node.js `require()`
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const staffSchema = new Schema(
    {
        uIDStaff: {
            type: String,
            query: true,
        },
        tenStaff: {
            type: String,
            query: true,
        },
        emailStaff: {
            type: String,
            query: true,
        },
        chucVuStaff: {
            type: String,
            query: true,
        },
        phongBanStaff: {
            type: String,
            query: true,
        },
        trangThaiStaff: {
            type: String,
            query: true,
        },
    },
    { timestamps: true },
);
//
const staffModule = mongoose.model('staff', staffSchema);
module.exports = staffModule;
