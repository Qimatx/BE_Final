const express = require('express');
//controller
const authController = require('../controllers/v1/auth.controller');
//router
const router = express.Router();
//middleware
const jwtMiddleware = require('../middlewares/jwts.middleware');
const { redirectVersion } = require('../middlewares/version.middleware');

//đăng nhập
router.post(
    '/login',
    redirectVersion({
        v1: authController.login,
    }),
);

//đăng ký
router.post(
    '/register',
    redirectVersion({
        v1: authController.register,
    }),
);

//gửi email
router.get(
    '/send-email',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: authController.sendEmailVerify,
    }),
);

//check account
router.get(
    '/check-account',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: authController.checkAccount,
    }),
);

//lay tat ca account
router.get(
    '/get-all-account',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: authController.getAllAccount,
    }),
);

//lay tat ca account
router.delete(
    '/delete-account/:id',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: authController.deleteAccount,
    }),
);

//gửi email
router.get(
    '/change-status-account',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: authController.changestatus,
    }),
);
router.get(
    '/role',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: authController.getRole,
    }),
);

module.exports = router;
