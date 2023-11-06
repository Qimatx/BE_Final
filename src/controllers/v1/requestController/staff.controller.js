//models
const staffModule = require('../../../models/staff.model');
//locales
const i18n = require('i18n');
//uuid
const { v4: uuidv4 } = require('uuid');

const staffController = {
    getAll: async (req, res) => {
        try {
            const data = await staffModule.find();

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //lấy theo ID
    getByID: async (req, res) => {
        const id = req.params.id;
        try {
            const data = await staffModule.findById(id);

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },
    //tạo mới khách hàng
    createStaff: async (req, res) => {
        const { tenStaff, emailStaff, chucVuStaff, phongBanStaff, trangThaiStaff } = req.body;
        try {
            if (!tenStaff) {
                return res.status(401).json({ message: 'Please enter staff name' });
            }

            if (!emailStaff) {
                return res.status(401).json({ message: 'Please enter staff email' });
            }

            if (!chucVuStaff) {
                return res.status(401).json({ message: 'Please enter role ' });
            }

            if (!phongBanStaff) {
                return res.status(401).json({ message: 'Please enter department' });
            }

            if (!trangThaiStaff) {
                return res.status(401).json({ message: 'Please enter Status' });
            }

            //Lưu dữ liệu vào
            const data = new staffModule({
                uIDStaff: uuidv4,
                tenStaff,
                emailStaff,
                chucVuStaff,
                phongBanStaff,
                trangThaiStaff,
            });
            await data.save();

            return res.status(200).json({ message: 'Staff information created successfully' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: i18n.__('error') });
        }
    },
    updateStaff: async (req, res) => {
        try {
            const id = req.params.id;

            const { tenStaff, emailStaff, chucVuStaff, phongBanStaff, trangThaiStaff } = req.body;

            if (!tenStaff) {
                return res.status(401).json({ message: 'Please enter staff name' });
            }

            if (!emailStaff) {
                return res.status(401).json({ message: 'Please enter staff email' });
            }

            if (!chucVuStaff) {
                return res.status(401).json({ message: 'Please enter role ' });
            }

            if (!phongBanStaff) {
                return res.status(401).json({ message: 'Please enter department' });
            }

            if (!trangThaiStaff) {
                return res.status(401).json({ message: 'Please enter Status' });
            }

            //lưu vào DB
            await staffModule.findByIdAndUpdate(id, {
                tenStaff,
                emailStaff,
                chucVuStaff,
                trangThaiStaff,
            });

            return res.status(200).json({ message: 'Update Staff Success' });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    deleteStaff: async (req, res) => {
        try {
            const id = req.params.id;

            await staffModule.findByIdAndDelete(id);

            return res.status(200).json({ message: 'Delete Customer Success' });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },
    changestatus: async (req, res) => {
        const { islock } = req.body;
        const id = req.params.id;
        await staffModule.findByIdAndUpdate(id, { islock });
        try {
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: i18n.__('error') });
        }
    },
};

module.exports = staffController;
