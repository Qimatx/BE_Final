const express = require('express');
//controller
const chartController = require('../controllers/v1/requestController/chart.controller');
//router
const router = express.Router();
//middleware
const jwtMiddleware = require('../middlewares/jwts.middleware');
const { redirectVersion } = require('../middlewares/version.middleware');

//gửi chart 1
router.get(
    '/chart-1',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: chartController.chart1,
    }),
);

//gửi chart 2
router.get(
    '/chart-2',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: chartController.chart2,
    }),
);

//gửi chart 3
router.get(
    '/chart-3',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: chartController.chart3,
    }),
);

//gửi thống kê 0,1,2,3
router.post(
    '/thong-ke-quy-trinh',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: chartController.thongke1,
    }),
);

router.post(
    '/thong-ke-quy-trinh-1',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: chartController.thongke2,
    }),
);

router.post(
    '/thong-ke-quy-trinh-2',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: chartController.thongke2,
    }),
);

router.post(
    '/thong-ke-quy-trinh-3',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: chartController.thongke2,
    }),
);

router.post(
    '/thong-ke-quy-trinh-4',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: chartController.thongke2,
    }),
);

//gửi thống kê 5
router.get(
    '/thong-ke-quy-trinh-5',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: chartController.thongke5,
    }),
);

module.exports = router;
