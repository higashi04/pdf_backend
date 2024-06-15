const Horarios = require("../models/horarios_model");

const createHorario = async(req, res) => {
    try {
        const { horario, rgba, congregacion } = req.body;

        if(!horario, !rgba) {
            return res.status(400).json({message: "Favor de proporcionar todos los datos"});
        };

        const foundSchedule = await Horarios.findOne({ horario, congregacion });
        if(foundSchedule) {
            return res.status(400).json({message: "El horario ya existe en la congregacion"});
        }

        const newSchedule = await Horarios.create({
            horario,
            rgba,
            congregacion
        });

        if(newSchedule) {
            return res.status(201).json({message: "Horario creado exitosamente", horario: newSchedule });
        } else {
            return res.status(400).json({message: "No se pudo crear el horario"});
        }



    } catch (error) {
        res.status(400).json({ error });
    }
}

const ReadHorarios = async(req, res) => {
    try {
        const { congregacionId } = req.body;

        const horarios = await Horarios.find({ congregacionId });

        if(horarios) {
            res.status(201).json({ horarios });
        } else {
            res.status(400).json({message: "No se encontraron horarios para esta congregacion"});
        }

    } catch (error) {
        res.status(400).json({ error });
    }
}

const updateHorarios = async(req, res) => {
    try {
        const {_id, horario, rgba } = req.body;

        if (!_id || !horario || !rgba) {
            return res.status(400).json({ error: "Faltan datos necesarios." });
        }

        const horarioToUpdate = await Horarios.findOneAndUpdate({ _id }, { horario, rgba }, { new: true});

        if(!horarioToUpdate) {
            return res.status(404).json({message: "Horario no encontrado"});
        }

        res.status(200).json({ horario: horarioToUpdate });
    } catch (error) {
        res.status(400).json({ error });
    }
}

const deleteHorarios = async(req, res) => {
    try {
        const {_id } = req.body;

        if(!_id) {
            return res.status(400).json({message: "No se proporcionaron los datos requeridos"});
        }

        const deleteHorario = await Horarios.findByIdAndDelete(_id);

        if(!deleteHorario) {
            return res.status(404).json({ message: "El horario que desea eliminar no existe"});
        }

        res.status(200).json({ message: "Horario eliminado correctamente" });

    } catch (error) {
        res.status(400).json({ error });
    }
}

module.exports = {
    createHorario,
    ReadHorarios,
    updateHorarios,
    deleteHorarios,
}