//locales
const i18n = require('i18n');
//models
const DonChinhModule = require('../../../models/donChinh.models');
//id
const { generateId } = require('../../../components/randomID');
const xlsx = require('xlsx');
//nodemailer
const nodemailer = require('nodemailer');
//google-auth-library
const { OAuth2Client } = require('google-auth-library');
const CustomerModule = require('../../../models/customer.models');
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

const donChinhController = {
    //Lấy tất cả danh sách khánh hàng
    getAll: async (req, res) => {
        try {
            const data = await DonChinhModule.find();

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //lấy tất cả đơn chính theo quy trình
    getAllByQuyTrinh: async (req, res) => {
        try {
            const { quyTrinh, loaiYeuCau, quyTrinh1, quyTrinh2 } = req.body;

            if (loaiYeuCau != undefined) {
                const data = await DonChinhModule.find({ $and: [{ quyTrinh }, { loaiYeuCau }] });

                return res.status(200).json(data);
            } else if (quyTrinh1 != undefined && quyTrinh2 != undefined) {
                const data = await DonChinhModule.find({ quyTrinh: { $in: [quyTrinh1, quyTrinh2] } });

                return res.status(200).json(data);
            } else {
                const data = await DonChinhModule.find({ quyTrinh });

                return res.status(200).json(data);
            }
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //lấy theo ID
    getByID: async (req, res) => {
        const id = req.params.id;
        try {
            const data = await DonChinhModule.findById(id);

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },
    /***********************************************************/
    //tạo mới
    createDonChinh: async (req, res) => {
        try {
            const { uidFKhanhHang, note, loaiYeuCau } = req.body;

            if (!uidFKhanhHang) {
                return res.status(401).json({ message: 'Pls Add ID Customer' });
            }

            if (!loaiYeuCau) {
                return res.status(401).json({ message: 'Pls Add loaij yeu cau' });
            }
            const datacheck = await CustomerModule.find({ uidCustomer: uidFKhanhHang }).count();
            if (datacheck == 0) {
                return res.status(401).json({ message: 'Uid customer Not Found' });
            }
            const newDonChinh = new DonChinhModule({
                uidDonChinh: generateId(),
                uidFKhanhHang,
                loaiYeuCau,
                note,
            });

            //lưu vào DB
            await newDonChinh.save();

            return res.status(200).json({ message: 'Create Main Success' });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //uodate
    updateDonChinh: async (req, res) => {
        try {
            const id = req.params.id;

            const { loaiYeuCau, uidFKhanhHang, nguoiHoTro, note } = req.body;

            if (!uidFKhanhHang) {
                return res.status(401).json({ message: 'Pls Add ID customer' });
            }

            //lưu vào DB
            await DonChinhModule.findByIdAndUpdate(id, {
                uidFKhanhHang,
                loaiYeuCau,
                quyTrinh: '0',
                nguoiHoTro,
                note,
            });

            return res.status(200).json({ message: 'Update Main Success' });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //delete
    deleteDonChinh: async (req, res) => {
        try {
            const id = req.params.id;

            await DonChinhModule.findByIdAndDelete(id);

            return res.status(200).json({ message: 'Delete Success' });
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //uploadfile
    uploadfile: async (req, res) => {
        if (!req.file) {
            return res.status(401).json({ message: 'Choose file' });
        }

        // Đọc dữ liệu từ tệp Excel
        const workbook = xlsx.readFile(req.file.path);
        const sheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[sheetName];
        const data = xlsx.utils.sheet_to_json(worksheet);

        // Lặp lại mỗi dòng và thêm dữ liệu vào MongoDB
        const promises = data.map((row) => {
            const uidFKhanhHang = row['uidFKhanhHang'];
            const loaiYeuCau = row['loaiYeuCau'];
            const note = row['note'];

            const newDonChinh = new DonChinhModule({
                uidDonChinh: generateId(),
                uidFKhanhHang,
                loaiYeuCau,
                note,
            });
            return newDonChinh.save();
        });

        Promise.all(promises)
            .then(() => {
                res.status(200).json({ message: 'Add success' });
            })
            .catch((err) => {
                res.status(500).send('Error when adding new main menu');
            });
    },

    //dowload
    dowloadfile: async (req, res) => {
        try {
            const { email } = req.body;

            if (!email) {
                return res.status(401).json({ message: 'Please enter your email' });
            }
            const myAccessTokenObject = await myOAuth2Client.getAccessToken();
            // Access Token sẽ nằm trong property 'token' trong Object mà chúng ta vừa get được ở trên
            const myAccessToken = myAccessTokenObject?.token;
            // Lấy dữ liệu từ DB
            const data = await DonChinhModule.find();

            // Tạo workbook và sheet
            const workbook = xlsx.utils.book_new();
            const sheetName = 'Sheet1';
            const sheetHeader = ['uidDonChinh', 'uidFKhanhHang', 'note'];

            const sheetData = data.map((donChinh) => {
                return [donChinh.uidDonChinh, donChinh.uidFKhanhHang, donChinh.note];
            });

            const sheet = xlsx.utils.aoa_to_sheet([sheetHeader, ...sheetData]);
            xlsx.utils.book_append_sheet(workbook, sheet, sheetName);

            // Tạo mailOptions
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
                subject: 'Data from MongoDB',
                attachments: [
                    {
                        filename: 'data.xlsx',
                        content: xlsx.write(workbook, { type: 'buffer', bookType: 'xlsx' }),
                    },
                ],
                text: 'Please find the attached file for data from MongoDB.',
            };

            // Gửi email chứa file Excel đến client
            transporter.sendMail(mailOptions, function (error, info) {
                if (error) {
                    console.log(error);
                } else {
                    console.log('Email sent: ' + info.response);
                }
            });

            // Trả về phản hồi cho client
            res.status(200).json({ message: 'File exported and sent to: ' + email });
        } catch (error) {
            console.log(error);
            res.status(500).json({ message: 'Error exporting file.' });
        }
    },
    getcustomEX: async (req, res) => {
        try {
            const data = await DonChinhModule.find(
                {},
                {
                    _id: 0,
                    uidFKhanhHang: 1,
                    loaiYeuCau: 1,
                    quyTrinh: 1,
                    note: 1,
                },
            );

            return res.status(200).json({ success: true, data });
        } catch (error) {
            return res.status(500).json({ success: false, message: defaults.messError });
        }
    },
};

module.exports = donChinhController;
