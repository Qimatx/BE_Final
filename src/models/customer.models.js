// Using Node.js `require()`
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const customerSchema = new Schema(
    {
        uidCustomer: {
            type: String,
            query: true,
        },
        uidFDonChinh: {
            type: String,
            query: true,
        },
        tenCustomer: {
            type: String,
            query: true,
        },
        EmailCustomer: {
            type: String,
            query: true,
        },
        diaChiCustomer: {
            type: String,
            query: true,
        },
        soDienThoaiCustomer: {
            type: String,
            query: true,
        },
        BGAndHD: {
            type: String,
            query: true,
        }
    },
    { timestamps: true },
);
//
const CustomerModule = mongoose.model('Customer', customerSchema);
module.exports = CustomerModule;
