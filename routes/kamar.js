'use strict'
const express = require('express')

const kamarController = require("../controllers/kamarController")
const { upload } = require("../utils/upload")
const router = new express.Router()
const auth = require("../auth/auth")


router.post("/add",kamarController.addKamar)
router.put("/update/:id_kamar", kamarController.updateKamar)
router.delete("/delete/:id_kamar", auth.authVerify, kamarController.deleteKamar)
router.get("/", kamarController.findAllKamar)
router.get("/:id_kamar", kamarController.findKamarByIdTipeKamar)



module.exports = router