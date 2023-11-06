//locales
const i18n = require('i18n');
//models
const CustomerModule = require('../../../models/customer.models');
//id
const { generateId } = require('../../../components/randomID');

const khanhHangController = {
    //Lấy tất cả danh sách khánh hàng
    getAll: async (req, res) => {
        try {
            const data = await CustomerModule.find();

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //lấy theo ID
    getByID: async (req, res) => {
        const id = req.params.id;
        try {
            const data = await CustomerModule.findById(id);

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },
    /***********************************************************/
    //tạo khách hàng
    createKhanhHang: async (req, res) => {
        try {
            const { tenCustomer, EmailCustomer, diaChiCustomer, soDienThoaiCustomer, BGAndHD } = req.body;

            if (!tenCustomer) {
                return res.status(401).json({ message: 'Pls Input Customer Name' });
            }

            // if (!EmailCustomer) {
            //     return res.status(401).json({ message: 'Vui lòng nhập tên khách hàng' });
            // }

            // if (!diaChiCustomer) {
            //     return res.status(401).json({ message: 'Vui lòng nhập tên khách hàng' });
            // }

            // if (!soDienThoaiCustomer) {
            //     return res.status(401).json({ message: 'Vui lòng nhập tên khách hàng' });
            // }

            // if (!BGAndHD) {
            //     return res.status(401).json({ message: 'Vui lòng nhập tên khách hàng' });
            // }

            //tạo mới khánh hàng
            const newKhanhHang = new CustomerModule({
                uidCustomer: generateId(),
                tenCustomer,
                EmailCustomer,
                diaChiCustomer,
                soDienThoaiCustomer,
                BGAndHD,
            });
            //lưu vào DB
            await newKhanhHang.save();

            return res.status(200).json({ message: 'Create Customer Success' });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //update khánh hàng
    updateKhanhHang: async (req, res) => {
        try {
            const id = req.params.id;

            const { tenCustomer, EmailCustomer, diaChiCustomer, soDienThoaiCustomer, BGAndHD } = req.body;

            if (!tenCustomer) {
                return res.status(401).json({ message: 'Pls Input Customer Name' });
            }

            //lưu vào DB
            await CustomerModule.findByIdAndUpdate(id, {
                tenCustomer,
                EmailCustomer,
                diaChiCustomer,
                soDienThoaiCustomer,
                BGAndHD,
            });

            return res.status(200).json({ message: 'Update Customer Success' });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //xóa khánh hàng
    deleteKhanhHang: async (req, res) => {
        try {
            const id = req.params.id;

            await CustomerModule.findByIdAndDelete(id);

            return res.status(200).json({ message: 'Delete Customer Success' });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },
};

module.exports = khanhHangController;
