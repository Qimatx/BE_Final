// Using Node.js `require()`
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RequestMainSchema = new Schema(
    {
        RequestMainID: {
            type: String,
            query: true,
        },
        childNumber: {
            type: Number,
            query: true,
            default: 0
        },
        CustomerID: {
            type: String,
            query: true,
        },
        RequestName: {
            type: String,
            query: true,
        },
        MaSoThue: {
            type: String,
            query: true,
        },
        So: {
            type: String,
            query: true,
        },
        Nguoihotro: {
            type: String,
            query: true,
        },
        RequestChildID: {
            type: Array,
            query: true,
        },
        PhuongPhapThu: {
            type: String,
            query: true,
        },
        ThongTinMau: {
            type: String,
            query: true,
        },
        TraKetQua: {
            type: String,
            query: true,
        },
        NgayTraKetQua: {
            type: String,
            query: true,
        },
        DiaDiemGiaoNhanMau: {
            type: String,
            query: true,
        },
        SuDungNhaThauPhu: {
            type: String,
            query: true,
        },
        NguoiNhapLieu: {
            type: String,
            query: true,
        },
        DateConfirm: {
            type: Date,
            query: true,
        },
        Note: {
            type: String,
            query: true,
        }
    },
    { timestamps: true },
);
//
const RequestMainModule = mongoose.model('RequestMain', RequestMainSchema);
module.exports = RequestMainModule;
