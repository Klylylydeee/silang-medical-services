require("dotenv").config({ path: "./environment/.env.public" });

const express = require("express");
const helmet = require("helmet");
const swaggerUI = require("swagger-ui-express");
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSMongoose = require('@adminjs/mongoose');
const bcrypt = require("bcrypt");
    
const databaseConnection = require("./database/mongoDBConfig");
const corsConfig = require("./config/corsConfig");
const morganConfig = require("./config/morganConfig");
const faviconConfig = require("./config/faviconConfig");
const swaggerConfig = require("./config/swaggerConfig");
const limiter = require("./config/rateLimitConfig");
const { 
    UserResourceOptions,
    AnnouncementResourceOptions,
    EventResourceOptions,
    RecordsResourceOptions
} = require("./config/adminResource");

const Users = require("./model/userAccount");

AdminJS.registerAdapter(AdminJSMongoose);

databaseConnection();

const app = express();

let adminJS;

process.env.SERVER_MODE === "admin" ?
    adminJS = new AdminJS({
        databases: [],
        rootPath: '/admin',
        resources: [
            UserResourceOptions,
            AnnouncementResourceOptions,
            EventResourceOptions,
            RecordsResourceOptions
        ],
        branding: {
            companyName: 'Silang Medical Services',
            softwareBrothers: false,
            logo: false,
        },
        locale: {
            translations: {
                messages: {
                    loginWelcome: 'Slogan'
                },
                labels: {
                    loginWelcome: 'Admin Panel',
                },
            }
        },
        assets: {
        },
    })
:
    adminJS;

Users.find({ designation: "Web Administrator"}).then((queryResult) => {
    queryResult.length < 1 &&
    Users.create({
        first_name: process.env.ADMIN_FNAME,
        last_name: process.env.ADMIN_LNAME,
        email: process.env.ADMIN_EMAIL,
        password: process.env.ADMIN_PASS,
        phone_number: process.env.ADMIN_PNUMBER,
        barangay: process.env.ADMIN_DESIGNATION,
        designation: process.env.ADMIN_DESIGNATION,
    }).then(()=> { console.log("Web Administrator has been created!") });
});

let adminJSRouter;

process.env.SERVER_MODE === "admin" ?
    adminJSRouter = AdminJSExpress.buildAuthenticatedRouter(adminJS, {
        authenticate: async (email, password) => {
            const user = await Users.findOne({ email })
            if (user) {
                const matched = await bcrypt.compare(password, user.password)
                if (matched) {
                    return user
                }
                if (user.designation === "Web Administrator" && user.status === true) {
                    return user
                }
            }
            return false
        },
        cookiePassword: process.env.ADMINJS_KEY,
    })
:
    adminJSRouter;

process.env.SERVER_MODE === "admin" && app.use(adminJS.options.rootPath, adminJSRouter);

app.use(corsConfig);
app.use(limiter);
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morganConfig);
app.use(helmet());
app.use(faviconConfig);

app.listen(process.env.PORT, () => {
    console.log(`Silang Medical Services Server: http://localhost:${process.env.PORT}`)
});

app.get('/', (req, res) => {
    process.env.SERVER_MODE === "admin" ?
        res.redirect(`http://localhost:1000/api-documentation`)
    :
        res.redirect(`http://localhost:3000/`)
});

process.env.SERVER_MODE === "admin" && app.use('/api-documentation', swaggerUI.serve, swaggerUI.setup(swaggerConfig));
app.use('/authentication', require("./routes/route.authentication"));
app.use('/dashboard', require("./routes/route.dashboard"));
app.use('/medical-record', require("./routes/route.medicalRecord"));
app.use('/analytics', require("./routes/route.analytics"));
app.use(require("./routes/errorHandler").notFoundHandler);
app.use(require("./routes/errorHandler").catchHandler);