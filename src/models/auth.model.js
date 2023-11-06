// Using Node.js `require()`
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const AccountSchema = new Schema(
    {
        TowFA: {
            type: Boolean,
            default: false,
        },
        email: {
            type: String,
            query: true,
        },
        password: {
            type: String,
            query: true,
        },
        verified: {
            type: Boolean,
            query: true,
            default: false,
        },
        publicKey: {
            type: String,
            query: true,
        },
        secret: {
            ascii: String,
            hex: String,
            base32: String,
            otpauth_url: String,
        },
        role: {
            type: String,
            query: true,
            default: 'user',
        },
        Name: {
            type: String,
            query: true,
            default: 'Account',
        },
        islock: {
            type: Boolean,
            query: true,
            default: false,
        },
        access_token: {
            type: String,
            query: true,
        },
        NameRestaurant: {
            type: String,
            query: true,
        },
    },
    { timestamps: true },
);
//
const AccountModule = mongoose.model('Account', AccountSchema);
module.exports = AccountModule;
