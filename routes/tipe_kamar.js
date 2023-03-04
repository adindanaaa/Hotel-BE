'use strict'
const express = require("express")

const tipeKamarController = require("../controllers/tipe_kamarController")
const { upload } = require("../utils/upload")
const router = new express.Router()
const auth = require("../auth/auth")

router.post("/add", auth.authVerify, upload.single("foto"), tipeKamarController.addTipeKamar)
router.put("/update/:id_tipe_kamar", auth.authVerify, upload.single("foto"), tipeKamarController.updateTipeKamar)
router.delete("/delete/:id_tipe_kamar", auth.authVerify, tipeKamarController.deleteTipeKamar)
router.get("/", tipeKamarController.getAllTipeKamar)
router.get("/:id_tipe_kamar", tipeKamarController.getOneTipeKamar)

module.exports = router