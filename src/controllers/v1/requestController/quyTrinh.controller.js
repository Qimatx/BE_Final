//locales
const i18n = require('i18n');
//models
const donMauModule = require('../../../models/donMau.module');
const donChinhModule = require('../../../models/donChinh.models');
const CustomerModule = require('../../../models/customer.models');
const donThongTinModule = require('../../../models/donThongTin.models');
//id
const { generateId } = require('../../../components/randomID');

const quyTrinhController = {
    //===================================================//quy trình chung
    //lấy thông tin khách hàng theo ID đơn chính
    getAllThongTinKH: async (req, res) => {
        try {
            const id = req.params.id;

            //lấy uid đơn chính
            const dataUidFDonChinh = await donChinhModule.findById(id, { uidFKhanhHang: 1 });

            //tìm thông tin khánh hàng
            const data = await CustomerModule.find({ uidCustomer: dataUidFDonChinh.uidFKhanhHang });

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //===================================================//Quy trình nhận mẫu
    //Đọc dữ liệu đơn mẫu (1)
    getAllDonMau1: async (req, res) => {
        try {
            const data = await donMauModule.find();

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //lấy tất cả đơn mẫu theo id đơn chính (1)
    getAllDonMauByIDDonChinh: async (req, res) => {
        try {
            const id = req.params.id;

            //lấu uid của đơn chính
            const dataUidFDonChinh = await donChinhModule.findById(id, { uidDonChinh: 1 });

            const data = await donMauModule.find({ uidFDonChinh: dataUidFDonChinh.uidDonChinh });

            return res.status(200).json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //get id đơn mẫu (1)
    getIDDonMau1: async (req, res) => {
        const id = req.params.id;

        try {
            const data = await donMauModule.findById(id);

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //Tạo ra bản mẫu (1)
    taoMauDonXacNhanYeuCau: async (req, res) => {
        const id = req.params.id;

        const { tenMau, khoiLuong, chiTieuThuNghiem, note1 } = req.body;

        try {
            if (!tenMau) {
                return res.status(400).json({ message: 'Pls input type request' });
            }

            if (!chiTieuThuNghiem) {
                return res.status(400).json({ message: 'Please enter test target' });
            }

            if (!khoiLuong) {
                return res.status(400).json({ message: 'Please enter weight' });
            }

            //lấu uid của đơn chính
            const dataUidFDonChinh = await donChinhModule.findById(id, { uidDonChinh: 1 });

            //thông tin đơn mẫu
            const newDonMau = new donMauModule({
                uidDonMau: generateId(),
                uidFDonChinh: dataUidFDonChinh.uidDonChinh,
                maSo: generateId(),
                tenMau,
                khoiLuong,
                chiTieuThuNghiem,
                note1,
            });

            //lưu đơn mẫu
            await newDonMau.save();

            return res.status(200).json({ message: 'Create a successful application form' });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //cập nhật đơn mẫu 1
    updateDonMau1: async (req, res) => {
        try {
            const id = req.params.id;

            const { tenMau, khoiLuong, chiTieuThuNghiem, note1 } = req.body;

            if (!tenMau) {
                return res.status(400).json({ message: 'Please enter type name' });
            }

            if (!chiTieuThuNghiem) {
                return res.status(400).json({ message: 'Please enter test target' });
            }

            if (!khoiLuong) {
                return res.status(400).json({ message: 'Pls Input Weight' });
            }

            //lưu vào DB
            await donMauModule.findByIdAndUpdate(id, {
                tenMau,
                khoiLuong,
                chiTieuThuNghiem,
                note1,
            });

            return res.status(200).json({ message: 'Successful Update Confirmation' });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //xóa đơn mẫu 1
    deleteDonMau1: async (req, res) => {
        try {
            const id = req.params.id;

            await donChinhModule.findByIdAndDelete(id);

            return res.status(200).json({ message: 'Delete confirmation' });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //hoàn thành quy trình (1)
    hoanThanhQuyTrinh1: async (req, res) => {
        try {
            const id = req.params.id;

            const data = await donChinhModule.findByIdAndUpdate(id, { quyTrinh: '1' });

            const newDonThongTin = new donThongTinModule({
                uidDonThongTin: generateId(),
                uidFDonChinh: data.uidDonChinh,
            });

            await newDonThongTin.save();

            return res.status(200).json({ message: 'Successful completion confirmation' });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //===================================================Mẫu 2
    //Quy trình các thông tin trong đơn thông tin
    //lấy tất cả thông tin trong đơn thông tin theo id
    getAllDonThongTinTheoID: async (req, res) => {
        try {
            const id = req.params.id;

            //lấu uid của đơn chính
            const dataUidFDonChinh = await donChinhModule.findById(id, { uidDonChinh: 1 });

            const data = await donThongTinModule.find({ uidFDonChinh: dataUidFDonChinh.uidDonChinh });
            return res.status(200).json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //cập nhật thông tin chung cho đơn số 3.1
    updateDonThongTin3_1: async (req, res) => {
        try {
            const id = req.params.id;

            const {
                phuongPhapThu,
                thongTinMauThuKHCungCap,
                khongLuuMau,
                ketQuaNgonNgu,
                yeuCauKhacKH,
                hinhThucTraKetQua,
                chiTieuThuNghiem,
                nhaThauPhuThucHien,
                ngayChaKetQua,
                phiThiNghiem,
                chiPhi,
                tamUng,
                conLai,
            } = req.body;

            const data = await donChinhModule.findById(id, { uidDonChinh: 1 });

            await donThongTinModule.findOneAndUpdate(
                { uidFDonChinh: data.uidDonChinh },
                {
                    phuongPhapThu,
                    thongTinMauThuKHCungCap,
                    khongLuuMau,
                    ketQuaNgonNgu,
                    yeuCauKhacKH,
                    chiTieuThuNghiem,
                    hinhThucTraKetQua,
                    nhaThauPhuThucHien,
                    ngayChaKetQua,
                    phiThiNghiem,
                    chiPhi,
                    tamUng,
                    conLai,
                },
            );

            return res.status(200).json({ message: 'Successful Update confirmation' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //cập nhật đơn mẫu 2
    updateDonMau2: async (req, res) => {
        try {
            const id = req.params.id;

            const { moTaMau } = req.body;

            //lưu vào DB
            await donMauModule.findByIdAndUpdate(id, {
                moTaMau,
            });

            return res.status(200).json({ message: 'Successful Update confirmation' });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //hoàn thành quy trình (2)
    hoanThanhQuyTrinh2: async (req, res) => {
        try {
            const id = req.params.id;

            await donChinhModule.findByIdAndUpdate(id, { quyTrinh: '2' });

            return res.status(200).json({ message: 'Successful completion confirmation' });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //===================================================Mẫu 4
    //cập nhật thông tin chung cho đơn số 4
    updateDonThongTin4: async (req, res) => {
        try {
            const id = req.params.id;

            const {
                nguoiGiaoMau,
                nguoiNhanMau,
                diaDienGiaoNhanMau,
                ngayHenTraKetQua,
                phuongPhapKiemNghiem,
                suDungNhaThauPhu,
                yeuCauKhac,
                banGiaoMauHoanThanhLuc,
            } = req.body;

            const data = await donChinhModule.findById(id, { uidDonChinh: 1 });

            await donThongTinModule.findOneAndUpdate(
                { uidFDonChinh: data.uidDonChinh },
                {
                    nguoiGiaoMau,
                    nguoiNhanMau,
                    diaDienGiaoNhanMau,
                    ngayHenTraKetQua,
                    phuongPhapKiemNghiem,
                    suDungNhaThauPhu,
                    yeuCauKhac,
                    banGiaoMauHoanThanhLuc,
                },
            );

            return res.status(200).json({ message: 'Successful Update Confirmation' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //cập nhật đơn mẫu 4
    updateDonMau4: async (req, res) => {
        try {
            const id = req.params.id;

            const { quyCanh, dangVSLoaiMau, tinhTrangMauKhiBanGiao } = req.body;

            //lưu vào DB
            await donMauModule.findByIdAndUpdate(id, {
                quyCanh,
                dangVSLoaiMau,
                tinhTrangMauKhiBanGiao,
            });

            return res.status(200).json({ message: 'Successful Update Confirmation' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //hoàn thành quy trình (3)
    hoanThanhQuyTrinh3: async (req, res) => {
        try {
            const id = req.params.id;

            await donChinhModule.findByIdAndUpdate(id, { quyTrinh: '3' });

            return res.status(200).json({ message: 'Successful Completion Confirmation' });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },
    deletequytrinh3: async (req, res) => {
        try {
            const id = req.params.id;

            await donChinhModule.findByIdAndDelete(id);

            return res.status(200).json({ message: 'Delete confirmation' });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },
};

module.exports = quyTrinhController;
