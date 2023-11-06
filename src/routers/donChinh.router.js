const express = require('express');
//controller
const donChinhController = require('../controllers/v1/requestController/donChinh.controller');
//router
const router = express.Router();
//middleware
const jwtMiddleware = require('../middlewares/jwts.middleware');
const { redirectVersion } = require('../middlewares/version.middleware');
const multer = require('multer');
// create multer instance
const upload = multer({
    dest: 'uploads/', // specify upload directory
});

//láy tất cả danh sách mới đơn
router.get(
    '/get-all-don-chinh',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: donChinhController.getAll,
    }),
);

//láy tất cả danh sách mới đơn
router.post(
    '/get-all-don-chinh-quy-trinh',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: donChinhController.getAllByQuyTrinh,
    }),
);

//lấy danh sách mới đơn thao ID
router.get(
    '/get-don-chinh-id/:id',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: donChinhController.getByID,
    }),
);

//tạo mới đơn main
router.post(
    '/create-don-chinh',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: donChinhController.createDonChinh,
    }),
);

//cập nhật đơn main
router.put(
    '/update-don-chinh-id/:id',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: donChinhController.updateDonChinh,
    }),
);

//xóa đơn main
router.delete(
    '/deleter-don-chinh-id/:id',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: donChinhController.deleteDonChinh,
    }),
);

//upload file
router.post(
    '/upload',
    jwtMiddleware.checkAccount,
    upload.single('file'),
    redirectVersion({
        v1: donChinhController.uploadfile,
    }),
);

//dowloadfile
router.post(
    '/dowload-file',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: donChinhController.dowloadfile,
    }),
);
router.get(
    '/dowload-file2',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: donChinhController.getcustomEX,
    }),
);

module.exports = router;
