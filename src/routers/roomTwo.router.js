const express = require('express');
//controller
const roomTwoController = require('../controllers/v1/requestController/roomTwo.controller');
//router
const router = express.Router();
//middleware
const jwtMiddleware = require('../middlewares/jwts.middleware');
const { redirectVersion } = require('../middlewares/version.middleware');

//tạo mới đơn main
router.post(
    '/create-request-main',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: roomTwoController.createRequestMain
    }),
);
//tạo mới đơn child
router.post(
    '/create-request-child',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: roomTwoController.createRequesChild
    }),
);

module.exports = router;
