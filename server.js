const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//ini untuk mengatur dr module routes
app.use("/user", require("./routes/user"));
app.use("/tipe_kamar", require("./routes/tipe_kamar"));
// app.use("/customer", require("./routes/customer"));
app.use("/kamar", require("./routes/kamar"));
// app.use("/booking", require("./routes/booking"));
app.use("/booking-detail", require("./routes/booking_order_detail"));

const port = 8080;
app.listen(port, () => {
    console.log(`Server di port ${port}`);
});