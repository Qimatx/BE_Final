//locales
const i18n = require('i18n');
//2FW
const speakeasy = require('speakeasy');
//models
const authModel = require('../../models/auth.model');

const towFWController = {
    //bật 2 lớp bảo mật google
    activated2FA: async (req, res) => {
        const id = req.user._id;

        try {
            await authModel.findByIdAndUpdate(id, { TowFA: true });

            res.status(200).json({
                success: true,
                message: 'Đã bật hai lớp bảo mật',
            });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //tắt 2 lớp bảo mật google
    TurnOff2FA: async (req, res) => {
        const id = req.user._id;

        try {
            await authModel.findByIdAndUpdate(id, { TowFA: false });

            res.status(200).json({
                success: true,
                message: 'Đã tắt hai lớp bảo mật',
            });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //in mã qr
    printQR: async (req, res) => {
        const id = req.user._id;

        try {
            const data = await authModel.findById(id, {
                secret: { otpauth_url: 1 },
                _id: 0,
            });

            return res.status(200).json({ data: data.secret.otpauth_url });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //xác thực mã authenticator
    validate: async (req, res) => {
        const { otp } = req.body;
        const id = req.user._id;

        //kiem tra ma token xác thực có trống không
        if (!otp) {
            return res.status(400).json({
                message: 'Nhập mã xác thực',
            });
        }

        try {
            //đọc dữ liệu
            const dataSecret = await authModel.findById(id, {
                secret: 1,
                _id: 0,
            });
            //xác thực mã OTP
            const { base32: secret } = dataSecret.secret;
            // Returns true if the token matches
            const tokenValidates = speakeasy.totp.verify({
                secret,
                encoding: 'base32',
                token: otp,
                window: 1,
            });
            if (tokenValidates) {
                return res.status(200).json({
                    message: 'Xác thực thành công',
                });
            } else {
                return res.status(401).json({
                    message: 'Xác thực không thành công',
                });
            }
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },
};

module.exports = towFWController;
