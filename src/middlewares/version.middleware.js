const i18n = require('i18n');

exports.redirectVersion = (payload) => {
    return (req, res, next) => {
        const that = this;
        const version = req.headers['x-api-version'] || 'v1';
        if (!payload[version]) {
            return res.status(400).json({
                message: i18n.__('phien_ban_khong_khop'),
            });
        }

        return payload[version].call(that, req, res, next);
    };
};
