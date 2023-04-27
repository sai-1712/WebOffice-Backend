const User = require("../../models/userSchema");

exports.getclient = async (req, res) => {
    const id = req.params.id.slice(1);
    try {
        const user = await User.findById({ _id: id }).populate("clients");
        const clients = user.clients;
        console.log(clients);
        res.status(200).json({ data: { clients }, message: "success" })

    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "fail", error: error });
    }
};
