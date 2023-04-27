const express = require("express");
const router = express.Router();
const { signin } = require("../controllers/auth/signInController");
const { signup } = require("../controllers/auth/signUpController");
const {getuserbytoken}= require("../controllers/user/getUserbytokencontroller");
const multer = require("multer");
const morgan = require("morgan");
const fs = require("fs");
const path = require("path");
const cors = require("cors");
const { check, validationResult } = require("express-validator");

// Validation middleware for register route
const registerValidation = [
  check("name", "Name is required").notEmpty(),
  check("email", "Please enter a valid email").isEmail(),
  check("password", "Password must be at least 6 characters long").isLength({
    min: 6,
  }),
];

const checkvalidation = async (req, res, next) => {
  
  // Check for validation errors
  const errors = validationResult(req);
  console.log(errors);
  if (!errors.isEmpty()) {
    console.log("validation");
    return res.status(400).json({ errors: errors.array() });
  }
  else{
    console.log("all check");
    next();
  }
}

// Multer
const storage = multer.diskStorage({
  destination: "uploads",
  filename: (req, file, callback) => {
    callback(null, file.originalname);
  },
});

const upload = multer({ storage: storage });


// Morgan
let logStream = fs.createWriteStream(path.join(__dirname, "output.log"), {
  flags: "a",
});
router.use(
  morgan("combined", {
      stream: logStream,
  })
);

router.use(cors());
router.get("/getbytoken", getuserbytoken);
router.post("/signUp", checkvalidation, upload.single("profile"), signup);
router.post("/signIn", signin);
module.exports = router;
