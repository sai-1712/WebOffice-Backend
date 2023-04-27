const User = require("../../models/userSchema");

exports.editUser= async (req, res) => {
    const id = req.params.id.slice(1);
    try {
        const newuser = await User.findOneAndUpdate({ _id: id }, req.body, { upsert: false });
        await newuser.save();
        res.status(201).json({
            message: "successfully edited a user",
            data: { newuser },
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "fail", error: error });
    }
};
