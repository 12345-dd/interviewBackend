const router = require("express").Router();
const userController = require("../controllers/userController");

router.post("/login",userController.loginUser);

router.post("/register",userController.registerUser);

router.get("/peers",userController.getAllPeers);

module.exports = router;