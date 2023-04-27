const Client = require("../../models/clientSchema");

exports.deleteclient = async (req, res) => {
    const id = req.params.id.slice(1);
    try {
        await Client.findByIdAndDelete({ _id: id });
        res.status(201).json({
            message: "successfully deleted a client",
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "fail", error: error });
    }
};
