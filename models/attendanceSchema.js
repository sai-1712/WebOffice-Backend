const mongoose = require("mongoose");
const attendanceSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    att: {
        type: [String],
        enum: ["p", "a"],
    },
});

module.exports = mongoose.model("Attendance", attendanceSchema);