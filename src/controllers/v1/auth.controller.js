//locales
const i18n = require('i18n');
//import cheack format email
const validator = require('validator');
//nodemailer
const nodemailer = require('nodemailer');
//crypto
const crypto = require('crypto');
//jwt
const jwt = require('jsonwebtoken');
//import bcrypt
const bcrypt = require('bcrypt');
//models
const authModel = require('../../models/auth.model');
//Call 2FW
const speakeasy = require('speakeasy');
//google-auth-library
const { OAuth2Client } = require('google-auth-library');
//env
const dotenv = require('dotenv');
dotenv.config();

//===================================
//khởi tạo oauth2 google
const GOOGLE_MAILER_CLIENT_ID = process.env.GOOGLE_MAILER_CLIENT_ID;
const GOOGLE_MAILER_CLIENT_SECRET = process.env.GOOGLE_MAILER_CLIENT_SECRET;
const GOOGLE_MAILER_REFRESH_TOKEN = process.env.GOOGLE_MAILER_REFRESH_TOKEN;
const ADMIN_EMAIL_ADDRESS = process.env.ADMIN_EMAIL_ADDRESS;
// Khởi tạo OAuth2Client với Client ID và Client Secret
const myOAuth2Client = new OAuth2Client(GOOGLE_MAILER_CLIENT_ID, GOOGLE_MAILER_CLIENT_SECRET);
// Set Refresh Token vào OAuth2Client Credentials
myOAuth2Client.setCredentials({ refresh_token: GOOGLE_MAILER_REFRESH_TOKEN });
//===================================

//cheack password Upcase
const checkPasswordHasUpperCase = (password) => {
    const regExp = /[A-Z]/;
    return regExp.test(password);
};

//Cheack password Special characters
const checkPasswordHasSpecialCharacter = (password) => {
    const regExp = /[!@#$%^&*(),.?":{}|<>]/;
    return regExp.test(password);
};

//Cheack password one number
const checkPasswordHasNumber = (password) => {
    const regExp = /\d/;
    return regExp.test(password);
};

//create public và private key cho jwt
const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
    modulusLength: 4096,
});

//create access token
const generateAccessToken = (payload) => {
    const options = {
        expiresIn: '1d',
        algorithm: 'RS256',
    };
    //create access token
    return jwt.sign(payload, privateKey, options);
};

//to string publicKey
const publicKeyString = publicKey.export({ type: 'spki', format: 'pem' }).toString();

//hash password
const hashPassword = async (password) => {
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    return hashedPassword;
};

//Accuracy password
// const comparePasswords = async (password, hashedPassword) => {

//     console.log(isMatch);
//     return isMatch;
// };

const authController = {
    //Đăng nhập
    login: async (req, res) => {
        const { email, password } = req.body;
        try {
            //cheack email empty
            if (!email) {
                return res.status(400).json({ message: i18n.__('vui_long_nhap_email') });
            }

            //cheack email format
            if (!validator.isEmail(email)) {
                return res.status(400).json({ message: i18n.__('dinh_dang_email_khong_chinh_xac') });
            }

            //cheack password empty
            if (!password) {
                return res.status(400).json({ message: i18n.__('vui_long_nhap_mat_khau') });
            }

            //cheack password least 8
            if (password.length < 8) {
                return res.status(400).json({ message: i18n.__('mat_khau_can_dai_it_nhat_8_ky_tu') });
            }

            //cheack Upcase password
            if (!checkPasswordHasUpperCase(password)) {
                return res.status(400).json({
                    message: i18n.__('mat_khau_phai_co_it_nhat_mot_ky_tu_viet_hoa'),
                });
            }

            //Cheack password Special characters
            if (!checkPasswordHasSpecialCharacter(password)) {
                return res.status(400).json({
                    message: i18n.__('mat_khau_phai_co_it_nhat_mot_ky_tu_dac_biet'),
                });
            }

            //Cheack password one number
            if (!checkPasswordHasNumber(password)) {
                return res.status(400).json({ message: i18n.__('mat_khau_phai_co_it_nhat_mot_so') });
            }

            //kiểm tra tài khoản có tồn tại không
            const data = await authModel.find({ email }, { password: 1, email: 1, role: 1, Name: 1, TowFA: 1 });

            if (data.length < 1) {
                return res.status(400).json({ message: i18n.__('tai_khoan_khong_ton_tai') });
            }

            //kiểm tra password
            const isMatch = await bcrypt.compare(password, data[0].password);
            if (isMatch === false) {
                return res.status(400).json({ message: i18n.__('mat_khau_khong_dung') });
            }

            //đăng nhập thành công
            //lưu lại access token mới
            const accessToken = generateAccessToken({
                _id: data[0]._id,
                email: data[0].email,
                role: data[0].role,
                Name: data[0].Name,
                TowFA: data[0].TowFA,
            });

            await authModel.findOneAndUpdate(
                { _id: data[0]._id },
                {
                    access_token: accessToken,
                    publicKey: publicKeyString,
                },
            );

            return res.status(200).json({ message: i18n.__('dang_nhap_thanh_cong'), accessToken });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //đăng ký
    register: async (req, res) => {
        const { email, password, role, Name, islock } = req.body;

        try {
            //cheack email empty
            if (!email) {
                return res.status(400).json({ message: i18n.__('vui_long_nhap_email') });
            }

            //cheack email format
            if (!validator.isEmail(email)) {
                return res.status(400).json({ message: i18n.__('dinh_dang_email_khong_chinh_xac') });
            }

            //cheack password empty
            if (!password) {
                return res.status(400).json({ message: i18n.__('vui_long_nhap_mat_khau') });
            }

            //cheack password least 8
            if (password.length < 8) {
                return res.status(400).json({ message: i18n.__('mat_khau_can_dai_it_nhat_8_ky_tu') });
            }

            //cheack Upcase password
            if (!checkPasswordHasUpperCase(password)) {
                return res.status(400).json({
                    message: i18n.__('mat_khau_phai_co_it_nhat_mot_ky_tu_viet_hoa'),
                });
            }

            //Cheack password Special characters
            if (!checkPasswordHasSpecialCharacter(password)) {
                return res.status(400).json({
                    message: i18n.__('mat_khau_phai_co_it_nhat_mot_ky_tu_dac_biet'),
                });
            }

            //Cheack password one number
            if (!checkPasswordHasNumber(password)) {
                return res.status(400).json({ message: i18n.__('mat_khau_phai_co_it_nhat_mot_so') });
            }

            //cheack email empty
            if (!Name) {
                return res.status(400).json({ message: i18n.__('vui_long_nhat_ten_nguoi_dung') });
            }

            //kiểm tra tài khoản có tồn tại không
            const data = await authModel.find({ email }).count();

            if (data > 0) {
                return res.status(400).json({ message: i18n.__('email_da_duoc_dang_ky') });
            }
            //hash password
            const hashpassword = await hashPassword(password);

            // Create temporary secret until it it verified
            const temp_secret = speakeasy.generateSecret();

            //tất cả ok qua tạo account
            const newUser = new authModel({
                email,
                password: hashpassword,
                Name,
                role,
                islock,
                secret: {
                    ascii: temp_secret.ascii,
                    hex: temp_secret.hex,
                    base32: temp_secret.base32,
                    otpauth_url: speakeasy.otpauthURL({
                        secret: temp_secret.ascii,
                        label: email,
                        algorithm: 'sha256',
                        issuer: 'MRT',
                    }),
                },
            });
            await newUser.save();

            return res.status(201).json({ message: i18n.__('dang_ky_tao_khoan_thanh_cong') });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //xác thực email
    sendEmailVerify: async (req, res) => {
        const { email, Name } = req.user;

        const myAccessTokenObject = await myOAuth2Client.getAccessToken();
        // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
        const myAccessToken = myAccessTokenObject?.token;

        try {
            // Generate OTP and send email
            const otp = Math.floor(Math.random() * 999999);
            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    type: 'OAuth2',
                    user: ADMIN_EMAIL_ADDRESS,
                    clientId: GOOGLE_MAILER_CLIENT_ID,
                    clientSecret: GOOGLE_MAILER_CLIENT_SECRET,
                    refresh_token: GOOGLE_MAILER_REFRESH_TOKEN,
                    accessToken: myAccessToken,
                },
            });

            const mailOptions = {
                to: email,
                subject: 'Email Verification',
                html: `<div id=":15j" class="ii gt"
                jslog="20277; u014N:xr6bB; 1:WyIjdGhyZWFkLWY6MTc1OTk2Nzk0Njc3MjA4NDc0OCIsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsbnVsbCxudWxsLG51bGwsW11d; 4:WyIjbXNnLWY6MTc1OTk2Nzk0Njc3MjA4NDc0OCIsbnVsbCxbXV0.">
                <div id=":14e" class="a3s aiL msg2889628459165304230"><u></u>
                    <div style="margin:0;padding:0" bgcolor="#FFFFFF">
                        <table width="100%" height="100%" style="min-width:348px" border="0" cellspacing="0" cellpadding="0"
                            lang="vi">
                            <tbody>
                                <tr height="32" style="height:32px">
                                    <td></td>
                                </tr>
                                <tr align="center">
                                    <td>
                                        <div>
                                            <div></div>
                                        </div>
                                        <table border="0" cellspacing="0" cellpadding="0"
                                            style="padding-bottom:20px;max-width:516px;min-width:220px">
                                            <tbody>
                                                <tr>
                                                    <td width="8" style="width:8px"></td>
                                                    <td>
                                                        <div style="border-style:solid;border-width:thin;border-color:#dadce0;border-radius:8px;padding:40px 20px"
                                                            align="center" class="m_2889628459165304230mdv2rw">
                                                            <!-- <img
                                                                src="https://ci5.googleusercontent.com/proxy/T_zJ7UbaC9x27OP4-ZCPfDipqYLSGum30AlaxEycVclfvxO8Cze0sZ0kCrXlx6a-MgvW2tswbIyiNVfczjDuGh9okorzC5SUJDfwkHr6-3j1KUu94HuAw5uxM_jaElQef3Sub84=s0-d-e1-ft#https://www.gstatic.com/images/branding/googlelogo/2x/googlelogo_color_74x24dp.png"
                                                                width="74" height="24" aria-hidden="true"
                                                                style="margin-bottom:16px" alt="Google" class="CToWUd"
                                                                data-bit="iit"> -->
                                                            <div
                                                                style="font-family:'Google Sans',Roboto,RobotoDraft,Helvetica,Arial,sans-serif;border-bottom:thin solid #dadce0;color:rgba(0,0,0,0.87);line-height:32px;padding-bottom:24px;text-align:center;word-break:break-word">
                                                                <div style="font-size:24px">Xác minh email
                                                                </div>
                                                            </div>
                                                            <div
                                                                style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;font-size:14px;color:rgba(0,0,0,0.87);line-height:20px;padding-top:20px;text-align:left">
                                                                Chúng tôi đã nhận được yêu cầu xác minh email của <a
                                                                    style="font-weight:bold">${email}</a>
                                                                <br><br>Sử
                                                                dụng mã này để hoàn tất việc xác minh email:<br>
                                                                <div
                                                                    style="text-align:center;font-size:36px;margin-top:20px;line-height:44px;">
                                                                    ${otp}
                                                                </div>
                                                                <br>Mã này sẽ hết hạn sau 5 phút.
                                                                <br>
                                                                <br>Nếu không nhận ra
                                                                <a style="font-weight:bold">${email}</a>, bạn
                                                                có thể yên tâm bỏ qua email này.
                                                                <br>
                                                                <a style="font-weight:bold; color: red;">Vui lòng không cung cấp mã này cho người khác</a>
                                                            </div>
                                                        </div>
                                                        <div style="text-align:left">
                                                            <div
                                                                style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;color:rgba(0,0,0,0.54);font-size:11px;line-height:18px;padding-top:12px;text-align:center">
                                                                <div>Chúng tôi gửi email này để thông báo cho bạn biết về những
                                                                    thay đổi quan trọng đối với Tài khoản của bạn và dịch vụ của
                                                                    bạn.</div>
                                                                <div style="direction:ltr"> <a
                                                                        class="m_2889628459165304230afal"
                                                                        style="font-family:Roboto-Regular,Helvetica,Arial,sans-serif;color:rgba(0,0,0,0.54);font-size:11px;line-height:18px;padding-top:12px;text-align:center"></a>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td width="8" style="width:8px"></td>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr height="32" style="height:32px">
                                    <td></td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>`,
            };

            await transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    return res.status(500).send('Internal Server Error');
                } else {
                    // console.log('Email sent: ' + info.response);
                    // Save OTP in database
                    return res.status(200).send('OTP has been sent to your email ' + otp);
                }
            });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //check tài khoản
    checkAccount: (req, res) => {
        return res.status(200).json({ message: 'Account ok', data: req.user });
    },

    getAllAccount: async (req, res) => {
        try {
            const data = await authModel.find();

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    deleteAccount: async (req, res) => {
        try {
            const id = req.params.id;
            await authModel.findByIdAndDelete(id);

            return res.status(200).send({ message: 'Delete thanh cong' });
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    changestatus: async (req, res) => {
        const { islock } = req.body;
        const id = req.params.id;
        await authModel.findByIdAndUpdate(id, { islock });
        try {
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: i18n.__('error') });
        }
    },
    getRole: async (req, res) => {
        // console.log(req.user.role);
        try {
            return res.status(200).json({ success: true, role: req.user.role, UserID: req.user._id });
        } catch (error) {
            return res.status(500).json({ success: false, message: defaults.messError });
        }
    },
};

module.exports = authController;
