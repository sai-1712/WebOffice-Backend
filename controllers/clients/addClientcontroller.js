const User = require("../../models/userSchema");
const Client = require("../../models/clientSchema");

exports.addclient = async (req, res) => {
    const id = req.params.id.slice(1);
    try {
        let user = await User.findOne({ _id: id });

        if (user) {
            const client= new Client(req.body);
            await client.save();
            user.clients.push(client);
            await user.save();
            const newuser = await User.findById({ _id: id }).populate("clients");
            res.status(201).json({
                message: "successfully added a project",
                data: { newuser },
            });
        }
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "fail", error: error });
    }
};