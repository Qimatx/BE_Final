// Using Node.js `require()`
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const donThongTinSchema = new Schema(
    {
        uidDonThongTin: {
            type: String,
            query: true,
        },
        uidFDonChinh: {
            type: String,
            query: true,
        },
        phuongPhapThu: {
            type: String,
            query: true,
        },
        thongTinMauThuKHCungCap: {
            type: String,
            query: true,
        },
        khongLuuMau: {
            type: Boolean,
            query: true,
        },
        ketQuaNgonNgu: {
            type: String,
            query: true,
        },
        yeuCauKhacKH: {
            type: String,
            query: true,
        },
        hinhThucTraKetQua: {
            type: String,
            query: true,
        },
        nhaThauPhuThucHien: {
            type: String,
            query: true,
        },
        ngayChaKetQua: {
            type: Date,
            query: true,
        },
        phiThiNghiem: {
            type: String,
            query: true,
        },
        chiPhi: {
            type: String,
            query: true,
        },
        tamUng: {
            type: String,
            query: true,
        },
        conLai: {
            type: String,
            query: true,
        },
        // soPYCTN: {
        //     type: String,
        //     query: true,
        // },
        //==========================
        nguoiGiaoMau: {
            type: String,
            query: true,
        },
        nguoiNhanMau: {
            type: String,
            query: true,
        },
        diaDienGiaoNhanMau: {
            type: String,
            query: true,
        },
        ngayHenTraKetQua: {
            type: Date,
            query: true,
        },
        phuongPhapKiemNghiem: {
            type: String,
            query: true,
        },
        suDungNhaThauPhu: {
            type: String,
            query: true,
        },
        yeuCauKhac: {
            type: String,
            query: true,
        },
        banGiaoMauHoanThanhLuc: {
            type: Date,
            query: true,
        }
    },
    { timestamps: true },
);
//
const donThongTinModule = mongoose.model('donThongTin', donThongTinSchema);
module.exports = donThongTinModule;
