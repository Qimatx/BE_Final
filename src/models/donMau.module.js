// Using Node.js `require()`
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const donMauSchema = new Schema(
    {
        uidDonMau: {
            type: String,
            query: true,
        },
        uidFDonChinh: {
            type: String,
            query: true,
        },
        maSo: {
            type: String,
            query: true,
        },
        tenMau: {
            type: String,
            query: true,
        },
        khoiLuong: {
            type: String,
            query: true,
        },
        chiTieuThuNghiem: {
            type: Array,
            query: true,
        },
        moTaMau: {
            type: String,
            query: true,
        },
        quyCanh: {
            type: String,
            query: true,
        },
        dangVSLoaiMau: {
            type: String,
            query: true,
        },
        tinhTrangMauKhiBanGiao: {
            type: String,
            query: true,
        },
        note1: {
            type: String,
            query: true,
        },

    },
    { timestamps: true },
);
//
const donMauModule = mongoose.model('donMau', donMauSchema);
module.exports = donMauModule;
