const RecordLog = require("../model/exportRecord");

const jwt = require("jsonwebtoken");

const { validateRequest } = require("../util/jsonValidate");

exports.createExportRecordLog = async (req, res, next) => {

    try {

        validateRequest(req);

        let createdData = await RecordLog.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            designation: req.body.designation,
        });
        
        const token = await jwt.sign({
            createdData
        }, process.env.JWT_BACKEND, { 
            expiresIn: "365d",
            algorithm: "HS512"
        });

        res.status(200).send({
            message: `Medical Record for barangay ${req.query.barangay} has been exported!`,
            payload: token
        });

    } catch(err) {

        err.statusCode === undefined ? err.statusCode = 500 : "";
        return next(err);

    };

};