const i18n = require('i18n');

exports.checkLanguage = (req, res, next) => {
    // console.log(req.ip);
    const language = req.headers['accept-language'].split(',')[0] || 'en';
    if (language === 'vi' || language === 'en') {
        i18n.setLocale(language);
    } else {
        i18n.setLocale('en');
    }

    next();
};
