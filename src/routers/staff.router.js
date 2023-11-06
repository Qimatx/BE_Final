const express = require('express');
//controller
const staffController = require('../controllers/v1/requestController/staff.controller');
//router
const router = express.Router();
//middleware
const jwtMiddleware = require('../middlewares/jwts.middleware');
const { redirectVersion } = require('../middlewares/version.middleware');

//tạo mới khách hàng
router.post(
    '/staff-create',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: staffController.createStaff,
    }),
);
router.get(
    '/staff-all',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: staffController.getAll,
    }),
);
router.get(
    '/staff-one/:id',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: staffController.getByID,
    }),
);
router.put(
    '/staff-updatestatus/:id',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: staffController.changestatus,
    }),
);
router.put(
    '/staff-update/:id',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: staffController.updateStaff,
    }),
);
router.delete(
    '/staff-delete/:id',
    jwtMiddleware.checkAccount,
    redirectVersion({
        v1: staffController.deleteStaff,
    }),
);

module.exports = router;
