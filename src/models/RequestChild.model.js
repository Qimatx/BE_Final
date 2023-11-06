// Using Node.js `require()`
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const RequestChildSchema = new Schema(
    {
        RequestMainID: {
            type: String,
            query: true,
        },
        STT: {
            type: Number,
            query: true,
        },
        TenMau: {
            type: String,
            query: true,
        },
        MucDich: {
            type: String,
            query: true,
        },
        IDRequestChild: {
            type: String,
            query: true,
        },
        LoaiHinhSanXuat: {
            type: String,
            query: true,
        },
        LoaiBaoQuan: {
            type: String,
            query: true,
        },
        MaSoMau: {
            type: String,
            query: true,
        },
        MaSoMauAuto: {
            type: String,
            query: true,
        },
        TinhTrangMauKhiBanGiao: {
            type: String,
            query: true,
        },
        ChiTieuPhanTich: {
            type: String,
            query: true,
        },
        NenMau: {
            type: String,
            query: true,
        },
        Catgory: {
            type: String,
            query: true,
        },
        Major: {
            type: String,
            query: true,
        },
        Type: {
            type: String,
            query: true,
        },
        loaiYeuCau: {
            type: String,
            query: true,
        },
        KhoiLuong: {
            type: String,
            query: true,
        },
        //Gai đoạn tới phòng nào
        Status: {
            type: String,
            query: true,
        },
        //dụng  cụ chữa mẫu
        DungCuChuaMau: {
            type: Array,
            query: true,
        },
        //thiết bị
        Tool: {
            type: Array,
            query: true,
        },
        //nhân viên thực hiện
        NhanVienThucHien: {
            type: Array,
            query: true,
        },
        //Xe vậy chuyển
        XeVanChuyen: {
            type: Array,
            query: true,
        },
        //bảo quản
        CachBaoQuan: {
            type: String,
            query: true,
        },
        //nội dung công việc
        NoiDungCongViec: {
            type: String,
            query: true,
        },
        NgayGuiMau: {
            type: Date,
            query: true,
        },
        NgayTraMau: {
            type: Date,
            query: true,
        },
        ToaDo: {
            type: String,
            query: true,
        },
        Note: {
            type: String,
            query: true,
        },
        NguoiGuiMau: {
            type: String,
            query: true,
        },
        DonViGiamSat: {
            type: String,
            query: true,
        },
        KhachHangXacNhan: {
            type: Boolean,
            query: true,
            default: false,
        },
        ThongTinMauDoKHCungCap: {
            type: String,
            query: true,
        },
        //mã số lấy mẫu (Mã số gì đó dùng để khi mà lấy mẫu)
        BBLM: {
            type: String,
            query: true,
        }
    },
    { timestamps: true },
);
//
const RequestChildModule = mongoose.model('RequestChild', RequestChildSchema);
module.exports = RequestChildModule;
