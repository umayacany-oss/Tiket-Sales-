const diskonModel = require("../models").diskon;

// GET semua data
exports.getAllDiskon = async (request, response) => {
    try {
        let diskon = await diskonModel.findAll();

        return response.json({
            success: true,
            data: diskon,
            message: "All discount has been loaded"
        });
    } catch (error) {
        return response.json({
            success: false,
            message: error.message
        });
    }
};

// POST tambah data
exports.addDiskon = async (request, response) => {
    try {
        let newDiskon = {
            nama_diskon: request.body.nama_diskon,
            nominal_diskon: request.body.nominal_diskon
        };

        await diskonModel.create(newDiskon);

        return response.json({
            success: true,
            message: "New discount has been inserted"
        });
    } catch (error) {
        return response.json({
            success: false,
            message: error.message
        });
    }
};