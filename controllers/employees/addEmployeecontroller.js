const User = require("../../models/userSchema");
const Employee = require("../../models/employeeSchema");

exports.addemployee = async (req, res) => {
    const id = req.params.id.slice(1);
    try {
        let user = await User.findOne({ _id: id });

        if (user) {
            const employee= new Employee(req.body);
            await employee.save();
            user.employees.push(employee);
            await user.save();
            const newuser = await User.findById({ _id: id }).populate("employees");
            res.status(201).json({
                message: "successfully added an employee",
                data: { newuser },
            });
        }
    } catch (error) {
        console.error(error);
        res.status(404).json({ message: "fail", error: error });
    }
};