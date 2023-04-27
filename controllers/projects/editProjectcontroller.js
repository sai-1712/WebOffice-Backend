const Project = require("../../models/projectSchema");

exports.editproject = async (req, res) => {
    const id = req.params.id.slice(1);
    try {
        const newproj = await Project.findByIdAndUpdate({ _id: id }, req.body.newdata, { upsert: false });
        await newproj.save();
        res.status(201).json({
            message: "successfully edited a project",
            data: { newproj },
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "fail", error: error });
    }
};
