const express = require('express');
//controller
const towFWController = require('../controllers/v1/twoFW.controller');
//router
const router = express.Router();
//middleware
const jwtMiddleware = require('../middlewares/jwts.middleware');
const { redirectVersion } = require('../middlewares/version.middleware');

//bật google 2fw
router.put(
    '/turn-on-towfw',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: towFWController.activated2FA,
    }),
);

//tắt google 2fw
router.put(
    '/turn-off-towfw',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: towFWController.TurnOff2FA,
    }),
);

//xác thực mã google 2fw
router.post(
    '/verify-towfw',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: towFWController.validate,
    }),
);

module.exports = router;
