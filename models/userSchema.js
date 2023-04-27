const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
// const EmployeeSchema = require("./employeeSchema");
// const AttendanceSchema = require("./attendanceSchema");
// const ClientSchema = require("./clientSchema");
// const ProjectSchema = require("./projectSchema");
// const LeaveSchema = require("./leaveSchema");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    profile: {
        data: Buffer,
        contentType: String
    },
    tokens: [
        {
            token: {
                type: String,
            },
        },
    ],
    employees: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Employee",
        },
    ],
    clients: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Client",
        },
    ],
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Project"
        }   
    ],
    leaves: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Leaves",
        },
    ],
    attendance: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Attendance",
        },
    ],
});

userSchema.pre("save", async function (next) {
    if (this.isModified("password")) this.password = await bcrypt.hash(this.password, 12);
    next();
});

userSchema.methods.generateAuthToken = async function () {
    try {
        let token = jwt.sign(
            { _id: this._id },
            "iamvaibhavdasaristudyinginindianinstituteofinformationtechnologysricity"
        );
        this.tokens = this.tokens.concat({ token: token });
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
};

module.exports = mongoose.model("User", userSchema);

