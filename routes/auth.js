const router = require('express').Router();
const authController = require("../controllers/auth")

router.post('/login',authController.loginUser)


module.exports=router;