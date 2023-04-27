const User = require("../../models/userSchema");
const Project = require("../../models/projectSchema");

exports.addproject = async (req, res) => {
    const id = req.params.id.slice(1);
    try {
        let user = await User.findOne({ _id: id });

        if (user) {
            const project = new Project(req.body);
            await project.save();
            // console.log(project);
            user.projects.push(project);
            await user.save();
            const newuser = await User.findById({ _id: id }).populate("projects");
            // user = newuser;
            // await newuser.save();
            // // await newuser.save();
            console.log(newuser);

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
