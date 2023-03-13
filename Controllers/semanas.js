const Semanas = require("../models/semanas");
const acomodadoresSchema = require("../models/acomodadores");

const createWeek = async (req, res) => {
  try {
    ///this is not meant to be seen in front end app
    req.body.forEach(async (week) => {
      const { fecha } = week;
      await Semanas.create({
        Fecha: fecha,
      });
      // if(newWeek) {
      //     res.status(201).json({
      //         _id: newWeek._id
      //     })
      // } else {
      //     res.status(400);
      //     throw new Error("Se produjo un error, favor de intentar nuevamente.");
      // }
      console.log(week.fecha);
    });
  } catch (err) {
    console.log(err);
  }
};

const fetchWeeks = async (req, res) => {
  try {
    const allWeeks = await Semanas.find();
    if (allWeeks) {
      res.status(201).json({ allWeeks });
    } else {
      res.status(400);
      throw new Error("Se produjo un error, favor de intentar nuevamente.");
    }
  } catch (error) {
    console.log(error);
  }
};

const createRolAcomodadores = async (req, res) => {
  const findRol = await acomodadoresSchema.findOne({ semana: req.body.fecha });
  if (findRol) {
    res.status(201).json({
      _id: findRol._id,
    });
  } else {
    const newRol = await acomodadoresSchema.create({
      semana: req.body.fecha,
    });
    if (newRol) {
      res.status(201).json({
        _id: newRol._id,
      });
    } else {
      res.status(400);
      throw new Error("Se produjo un error, favor de intentar nuevamente.");
    }
  }
};

const fetchWeekData = async (req, res) => {
  const { id } = req.body;
  try {
    const findRol = await acomodadoresSchema.findById(id);
    console.log(findRol);
    res.status(200).json(findRol);
  } catch (error) {
    res.status(500).json({ message: "error de servidor" });
  }
};

const saveRol = async (req, res) => {
  const {
    _id,
    audioVideo,
    mezcladora,
    acomodadores,
    accesos,
    lector,
    recibidorEntreSemana,
    recibidorFinSemana,
    preside,
    aseo
  } = req.body.acomodadores;
  try {
    const rol = await acomodadoresSchema.findById(_id);
    if(rol) {
        rol.audioVideo = audioVideo;
        rol.mezcladora = mezcladora;
        rol.acomodadores = acomodadores;
        rol.accesos = accesos,
        rol.lector = lector,
        rol.recibidorEntreSemana = recibidorEntreSemana;
        rol.recibidorFinDeSemana = recibidorFinSemana;
        rol.preside = preside;
        rol.aseo = aseo
        await rol.save().then(
            res.status(201).json(rol)
        )
    } else {
        res.status(500)
        throw new Error("Se produjo un error.")
    }
  } catch (error) {
    
  }
};

module.exports = {
  createWeek,
  fetchWeeks,
  createRolAcomodadores,
  fetchWeekData,
  saveRol,
};
