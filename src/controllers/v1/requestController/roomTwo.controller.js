//Phòng nhận mẫu (3/11/2023)
//locales
const i18n = require('i18n');
//uuid
const { v4: uuidv4 } = require('uuid');
//models
const RequestMainModule = require('../../../models/RequestMain.model');
const RequestChildModule = require('../../../models/RequestChild.model');

const roomTwoController = {
    //Cập nhật thêm thông tin khách hàng khi cần thiết(Hoặc thiếu)
    //Ý tưởng:
    //Người dùng tạo ra đơn yêu cầu cha sau đó DB lưu lại Số ID đơn cha do mình tự tạo
    //Sau đó người dùng chọn đơn cha tiếp tục tạo ra đơn con DB lưu lại số ID đơn con do tự tạo
    //Server sẽ lưu ID tự tạo trên đơn cha vào cho đơn con và đơn cha củng sẽ lưu array ID đơn con
    //Khi tìm kiếm ta dùng ID tự tạo đơn cha tìm ra đơn con (Đơn con có lưu ID tự tạo của đơn cha)
    //tạo ra đơn yêu cầu cha
    createRequestMain: async (req, res) => {
        const { loaiYeuCau, Nguoihotro, So, DateConfirm } = req.body;

        try {
            if (!loaiYeuCau) {
                return res.status(401).json({ message: 'Please enter request type' });
            }

            if (!Nguoihotro) {
                return res.status(401).json({ message: 'Please enter support person/contact name' });
            }

            if (!So) {
                return res.status(401).json({ message: 'Please enter the number' });
            }

            if (!DateConfirm) {
                return res.status(401).json({ message: 'Please enter your order confirmation date' });
            }
            const newData = new RequestMainModule({ RequestMainID: uuidv4(), loaiYeuCau, Nguoihotro, So, DateConfirm });

            await newData.save();

            return res.status(200).json({ message: 'Create a successful total order' });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //tạo đơn con
    createRequesChild: async (req, res) => {
        const { RequestMainID, TenMau, ChiTieuPhanTich, KhoiLuong, Note } = req.body;

        try {
            if (!RequestMainID) {
                return res.status(401).json({ message: 'Pls input Id Main' });
            }

            if (!TenMau) {
                return res.status(401).json({ message: 'Pls input form name ' });
            }

            if (!ChiTieuPhanTich) {
                return res.status(401).json({ message: 'Pls input analysis criteria' });
            }

            if (!KhoiLuong) {
                return res.status(401).json({ message: 'Pls input Weight' });
            }

            //tạo ra ID cho đơn con
            const IDRequestChild = uuidv4();
            //tìm đơn cha sau đó cộng số lượng đơn con
            const dataMain = await RequestMainModule.find({ RequestMainID }, { childNumber: 1, RequestChildID: 1 });
            //tạo ra đơn con
            const newData = new RequestChildModule({
                RequestMainID,
                STT: dataMain[0].childNumber + 1,
                TenMau,
                IDRequestChild,
                ChiTieuPhanTich,
                KhoiLuong,
                Note,
            });
            await newData.save();
            //và cập nhật vào array đơn cha
            await RequestMainModule.findOneAndUpdate(
                { RequestMainID },
                {
                    RequestChildID: [...dataMain[0].RequestChildID, IDRequestChild],
                    childNumber: dataMain[0].childNumber + 1,
                },
            );
            //All ok
            return res.status(200).json({ message: 'Create a successful sub-application' });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },
};

module.exports = roomTwoController;
