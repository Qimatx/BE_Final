//jwt
const jwt = require('jsonwebtoken');
//model
const authModel = require('../models/auth.model');

const jwtMiddleware = {
    checkAccount: async (req, res, next) => {
        const authorization = req.headers.authorization;
        if (!authorization) {
            return res.status(401).json({
                message: 'Không có mã thông báo nào được cung cấp',
            });
        }

        const accessToken = authorization.split(' ')[1];

        try {
            const dataUser = await authModel.find({ access_token: accessToken }, { publicKey: 1, islock: 1 });

            //nếu không tìm ra accessToken thông báo
            if (dataUser.length < 1) {
                return res.status(401).json({
                    message:
                        'Tài khoản của bạn đã được đăng nhập trên một thiết bị khác hoặc không có mã thông báo nào tồn tại',
                });
            }
            //xác thực jwt
            jwt.verify(accessToken, dataUser[0].publicKey, (err, decoded) => {
                if (err) {
                    // console.log(err);
                    return res.status(401).json({ message: 'lỗi xác thực' });
                }

                req.user = decoded;
            });

            //kiểm tra tài khoản khóa
            if (dataUser[0].islock) {
                return res.status(401).json({ message: 'Tài khoản đã bị khóa vui lòng liên hệ admin' });
            }

            next();
        } catch (error) {
            // console.log(error);
            res.status(401).json({ message: 'Invalid token.' });
            return;
        }
    },
    //===================================
    //admin
    verifyAdmin: (req, res, next) => {
        if (req.user.role === 'Admin') {
            next();
        } else {
            return res.status(403).json({ message: 'Bạn không có quyền truy cập vào nội dung' });
        }
    },
};

// xuất ra để sử dụng
module.exports = jwtMiddleware;
