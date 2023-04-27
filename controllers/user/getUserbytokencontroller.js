
const User = require("../../models/userSchema");
const jwt = require("jsonwebtoken");
exports.getuserbytoken = async (req, res) => {
    try {
        const { jwttoken } = req.headers;
        // console.log("in control");
        // console.log(req.headers);
        const tokenobj = JSON.parse(jwttoken)
        const decodedData = jwt.verify(
            `${tokenobj.token}`,
            "iamvaibhavdasaristudyinginindianinstituteofinformationtechnologysricity"
        );

        const user = await User.findById(decodedData._id)
        .populate("projects employees clients")
        res.status(201).json({ data: { user }, message: "success" });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "fail", error: error });
    }
};
