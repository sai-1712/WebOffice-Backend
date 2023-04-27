const User = require("../../models/userSchema");
// const Project = require("../models/projectSchema");

exports.getproject = async (req, res) => {
    const id = req.params.id.slice(1);
    try {
        const user = await User.findById({ _id: id }).populate("projects");
        const projects = user.projects;
        console.log(projects);
        res.status(200).json({ data: { projects }, message: "success" })

    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "fail", error: error });
    }
};
