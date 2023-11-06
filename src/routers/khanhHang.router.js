const express = require('express');
//controller
const khanhHangController = require('../controllers/v1/requestController/khanhHang.controller');
//router
const router = express.Router();
//middleware
const jwtMiddleware = require('../middlewares/jwts.middleware');
const { redirectVersion } = require('../middlewares/version.middleware');

//láy tất cả danh sách khánh hàng
router.get(
    '/get-all-khanh-hang',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: khanhHangController.getAll,
    }),
);

//lấy danh sách khách hàng thao ID
router.get(
    '/get-khanh-hang-id/:id',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: khanhHangController.getByID,
    }),
);

//tạo mới đơn main
router.post(
    '/create-khanh-hang',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: khanhHangController.createKhanhHang,
    }),
);

//cập nhật khánh hàng
router.put(
    '/update-khanh-hang-id/:id',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: khanhHangController.updateKhanhHang,
    }),
);

//xóa khánh hàng
router.delete(
    '/deleter-khanh-hang-id/:id',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: khanhHangController.deleteKhanhHang,
    }),
);

module.exports = router;
