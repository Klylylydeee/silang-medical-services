const nodemailer = require('nodemailer');

exports.transport = () =>{
    const emailAccounts = [
        {
            user: process.env.NODEMAILER_ACCOUNT_USERNAME,
            password: process.env.NODEMAILER_ACCOUNT_PASSWORD
        },
        {
            user: process.env.NODEMAILER_ACCOUNT_USERNAME_1,
            password: process.env.NODEMAILER_ACCOUNT_PASSWORD_1
        },
        {
            user: process.env.NODEMAILER_ACCOUNT_USERNAME_2,
            password: process.env.NODEMAILER_ACCOUNT_PASSWORD_2
        }
    ]

    const accountIndex = () => {
        let lengthRes = emailAccounts.map((index) => {
            return index;
        }).length;
        return Math.floor(Math.random() * lengthRes)
    }
    
    let selectedUser = accountIndex();

    return nodemailer.createTransport(
        {
            host: process.env.NODEMAILER_HOST,
            service: process.env.NODEMAILER_SERVICE,
            port: 465,
            secure: true,
            pool: true,
            auth: {
                user: emailAccounts[selectedUser].user,
                pass: emailAccounts[selectedUser].password
            }
        }
    );
}