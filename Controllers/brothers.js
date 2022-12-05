const brothers = require("../models/bros");

const createBrother = async(req, res) => {
    try {
        const {nombre, congregacion, activo} = req.body.brother;
        if(!nombre) {
            res.status(400);
            throw new Error("Favor de propocionar el nombre del hermano que desea registrar.")
        };
        const existeBrother = await brothers.findOne({nombre});
        if(existeBrother) {
            res.status(400);
            throw new Error("El hermano que desea registrar ya existe.");
        };
        const newBro = await brothers.create({
            nombre, congregacion, activo
        });
        if(newBro) {
            res.status(201).json({ 
                _id: newBro._id,
                nombre: newBro.nombre,
                congregacion: newBro.congregacion,
                activo: newBro.activo
            })
        } else {
            res.status(400);
            throw new Error("Se produjo un error, favor de intentar nuevamente.");
        }
    } catch (error) {
        console.log(error);
    }
};

const fetchBrothersByCongregation = async(req, res) => {
    try {
        const brothersByCongregation = await brothers.find(req.body);
        if(brothersByCongregation) {
            res.status(201).json(brothersByCongregation);
        } else {
            res.status(400);
            throw new Error("Se produjo un error, favor de intentar nuevamente.");
        }
    } catch (error) {
        console.log(error);
    }
};

const setBrotherActivoStatus = async(req, res) => {
    try {
        const fetchedBro = await brothers.findById(req.body.id);
        if(fetchedBro) {
            fetchedBro.activo = req.body.activo;
            await fetchedBro.save().then(
                res.status(201).json(fetchedBro)
            )
        }
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    createBrother,
    fetchBrothersByCongregation,
    setBrotherActivoStatus,
}