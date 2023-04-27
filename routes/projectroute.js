const express = require("express");
const router = express.Router();
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const { addproject } = require("../controllers/projects/addProjectcontroller");
const { getproject } = require("../controllers/projects/getProjectcontroller");
const { getoneproject } = require("../controllers/projects/getOneProjectcontroller");
const { editproject } = require("../controllers/projects/editProjectcontroller");
const { deleteproject } = require("../controllers/projects/deleteProjectcontroller");

let logStream = fs.createWriteStream(path.join(__dirname, "output.log"), {
    flags: "a",
});
router.use(
    morgan("combined", {
        stream: logStream,
    })
);
router.use(cors());

router.post("/addproject/:id", addproject);
router.get("/getproject/:id", getproject);
router.get("/getoneproject/:id", getoneproject);
router.post("/editproject/:id", editproject);
router.get("/deleteproject/:id", deleteproject);
module.exports = router;
