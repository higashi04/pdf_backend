const Congregacion = require('../models/congregacion_model');

const crearCongregacion = async(req, res) => {
    try {
        const {nombre, activo} = req.body;
    
        if(!nombre) {
            res.status(400)
            throw new Error('Favor de proporcionar el nombre de la congregación.')
        }

        const existeCongregacion = await Congregacion.findOne({nombre});
        if(existeCongregacion) {
            res.status(400)
            throw new Error('La congregación que intenta registrar ya existe.')
        }

        const newCongregacion = await Congregacion.create({
            nombre,
            activo
        });
        if(newCongregacion) {
            console.log(newCongregacion)
            res.status(201).json({
                _id: newCongregacion._id,
                nombre: newCongregacion.nombre,
                activo: newCongregacion.activo
            })
        }
        
    } catch (error) {
        throw error;
    }
}

module.exports = {
    crearCongregacion
}