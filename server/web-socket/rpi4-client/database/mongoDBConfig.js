const mongoose = require("mongoose");

const databaseConnection = async () => {
    try {
        const connect = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            autoIndex: true,
        });
        console.log(`MongoDB ODM to DB Server: ${connect.connection.host}`);
        return connect
    } catch(err) {
        console.log(err);
        console.log("Closing NodeJS Server");
        process.exit(1);
    };
};

module.exports = databaseConnection;