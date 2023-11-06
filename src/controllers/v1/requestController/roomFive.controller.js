//phòng quan trắc
//locales
const i18n = require('i18n');
//uuid
const { v4: uuidv4 } = require('uuid');
//models
const RequestChildModule = require('../../../models/RequestChild.model');

const roomFiveController = {
    //tạo phòng quan trắc đơn 1
    createOne: async (req, res) => {
        const { _id } = req.body;
        //phần này dùng 3 biến dữ liệu để làm (Phương pháp thử(choose))
        const { Catgory, Major, Type } = req.body;
        //
        const { MaSoMau, MucDich, LoaiHinhSanXuat, LoaiBaoQuan, Tool } = req.body;
        try {
            await RequestChildModule.findByIdAndUpdate({ _id: _id }, { Catgory, Major, Type });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },
};

module.exports = roomFiveController;
