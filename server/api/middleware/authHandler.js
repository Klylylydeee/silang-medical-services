const jwt = require("jsonwebtoken");

const Users = require("../model/userAccount");

exports.validateAuthorization = async (req, res, next) => {
    const authHeader = req.get("Authorization");

    if (authHeader === undefined) {
        const error = new Error(
            "Authorization is not available."
        );
        error.statusCode = 401;
        throw next(error);
    }

    const token = authHeader.split(" ")[0] === "Bearer" ? authHeader.split(" ")[1] : "";
    if(token === "") {
        const error = new Error("JWT format does not meet the requirements.");
        error.statusCode = 498;
        throw next(error);
    };

    let decodedToken;

    try {
        decodedToken = jwt.verify(token, process.env.JWT_BACKEND);
    } catch (err) {
        throw err.message === "jwt expired" ?
            new Error("Authorization has expired. Please sign-in again.")
        : 
            new Error(err.message);
    };

    if (!decodedToken) {
        const error = new Error("Authenticated failed.");
        error.statusCode = 498;
        throw next(error);
    };
    
    let findUser = await Users.findOne({ email: decodedToken.email });

    if(findUser === null){
        let error = new Error("Email does not exists.");
        error.statusCode = 501;
        throw next(error);
    } else {
        // Add code to list a user's activities
    };

    next();
};
