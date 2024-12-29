const AcomodadoresSchema = require("../models/acomodadores");

module.exports.CreateAcomodador = async(req, res) => {
    try {
        const { name } = req.body;
        
        if(!name) {
            return res.status(400).json({ message: "El nombre del acomodador es obligatorio."})
        }

        const existeAcomodador = await AcomodadoresSchema.findOne({ name });

        if(existeAcomodador) {
            return res.status(400).json({ message: "El acomodador ya existe"});
        }

        const newAcomodador = await AcomodadoresSchema.create({ name });

        return res.status(201).json(newAcomodador);

    } catch (error) {
        return res.status(500).json("Internal Server Error");
    }
}

module.exports.ReadAcomodadores = async(req, res) => {
    try {
        const getAllAcomodadores = await AcomodadoresSchema.find();
        return res.status(200).json(getAllAcomodadores);
    } catch (error) {
        return res.status(500).json("Internal Server Error");
    }
}

module.exports.UpdateAcomodador = async(req, res) => {
    try {
        const { id, name } = req.body.data;
        if(!name) {
            return res.status(400).json({ message: "El nombre del acomodador es obligatorio."})
        }
        const findAcomodador = await AcomodadoresSchema.findByIdAndUpdate(id, { name });
        if(!findAcomodador) {
            return res.status(404).json({ message: "El acomodador no existe"});
        }
        return res.status(200).json(findAcomodador);
    } catch (error) {
        return res.status(500).json("Internal Server Error");
    }
}

module.exports.DeleteAcomodador = async(req, res) => {
    try{
        const { id } = req.params;
        const findAcomodador = await AcomodadoresSchema.findByIdAndDelete(id);
        if(findAcomodador) { 
            return res.status(200).json({ message: "El acomodador fue eliminado"});
        } else {
            return res.status(404).json({ message: "El acomodador no existe"});
        }
    } catch (error) {
        return res.status(500).json("Internal Server Error");
    }
}