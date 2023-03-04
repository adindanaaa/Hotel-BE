'use strict'
const express = require("express")

const boDetail = require("../controllers/bookingOrderDetailController")
const router = new express.Router()

router.get("/", boDetail.getAllBookingDetail)
router.delete("/delete/:id_detail_booking", boDetail.deleteBookingDetail)
router.post("/find/access_date", boDetail.findBookingDetail)

module.exports = router