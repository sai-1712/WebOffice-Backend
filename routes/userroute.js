const express = require("express");
const router = express.Router();
const { getAllUsers } = require("../controllers/user/getAllUsersController");
const { deleteUser } = require("../controllers/user/deleteUserController");
const { editUser } = require("../controllers/user/editUserController");

router.get("/getallusers", getAllUsers);
router.get("/deleteuser/:id", deleteUser);
router.post("/edituser/:id", editUser);

module.exports = router;
