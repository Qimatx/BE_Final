const express = require('express');
//controller
const quyTrinhController = require('../controllers/v1/requestController/quyTrinh.controller');
//router
const router = express.Router();
//middleware
const jwtMiddleware = require('../middlewares/jwts.middleware');
const { redirectVersion } = require('../middlewares/version.middleware');

//===================================================//quy trình chung
//lấy thông tin khách hàng theo ID đơn chính
router.get(
    '/get-KH-by-id/:id',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: quyTrinhController.getAllThongTinKH,
    }),
);
//===================================================//Quy trình nhận mẫu
//lấy tất cả đơn mẫu 1
router.get(
    '/get-all-mau-don-1',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: quyTrinhController.getAllDonMau1,
    }),
);

//lấy tất cả đơn mẫu theo id đơn chính (1)
router.get(
    '/get-all-mau-don-1-by-id-don-chinh/:id',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: quyTrinhController.getAllDonMauByIDDonChinh,
    }),
);

//get id đơn mẫu (1)
router.get(
    '/get-mau-don-1-id/:id',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: quyTrinhController.getIDDonMau1,
    }),
);

//tạo mới đơn main
router.post(
    '/create-mau-don-1/:id',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: quyTrinhController.taoMauDonXacNhanYeuCau,
    }),
);

//cập nhật đơn mẫu 1
router.put(
    '/update-mau-don-1/:id',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: quyTrinhController.updateDonMau1,
    }),
);

//xóa đơn mẫu 1
router.delete(
    '/delete-mau-don-1/:id',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: quyTrinhController.deleteDonMau1,
    }),
);

//hoàn thành quy trình (1)
router.get(
    '/hoan-thanh-quy-trinh-1/:id',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: quyTrinhController.hoanThanhQuyTrinh1,
    }),
);
//=================================================== mẫu 2
//Quy trình các thông tin trong đơn thông tin
//lấy tất cả thông tin trong đơn thông tin theo id
router.get(
    '/get-all-don-thong-tin-by-id-don-chinh/:id',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: quyTrinhController.getAllDonThongTinTheoID,
    }),
);

//cập nhật thông tin chung cho đơn số 3.1
router.put(
    '/cap-nhat-thong-tin-chung-3-1/:id',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: quyTrinhController.updateDonThongTin3_1,
    }),
);

//cập nhật đơn mẫu 2
router.put(
    '/cap-nhat-don-mau-2/:id',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: quyTrinhController.updateDonMau2,
    }),
);

//hoàn thành quy trình (2)
router.get(
    '/hoan-thanh-quy-trinh-2/:id',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: quyTrinhController.hoanThanhQuyTrinh2,
    }),
);
//=================================================== mẫu 4
//cập nhật thông tin chung cho đơn số 4
router.put(
    '/cap-nhat-thong-tin-chung-4/:id',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: quyTrinhController.updateDonThongTin4,
    }),
);

//cập nhật đơn mẫu updateDonMau4
router.put(
    '/cap-nhat-don-mau-4/:id',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: quyTrinhController.updateDonMau4,
    }),
);

//hoàn thành quy trình (3)
router.get(
    '/hoan-thanh-quy-trinh-3/:id',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: quyTrinhController.hoanThanhQuyTrinh3,
    }),
);
router.delete(
    '/delete-quy-trinh-3/:id',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: quyTrinhController.deletequytrinh3,
    }),
);

module.exports = router;
