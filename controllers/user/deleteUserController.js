const User = require("../../models/userSchema");

exports.deleteUser= async (req, res) => {
    const id = req.params.id.slice(1);
    try {
        await User.findByIdAndDelete({ _id: id });
        res.status(201).json({
            message: "successfully deleted a user",
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "fail", error: error });
    }
};
