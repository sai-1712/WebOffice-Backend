const Employee = require("../../models/employeeSchema");

exports.editemployee = async (req, res) => {
    const id = req.params.id.slice(1);
    console.log("Entered edit id: ", id);
    try {
        const newemp = await Employee.findByIdAndUpdate({ _id: id }, req.body, { upsert: false });
        await newemp.save();
        res.status(201).json({
            message: "successfully edited emp",
            data: { newemp },
        });
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "fail", error: error });
    }
};
