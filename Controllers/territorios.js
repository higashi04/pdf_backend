const Territorios = require("../models/territorios_model");

const createTerritorio = async(req, res) => {
    const {
        nombre,
        esquinaLatitudA,
        esquinaLatitudB,
        esquinaLatitudC,
        esquinaLatitudD,
        esquinaLongitudA,
        esquinaLongitudB,
        esquinaLongitudC,
        esquinaLongitudD,
    } = req.body

    if(!nombre || !esquinaLatitudA || !esquinaLatitudB || !esquinaLatitudC || !esquinaLatitudD || !esquinaLongitudA || !esquinaLongitudB || !esquinaLongitudC || !esquinaLongitudD) {
        res.status(400);
        throw new Error ("Favor de proporcionar todos los datos.");
    }

    const territorioExiste = await Territorios.findOne({nombre});
    if(territorioExiste){
        res.status(400)
        throw new Error("El territorio ya existe, favor de verificar el nombre.")
    }

    const newTerritory = await Territorios.create({
        nombre,
        esquinaLatitudA,
        esquinaLatitudB,
        esquinaLatitudC,
        esquinaLatitudD,
        esquinaLongitudA,
        esquinaLongitudB,
        esquinaLongitudC,
        esquinaLongitudD,
        fechaCreacion: Date.now().toLocaleString()
    });
    if(newTerritory) {
        console.log(newTerritory)
        res.status(201).json({
            _id: newTerritory._id,
            nombre: newTerritory.nombre,
            esquinaLatitudA: newTerritory.esquinaLatitudA,
            esquinaLatitudB: newTerritory.esquinaLatitudB,
            esquinaLatitudC: newTerritory.esquinaLatitudC,
            esquinaLatitudD: newTerritory.esquinaLatitudD,
            esquinaLongitudA: newTerritory.esquinaLongitudA,
            esquinaLongitudB: newTerritory.esquinaLongitudB,
            esquinaLongitudC: newTerritory.esquinaLongitudC,
            esquinaLongitudD: newTerritory.esquinaLongitudD,
            center: newTerritory.center
        })
    } else {
        res.status(400)
        throw new Error("Datos invalidos")
    }
}

module.exports = {
    createTerritorio
}