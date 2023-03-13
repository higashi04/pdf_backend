const Semanas = require("../models/semanas");
const acomodadores = require("../models/acomodadores");

const createWeek = async(req, res) => {
    try{ ///this is not meant to be seen in front end app
        req.body.forEach(
           async week => {
                const {fecha} = week;
                 await Semanas.create({
                    Fecha: fecha
                });
                // if(newWeek) {
                //     res.status(201).json({
                //         _id: newWeek._id
                //     })
                // } else {
                //     res.status(400);
                //     throw new Error("Se produjo un error, favor de intentar nuevamente.");
                // }
                console.log(week.fecha)
            }
        )
    } catch(err) {
        console.log(err)
    }
};

const fetchWeeks = async(req, res) => {
    try {
        const allWeeks = await Semanas.find();
        if(allWeeks) {
            res.status(201).json({allWeeks})
        } else {
            res.status(400);
            throw new Error("Se produjo un error, favor de intentar nuevamente.");
        }
    } catch (error) {
        console.log(error)
    }
};

const createRolAcomodadores = async(req, res) => {
    const findRol = await acomodadores.findOne({semana: req.body.fecha});
    if(findRol) {
        res.status(201).json({
            _id: findRol._id
        })
    }else {
        const newRol = await acomodadores.create({
            semana: req.body.fecha
        });
        if(newRol) {
            res.status(201).json({
                _id: newRol._id
            })
        } else {
            res.status(400);
            throw new Error("Se produjo un error, favor de intentar nuevamente.");
        }
    }
};

const fetchWeekData = async(req, res) => {
    const {id} = req.body;
    try {
        const findRol = await acomodadores.findById(id);
        console.log(findRol)
        res.status(200).json(findRol);
    } catch (error) {
        res.status(500).json({message: "error de servidor"})
    }
};

module.exports = {
    createWeek,
    fetchWeeks,
    createRolAcomodadores,
    fetchWeekData
}