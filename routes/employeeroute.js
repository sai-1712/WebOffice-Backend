const express = require("express");
const router = express.Router();
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const { addemployee } = require("../controllers/employees/addEmployeecontroller");
const { getemployee } = require("../controllers/employees/getEmployeecontroller");
const { deleteemployee } = require("../controllers/employees/deleteEmployeecontroller");
const { editemployee } = require("../controllers/employees/editEmployeecontroller");

let logStream = fs.createWriteStream(path.join(__dirname, "output.log"), {
    flags: "a",
});
router.use(
    morgan("combined", {
        stream: logStream,
    })
);
router.use(cors());
router.post("/addemployee/:id", addemployee);
router.get("/getemployee/:id", getemployee);
router.get("/deleteemployee/:id", deleteemployee);
router.post("/editemployee/:id", editemployee);

module.exports = router;
