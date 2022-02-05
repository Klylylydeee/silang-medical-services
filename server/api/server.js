require("dotenv").config({ path: "./environment/.env.public" });

const express = require("express");
const helmet = require("helmet");
const swaggerUI = require("swagger-ui-express");
const AdminJS = require('adminjs');
const AdminJSExpress = require('@adminjs/express');
const AdminJSMongoose = require('@adminjs/mongoose');
    
const databaseConnection = require("./database/mongoDBConfig");
const corsConfig = require("./config/corsConfig");
const morganConfig = require("./config/morganConfig");
const faviconConfig = require("./config/faviconConfig");
const swaggerConfig = require("./config/swaggerConfig");
const limiter = require("./config/rateLimitConfig");
const { UserResourceOptions, AnnouncementResourceOptions, EventResourceOptions, RecordsResourceOptions  } = require("./config/adminResource");

AdminJS.registerAdapter(AdminJSMongoose);

databaseConnection();

const app = express();

const adminJS = new AdminJS({
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
});

const Users = require("./model/userAccount");
const bcrypt = require("bcrypt");
const adminJSRouter = AdminJSExpress.buildAuthenticatedRouter(adminJS, {
    authenticate: async (email, password) => {
        const user = await Users.findOne({ email })
        if (user) {
            const matched = await bcrypt.compare(password, user.password)
            if (matched) {
                return user
            }
        }
        return false
    },
    cookiePassword: 'some-secret-password-used-to-secure-cookie',
});

const MedicalRecord = require("./model/medicalRecord");
MedicalRecord.create({
    first_name: "klyde",
    last_name: "guevarra",
    email: "klylylydeeee@gmail.com",
    phone_number: "639476303740",
    diagnosis: "Lagnat",
    detailed_report: "Patient's body is very warm",
    outlier: 1,
    createdBy: "Klyde Guevarra",
    approvedBy: "Klyde Guevarra",
    barangay: "Lumil",
}).then(()=> { })

app.use(adminJS.options.rootPath, adminJSRouter);

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
    res.redirect(`http://localhost:1000/api-documentation`);
});

app.use('/api-documentation', swaggerUI.serve, swaggerUI.setup(swaggerConfig));
app.use('/authentication', require("./routes/route.authentication"));
app.use('/medical-record', require("./routes/route.medicalRecord"));
app.use('/analytics', require("./routes/route.analytics"));
app.use(require("./routes/errorHandler").notFoundHandler);
app.use(require("./routes/errorHandler").catchHandler);