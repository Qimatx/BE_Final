//locales
const i18n = require('i18n');
//models
const donMauModule = require('../../../models/donMau.module');
const donChinhModule = require('../../../models/donChinh.models');
const CustomerModule = require('../../../models/customer.models');
const donThongTinModule = require('../../../models/donThongTin.models');

const chartController = {
    // chart1: async (req, res) => {
    //     donChinhModule
    //         .aggregate([
    //             {
    //                 $group: {
    //                     _id: { $dateToString: { format: '%d/%m/%Y', date: '$createdAt' } },
    //                     total: { $sum: 1 },
    //                 },
    //             },
    //             {
    //                 $sort: { _id: 1 },
    //             },
    //             {
    //                 $project: {
    //                     _id: 0,
    //                     createdAt: '$_id',
    //                     total: 1,
    //                 },
    //             },
    //         ])
    //         .then((result) => {
    //             res.json(result);
    //         })
    //         .catch((error) => {
    //             res.status(500).json({ error: 'Data query error' });
    //         });
    // },
    chart1: async (req, res) => {
        try {
            const result = await donChinhModule.aggregate([
                {
                    $project: {
                        day: { $dayOfMonth: '$createdAt' },
                        month: { $month: '$createdAt' },
                        year: { $year: '$createdAt' },
                    },
                },
                {
                    $group: {
                        _id: {
                            day: '$day',
                            month: '$month',
                            year: '$year',
                        },
                        total: { $sum: 1 },
                    },
                },
                {
                    $sort: {
                        '_id.year': 1,
                        '_id.month': 1,
                        '_id.day': 1,
                    },
                },
                {
                    $project: {
                        _id: 0,
                        createdAt: {
                            $dateToString: {
                                format: '%d/%m/%Y',
                                date: {
                                    $dateFromParts: {
                                        year: '$_id.year',
                                        month: '$_id.month',
                                        day: '$_id.day',
                                    },
                                },
                            },
                        },
                        total: 1,
                    },
                },
            ]);

            res.json(result);
        } catch (error) {
            res.status(500).json({ error: 'Lỗi truy vấn dữ liệu.' });
        }
    },

    // chart2: async (req, res) => {
    //     CustomerModule.aggregate([
    //         {
    //             $sort: { createdAt: 1 }, // Sắp xếp theo ngày tăng dần
    //         },
    //         {
    //             $group: {
    //                 _id: { $dateToString: { format: '%d/%m/%Y', date: '$createdAt' } }, // Nhóm theo ngày
    //                 totalOrders: { $sum: 1 }, // Tính tổng số đơn trong mỗi ngày
    //             },
    //         },
    //         {
    //             $project: { _id: 0, createdAt: '$_id', total: '$totalOrders' }, // Tùy chỉnh định dạng dữ liệu trả về
    //         },
    //     ])
    //         .then((result) => {
    //             res.json(result);
    //         })
    //         .catch((error) => {
    //             res.status(500).json({ error: 'Data query error' });
    //         });
    // },
    chart2: async (req, res) => {
        try {
            const result = await CustomerModule.aggregate([
                {
                    $project: {
                        day: { $dayOfMonth: '$createdAt' },
                        month: { $month: '$createdAt' },
                        year: { $year: '$createdAt' },
                    },
                },
                {
                    $group: {
                        _id: {
                            day: '$day',
                            month: '$month',
                            year: '$year',
                        },
                        totalOrders: { $sum: 1 },
                    },
                },
                {
                    $project: {
                        createdAt: {
                            $dateFromParts: {
                                year: '$_id.year',
                                month: '$_id.month',
                                day: '$_id.day',
                            },
                        },
                        total: '$totalOrders',
                        _id: 0,
                    },
                },
                {
                    $sort: {
                        createdAt: 1,
                    },
                },
                {
                    $project: {
                        createdAt: {
                            $dateToString: {
                                format: '%d/%m/%Y',
                                date: '$createdAt',
                            },
                        },
                        total: 1,
                    },
                },
            ]);

            res.json(result);
            console.log(result);
        } catch (error) {
            res.status(500).json({ error: 'Lỗi truy vấn dữ liệu.' });
        }
    },

    chart3: async (req, res) => {
        donThongTinModule
            .aggregate([
                {
                    $addFields: {
                        chiPhiNum: { $toInt: '$chiPhi' },
                    },
                },
                {
                    $group: {
                        _id: {
                            day: { $dayOfMonth: '$createdAt' },
                            month: { $month: '$createdAt' },
                            year: { $year: '$createdAt' },
                        },
                        total: { $sum: '$chiPhiNum' },
                    },
                },
                {
                    $project: {
                        _id: 0,
                        chiPhi: { $trunc: { $divide: ['$total', 1000] } },
                        createdAt: {
                            $dateToString: {
                                format: '%d/%m/%Y',
                                date: {
                                    $dateFromParts: {
                                        day: '$_id.day',
                                        month: '$_id.month',
                                        year: '$_id.year',
                                    },
                                },
                            },
                        },
                    },
                },
                {
                    $sort: {
                        createdAt: 1,
                    },
                },
            ])
            .then((result) => {
                res.json(result);
            })
            .catch((error) => {
                res.status(500).json({ error: 'Data query error' });
            });
    },

    //thong ke 4 quy trình 0,1,2,3
    thongke1: async (req, res) => {
        const { quyTrinh } = req.body;
        try {
            const data = await donChinhModule.find({ quyTrinh: quyTrinh }).count();

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    thongke2: async (req, res) => {
        const { quyTrinh } = req.body;
        try {
            const data = await donChinhModule.find({ quyTrinh: quyTrinh }).count();

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    thongke3: async (req, res) => {
        const { quyTrinh } = req.body;
        try {
            const data = await donChinhModule.find({ quyTrinh: quyTrinh }).count();

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    thongke4: async (req, res) => {
        const { quyTrinh } = req.body;
        try {
            const data = await donChinhModule.find({ quyTrinh: quyTrinh }).count();

            return res.status(200).json(data);
        } catch (error) {
            return res.status(500).json({ message: i18n.__('error') });
        }
    },

    //lấy đơn trả trong hôm nay
    thongke5: async (req, res) => {
        const today = new Date();
        const threeDaysAgo = new Date(today.getFullYear(), today.getMonth(), today.getDate() - 3);

        try {
            const data = await donThongTinModule.find({
                updatedAt: {
                    $gte: threeDaysAgo,
                    $lte: today,
                },
            });
            return res.status(200).json(data);
        } catch (error) {
            console.log(error);
            return res.status(500).json({ message: i18n.__('error') });
        }
    },
};

module.exports = chartController;
