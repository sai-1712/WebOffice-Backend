const Project = require("../../models/projectSchema");

exports.deleteproject = async (req, res) => {
    const id = req.params.id.slice(1);
    try {
        await Project.findByIdAndDelete({ _id: id });
        res.status(201).json({
            message: "successfully deleted a project",
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "fail", error: error });
    }
};
