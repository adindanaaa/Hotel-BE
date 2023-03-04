const Sequelize = require("sequelize");

const model = require("../models/index");
const kamar = model.kamar;
const tipeKamar = model.tipe_kamar
const detailBooking = model.detail_booking

const Op = Sequelize.Op

const addKamar = async (req, res) => {
    try {
        const data = {
            nomor_kamar: req.body.nomor_kamar,
            id_tipe_kamar: req.body.id_tipe_kamar,
        };

        await kamar.create(data);
        return res.status(200).json({
            message: "Success create room",
            data: data,
            code: 200,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal error",
            err: err,
        });
    }
};

const updateKamar = async (req, res) => {
    try {
        const params = {
            id_kamar: req.params.id_kamar,
        };

        const data_edit = {
            nomor_kamar: req.body.nomor_kamar,
            id_tipe_kamar: req.body.id_tipe_kamar,
        };

        const result = await kamar.findOne({ where: params })
        if (result == null) {
            return res.status(404).json({
                message: "Data not found!"
            });
        }

        await room.update(data_edit, { where: params });
        return res.status(200).json({
            message: "Success update room",
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal error",
            err: err,
        });
    }
};

const deleteKamar = async (req, res) => {
    try {
        const params = {
            id_kamar: req.params.id_kamar,
        };

        const result = await kamar.findOne({ where: params })
        if (result == null) {
            return res.status(404).json({
                message: "Data not found!"
            });
        }

        await kamar.destroy({ where: params });
        return res.status(200).json({
            message: "Success to delete room",
            code: 200,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal error",
            err: err,
        });
    }
};

//get all room include roomType
const findAllKamar = async (req, res) => {
    try {
        const result = await kamar.findAll({
            include: ["tipe_kamar"],
        });

        return res.status(200).json({
            message: "Success to get all room",
            code: 200,
            count: result.length,
            data: result,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal error",
            err: err,
        });
    }
};

//findAllRoom berdasarkan roomtype
const findKamarByIdTipeKamar = async (req, res) => {
    try {
        const params = {
            id_tipe_kamar: req.params.id_tipe_kamar,
        };

        const resultTipeKamar = await tipeKamar.findOne({ where: params })
        if (resultTipeKamar == null) {
            return res.status(404).json({
                message: "Data not found!"
            });
        }

        const result = await kamar.findAll({
            include: ["tipe_kamar"],
            where: params,
        });

        return res.status(200).json({
            message: "Succes to get all room by type room",
            code: 200,
            count: result.length,
            data: result,
        });
    } catch (err) {
        console.log(err);
        return res.status(500).json({
            message: "Internal error",
            err: err,
        });
    }
};

const findKamarByFilterDate = async (req, res) => {
    const checkInDate = req.body.check_in_date
    const checkOutDate = req.body.check_out_date

    const kamarData = await tipeKamar.findAll({
        attributes: ["id_tipe_kamar", "nama_tipe_kamar"],
        include: [
            {
                model: kamar,
                as: "kamar"

            }
        ]
    })

    const kamarBookedData = await tipeKamar.findAll({
        atrributes: ["id_tipe_kamar", "nama_tipe_kamar"],
        include: [
            {
                model: kamar,
                as: "kamar",
                include : [
                    {
                        model : detailBooking,
                        as : "detail_booking",
                        attributes : ["access_date"],
                        where: {
                            access_date: {
                                [Op.between] : [checkInDate, checkOutDate]
                            }
                        }
                    }
                ]
            }
        ]
    })

    const available = []
    const availableByType = []

    for(let i=0; i < kamarData.length; i++){
        kamarData[i].kamar.forEach((kamar) => {
            let isBooked = false
            kamarBookedData.forEach((booked) => {
                booked.kamar.forEach((bookedKamar) => {
                    if(room.id_kamar === bookedKamar.id_kamar){
                        isBooked = true
                    }
                })
            })

            if(!isBooked){
                available.push(kamar)
            }
        })
    }

    for(let i=0; i < kamarData.length; i++){
        let tipeKamar = {}
        tipeKamar.id_tipe_kamar = kamarData[i].id_tipe_kamar
        tipeKamar.nama_tipe_kamar = kamarData[i].nama_tipe_kamar
        tipeKamar.kamar = []
        available.forEach((kamar) => {
            if(kamar.id_tipe_kamar === roomData[i].id_tipe_kamar){
                tipeKamar.kamar.push(kamar)
            }
        })
        if(tipeKamar.kamar.length > 0){
            availableByType.push(tipeKamar)
        }
    }

    return res.status(200).json({
        message: "Succes to get available room by type room",
        code: 200,
        kamarAvailable : available,
        kamarAvailableCount : available.length,
        kamar: availableByType,
        typeKamarCount: availableByType.length
    });

}

    module.exports = {
        addKamar,
        updateKamar,
        deleteKamar,
        findAllKamar,
        findKamarByIdTipeKamar,
        findKamarByFilterDate
    };