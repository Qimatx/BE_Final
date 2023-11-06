//Phòng kinh doanh (3/11/2023)
//models
const CustomerModule = require('../../../models/customer.models');
//locales
const i18n = require('i18n');
const roomOneController = {
    //nhập thông tin của khách hàng (tạo thông tin cho khách hàng)
    createCustomer: async (req, res) => {
        const { NameCustomer, EmailCustomer, AdressCustomer, PhoneNumber, BGAndHD } = req.body;
        try {
            if (!NameCustomer) {
                returnres.status(401).json({ message: 'Pls input Customer Name' });
            }

            if (!PhoneNumber) {
                returnres.status(401).json({ message: 'Pls input Phone Number' });
            }

            //Lưu dữ liệu vào
            const data = new CustomerModule({ NameCustomer, EmailCustomer, AdressCustomer, PhoneNumber, BGAndHD });
            await data.save();

            return res.status(200).json({ message: 'Customer information has been created successfully' });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    // Sửa thông tin khách hàng
    editCustomer: async (req, res) => {
        const { IDCustomer, NameCustomer, EmailCustomer, AdressCustomer, PhoneNumber, BGAndHD } = req.body;

        try {
            if (!NameCustomer) {
                returnres.status(401).json({ message: 'Pls input Customer Name' });
            }
            if (!PhoneNumber) {
                returnres.status(401).json({ message: 'Pls input Phone Number' });
            }

            //lưu thông tin mới (Cập nhật lại thông tin người dùng)
            await CustomerModule.findByIdAndUpdate(
                { _id: IDCustomer },
                { NameCustomer, EmailCustomer, AdressCustomer, PhoneNumber, BGAndHD },
            );

            return res.status(200).json({ message: 'Customer information has been created successfully' });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    // Xóa khách hàng

    // Xem tất cả khách hàng
    getAllCustomer: async (req, res) => {
        try {
            const data = CustomerModule.find();

            return res.status(200).json({ data });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    // Xem thông tin khác hàng chi tiết theo ID
    getInforCustomer: async (req, res) => {
        const { IDCustomer } = req.body;
        try {
            const data = CustomerModule.findById({ _id: IDCustomer });

            return res.status(200).json({ data });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    // Xem thông tin khác hàng chi tiết theo Số điện thoại
    getInforCustomerByPhone: async (req, res) => {
        const { PhoneNumber } = req.body;
        try {
            const data = CustomerModule.find({ PhoneNumber });

            return res.status(200).json({ data });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },
};

module.exports = roomOneController;
