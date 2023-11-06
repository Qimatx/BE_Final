// Using Node.js `require()`
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const donChinhSchema = new Schema(
    {
        uidDonChinh: {
            type: String,
            query: true,
        },
        uidFKhanhHang: {
            type: String,
            query: true,
        },
        loaiYeuCau: {
            type: String,
            query: true,
        },
        quyTrinh: {
            type: String,
            query: true,
            default: "0",
        },
        nguoiHoTro: {
            type: String,
            query: true,
        },
        note: {
            type: String,
            query: true,
        }

    },
    { timestamps: true },
);
//
const donChinhModule = mongoose.model('donChinh', donChinhSchema);
module.exports = donChinhModule;
