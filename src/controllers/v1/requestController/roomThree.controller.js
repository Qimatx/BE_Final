//bộ phận mã hóa(14/03/2023)
//uuid
const { v4: uuidv4 } = require('uuid');
//models
// const RequestMainModule = require('../../../models/RequestMain.model');
const RequestChildModule = require('../../../models/RequestChild.model');
const loaiYeuCauModule = require('../../../models/loaiYeuCau.models');
//locales
const i18n = require('i18n');

const roomThreeController = {
    //cập nhật mã số mẫu và loại yêu cầu thêm một trường phòng hờ cho việc Mã Số mẫu tự động
    update: async (req, res) => {
        const { _id, MaSoMau, loaiYeuCau } = req.body;

        try {
            if (!MaSoMau) {
                returnres.status(401).json({ message: 'Please enter the model number' });
            }

            if (!loaiYeuCau) {
                returnres.status(401).json({ message: 'Please select request type' });
            }

            await RequestChildModule.findByIdAndUpdate({ _id: _id }, { MaSoMau, loaiYeuCau, MaSoMauAuto: uuidv4() });

            return res.status(200).json({ message: 'Sample code generation and successful request type' });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //lấy list loại yêu cầu để user chọn
    getAllLoaiYeuCau: async (req, res) => {
        try {
            const data = await loaiYeuCauModule.find();

            return res.status(200).json({ data });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //tạo list loại yêu cầu
    createLoaiYeuCau: async (req, res) => {
        try {
            const { NameLoaiYeuCau, Note } = req.body;

            if (!NameLoaiYeuCau) {
                returnres.status(401).json({ message: 'Please enter request type' });
            }

            const data = new loaiYeuCauModule({ NameLoaiYeuCau, Note, IDLoaiYeuCau: uuidv4() });

            await data.save();

            return res.status(200).json({ message: 'Successfully created data ' });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //Sửa list yêu cầu
    updateLoaiYeuCau: async (req, res) => {
        try {
            const { _id, NameLoaiYeuCau, Note } = req.body;

            if (!_id) {
                returnres.status(401).json({ message: 'Please enter id' });
            }

            if (!NameLoaiYeuCau) {
                returnres.status(401).json({ message: 'Please enter request type' });
            }

            await loaiYeuCauModule.findByIdAndUpdate({ _id: _id }, { NameLoaiYeuCau, Note });

            return res.status(200).json({ message: 'Successfully updated request type' });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //Xóa list yêu cầu
    deleteLoaiYeuCau: async (req, res) => {
        try {
            const { _id } = req.body;

            await loaiYeuCauModule.findByIdAndDelete({ _id: _id });
            return res.status(200).json({ message: 'Successfully deleted request type' });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },
};

module.exports = roomThreeController;
