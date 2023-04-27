const Project = require("../../models/projectSchema");

exports.getoneproject = async (req,res)=>{
    const id = req.params.id.slice(1);
    try {
        const project = await Project.findOne({_id: id});
        res.status(200).json({ data: { project }, message: "success" })

    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "fail", error: error });
    }
}