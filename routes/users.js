const router = require('express').Router();
const userController = require("../controllers/users")

router.post('/register',userController.postUser)


module.exports=router;