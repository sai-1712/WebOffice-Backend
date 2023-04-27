const Client = require("../../models/clientSchema");

exports.editclient = async (req, res) => {
    const id = req.params.id.slice(1);
    try {
        const newclient = await Client.findByIdAndUpdate({ _id: id }, req.body, { upsert: false });
        await newclient.save();
        res.status(201).json({
            message: "successfully edited a client",
            data: { newclient },
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "fail", error: error });
    }
};
