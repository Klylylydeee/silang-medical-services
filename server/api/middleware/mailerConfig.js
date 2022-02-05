const nodemailer = require('nodemailer');

const mailerConfig = () => {
    return nodemailer.createTransport(
        {
            host: process.env.NODEMAILER_HOST,
            service: process.env.NODEMAILER_SERVICE,
            port: 465,
            secure: true,
            pool: true,
            auth: {
                user: process.env.NODEMAILER_ACCOUNT_USERNAME,
                pass: process.env.NODEMAILER_ACCOUNT_PASSWORD
            }
        }
    );
};

module.exports = mailerConfig