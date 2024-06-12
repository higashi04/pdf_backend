const LineasModel = require("../models/lineas_model");
const Territorios = require("../models/territorios_model");

const createLines = async(req, res) => {
    try {
        const {lines, territoryId} = req.body;

        const territorio = await Territorios.findById(territoryId);
        if (!territorio) {
            return res.status(404).json({ message: "Territorio no encontrado." });
        }

        if(!lines || lines.length === 0) {
            return res.status(400).json({ message: "Registrar al menos una línea." });
        };

        // Check for existing lines and filter them out
        const filteredLines = [];

        for(const line of lines) {
            const existingLine = await LineasModel.findOne(
            {
                latOne: line.latOne,
                lngOne: line.lngOne,
                latTwo: line.latTwo,
                lngTwo: line.lngTwo,
            });
            if(!existingLine) {
                filteredLines.push(
                {
                    latOne: line.latOne,
                    lngOne: line.lngOne,
                    latTwo: line.latTwo,
                    lngTwo: line.lngTwo,
                });
            };
        }

        if(filteredLines.length === 0) {
            return res.status(400).json({ message: "Todas las líneas ya fueron registradas"});
        }

        const insertedLines = await LineasModel.insertMany(filteredLines);

        insertedLines.map(line => territorio.lineas.push(line._id));
        await territorio.save();

        res.status(201).json({
            lines: insertedLines
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: error.message || "Error interno del servidor" });
    }
}

module.exports = {
    createLines,
}