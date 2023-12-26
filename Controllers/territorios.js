const Territorios = require("../models/territorios_model");
const Marcadas = require("../models/marcados_model");
const congregacion = require("../models/congregacion_model")

const createTerritorio = async(req, res) => {
    // console.log(req.body)
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
        congregacion
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
        congregacion,
        fechaCreacion: Date.now()
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
            congregacion: newTerritory.congregacion,
            center: newTerritory.center
        })
    } else {
        res.status(400)
        throw new Error("Datos invalidos")
    }
}

const createMarcada = async(req, res) => {
    try {
        const {
            territorio,
            lng,
            lat
        } = req.body
    
        if(!territorio || !lng || !lat) {
            res.status(400)
            throw new Error("Favor de proporcionar todos los datos")
        }
        const marcadoExists = await Marcadas.findOne({lng, lat});
        if(marcadoExists) {
            res.status(400)
            throw new Error("Estos datos ya existen.")
        }

        const newMarked = await Marcadas.create({
            lng, lat, territorio
        })
        
        if(newMarked) {
            console.log(newMarked)

            const territory = await Territorios.findById(territorio);
            if(territory) {
                territory.marcados.push(newMarked._id);
                await territory.save();
            }

            res.status(201).json({
                _id: newMarked._id,
                lng: newMarked.lng,
                lat: newMarked.lat
            });
        } else {
            res.status(500)
            throw new Error("Server Error.")
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({error: error})
    }
}

const getByCongregacionId = async(req, res) => {
    try {
        const {congregacionId} = req.body.data
        const territorios = await Territorios.find({congregacion: congregacionId}).populate({path: 'marcados'})

        if(!territorios){
            res.status(400)
            throw new Error("Not Found")
        }
        console.log(territorios)
        res.status(201).json({
            territorios
        })
    } catch (error) {
        console.log(error)
        res.status(400).json({error})
    }
}

module.exports = {
    createTerritorio,
    getByCongregacionId,
    createMarcada
}