//Phòng phân tích (15/3/2023)
//locales
const i18n = require('i18n');
//uuid
const { v4: uuidv4 } = require('uuid');
//models
const RequestChildModule = require('../../../models/RequestChild.model');
const categoryModule = require('../../../models/group/category.model');
const typeModule = require('../../../models/group/type.models');
const majorModule = require('../../../models/group/major.models');

const roomFourController = {
    /*cập nhật (Thêm dữ liệu) cho báo cáo con (Phương pháp thử, thông tin mẫu được KH cung cấp, 
    note, kết quả ngày trả, người gửi mẫu, đơn vị giám sát)*/
    updata: async (req, res) => {
        const { _id } = req.body;
        //phần này dùng 3 biến dữ liệu để làm (Phương pháp thử(choose))
        const { Catgory, Major, Type } = req.body;
        //
        const { ThongTinMauDoKHCungCap, Note, NgayTraMau, NguoiGuiMau, DonViGiamSat } = req.body;

        try {
            if (!Catgory) {
                returnres.status(401).json({ message: 'Pls input category' });
            }

            if (!Major) {
                returnres.status(401).json({ message: 'Pls input major' });
            }

            if (!Type) {
                returnres.status(401).json({ message: 'Pls input type' });
            }

            if (!ThongTinMauDoKHCungCap) {
                returnres.status(401).json({ message: 'Pls input description' });
            }

            if (!NgayTraMau) {
                returnres.status(401).json({ message: 'Pls input date return' });
            }

            if (!NguoiGuiMau) {
                returnres.status(401).json({ message: 'Please enter the sender form' });
            }

            if (!DonViGiamSat) {
                returnres.status(401).json({ message: 'Please enter monitoring unit' });
            }

            await RequestChildModule.findByIdAndUpdate(
                { _id: _id },
                {
                    Catgory,
                    Major,
                    Type,
                    ThongTinMauDoKHCungCap,
                    Note,
                    NgayTraMau,
                    NguoiGuiMau,
                    DonViGiamSat,
                },
            );

            return res.status(200).json({ message: 'Create success' });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //tạo thành select  Phương pháp thử(choose) bằng cách ghép ba table (Category, Type, Major)
    // thứ tự cấp bật category, major, type
    //get category
    getCategory: async (req, res) => {
        try {
            const data = await categoryModule.find();

            return res.status(200).json({ data });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //lấy dữ liệu type theo category và major
    getMajorByCategory: async (req, res) => {
        try {
            const { IDCategory } = req.body;

            const data = await typeModule.find({ IDCategory });

            return res.status(200).json({ data });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },
    //lấy dữ liệu major theo type
    getMajorByType: async (req, res) => {
        try {
            const { IDType } = req.body;

            const data = await majorModule.find({ IDType });

            return res.status(200).json({ data });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //=================================
    //tạo category
    createCategory: async (req, res) => {
        try {
            const { NameCategory } = req.body;

            const data = new categoryModule({ IDCategory: uuidv4, NameCategory });

            await data.save();

            return res.status(200).json({ message: 'Create success' });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //tạo type
    createType: async (req, res) => {
        try {
            const { NameType, IDCategory } = req.body;

            const data = new typeModule({ IDType: uuidv4, NameType, IDCategory });

            await data.save();

            return res.status(200).json({ message: 'Create success' });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //tạo major
    createMajor: async (req, res) => {
        try {
            const { NameMajor, IDCategory, IDType } = req.body;

            const data = new typeModule({ IDMajor: uuidv4, NameMajor, IDCategory, IDType });

            await data.save();

            return res.status(200).json({ message: 'Create success' });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },
    //=====================================
    //cập nhật category
    updateCategory: async (req, res) => {
        const { _id, NameCategory } = req.body;
        try {
            await categoryModule.findByIdAndUpdate({ _id }, { NameCategory });

            return res.status(200).json({ message: 'Update successful' });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },
    //cập nhật type
    updateType: async (req, res) => {
        const { _id, NameType } = req.body;
        try {
            await typeModule.findByIdAndUpdate({ _id }, { NameType });

            return res.status(200).json({ message: 'Update successful' });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },
    //cập nhật major
    updateMajor: async (req, res) => {
        const { _id, NameMajor } = req.body;
        try {
            await majorModule.findByIdAndUpdate({ _id }, { NameMajor });

            return res.status(200).json({ message: 'Update successful' });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },
    //=====================================
    //Xóa category
    deleteCategory: async (req, res) => {
        try {
            const { _id } = req.body;
            try {
                if (!_id) {
                    returnres.status(401).json({ message: 'Please enter id' });
                }

                await categoryModule.findByIdAndDelete({ _id });

                return res.status(200).json({ message: 'Delete successfully' });
            } catch (error) {
                return res.status(500).json({ message: i18n.__('error') });
            }
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },
    //Xóa type
    deleteType: async (req, res) => {
        const { _id } = req.body;
        try {
            if (!_id) {
                returnres.status(401).json({ message: 'Please enter id' });
            }

            await typeModule.findByIdAndDelete({ _id });

            return res.status(200).json({ message: 'Delete successfully' });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },
    //Xóa major
    deleteMajor: async (req, res) => {
        const { _id } = req.body;
        try {
            if (!_id) {
                returnres.status(401).json({ message: 'Please enter id' });
            }

            await majorModule.findByIdAndDelete({ _id });

            return res.status(200).json({ message: 'Delete successfully' });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },
    //================================
    //lấy tất cả category
    getAllCategory: async (req, res) => {
        try {
            const data = await categoryModule.find();

            return res.status(200).json({ data });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //lấy tất cả type
    getAllType: async (req, res) => {
        try {
            const data = await typeModule.find();

            return res.status(200).json({ data });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //lấy tất cả major
    getAllMajor: async (req, res) => {
        try {
            const data = await majorModule.find();

            return res.status(200).json({ data });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },
};

module.exports = roomFourController;
