'use strict'
const express = require('express')

const userController = require("../controllers/userController")
const { upload } = require("../utils/upload")
const router = new express.Router()
const auth = require("../auth/auth")


router.post("/login", userController.login)
router.post("/add", upload.single("foto"),userController.addUser)
router.put("/update/:id_user", upload.single("foto"), userController.updateUser)
router.delete("/delete/:id_user", auth.authVerify, userController.deleteUser)
router.get("/", userController.findAllUser)
router.get("/:id_user", userController.findOneUser)



module.exports = router