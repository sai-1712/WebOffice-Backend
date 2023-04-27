const User = require("../../models/userSchema");

exports.getAllUsers= async (req, res) => {
    try {
        const users = await User.find({})
        .populate("projects employees clients")
        res.status(201).json({ data: { users }, message: "success" });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "fail", error: error });
    }
};