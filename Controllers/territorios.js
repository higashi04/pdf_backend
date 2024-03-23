const Territorios = require("../models/territorios_model");
const Marcadas = require("../models/marcados_model");
const congregacion = require("../models/congregacion_model");
const marcados_model = require("../models/marcados_model");
const blockNumbers_model = require("../models/blockNumber");
const blockNumber = require("../models/blockNumber");
const territorios_model = require("../models/territorios_model");

const createTerritorio = async (req, res) => {
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
    congregacion,
  } = req.body;

  if (
    !nombre ||
    !esquinaLatitudA ||
    !esquinaLatitudB ||
    !esquinaLatitudC ||
    !esquinaLatitudD ||
    !esquinaLongitudA ||
    !esquinaLongitudB ||
    !esquinaLongitudC ||
    !esquinaLongitudD
  ) {
    res.status(400);
    throw new Error("Favor de proporcionar todos los datos.");
  }

  const territorioExiste = await Territorios.findOne({ nombre });
  if (territorioExiste) {
    res.status(400);
    throw new Error("El territorio ya existe, favor de verificar el nombre.");
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
    fechaCreacion: Date.now(),
  });
  if (newTerritory) {
    console.log(newTerritory);
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
      center: newTerritory.center,
    });
  } else {
    res.status(400);
    throw new Error("Datos invalidos");
  }
};

const createMarcada = async (req, res) => {
  try {
    const { territory: territorio, lng, lat, comments, address } = req.body;

    if (territorio === "" || lng === "" || lat === "") {
      res.status(400);
      throw new Error("Favor de proporcionar todos los datos");
    }
    const marcadoExists = await Marcadas.findOne({ lng, lat });
    if (marcadoExists) {
      res.status(400);
      throw new Error("Estos datos ya existen.");
    }

    const newMarked = await Marcadas.create({
      lng,
      lat,
      territorio,
      comments,
      address
    });

    if (newMarked) {

      const territorioParaAgregar = await Territorios.findOne({
        _id: territorio,
      }); 
      if (territorioParaAgregar) {
        territorioParaAgregar.marcados.push(newMarked._id);
        await territorioParaAgregar.save();

        const territory = await Territorios.findOne({
          _id: territorio,
        }).populate({ path: "marcados" }).populate({ path: "blocks" });
        res.status(201).json({
          _id: territory._id,
          nombre: territory.nombre,
          esquinaLatitudA: territory.esquinaLatitudA,
          esquinaLatitudB: territory.esquinaLatitudB,
          esquinaLatitudC: territory.esquinaLatitudC,
          esquinaLatitudD: territory.esquinaLatitudD,
          esquinaLongitudA: territory.esquinaLongitudA,
          esquinaLongitudB: territory.esquinaLongitudB,
          esquinaLongitudC: territory.esquinaLongitudC,
          esquinaLongitudD: territory.esquinaLongitudD,
          congregacion: territory.congregacion,
          center: territory.center,
          marcados: territory.marcados,
          blocks: territory.blocks,
        });
      } else {
        res.status(500);
        throw new Error("Server Error.");
      }
    } else {
      res.status(500);
      throw new Error("Server Error.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

const UpdateMarcada = async(req, res) => {
  try {
    const {id, address, comments} = req.body;
    console.log(id)
    const branded = await marcados_model.findById(id);
    if (!branded) {
      console.log("not found lolz")
      res.status(400).json({ message: 'No se ha encontrado la direccion que no hay que visitar.'});
      throw new Error( 'No se ha encontrado la direccion que no hay que visitar.' );
    };

    branded.address = address;
    branded.comments = comments;
    await branded.save();
    console.log(branded)
    res.status(204).json({...branded});
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
}


const DeleteMarcada = async (req, res) => {
  try {
    const { territory: territorio, marker: id } = req.body;

    await marcados_model.findByIdAndDelete(id);

    const territory = await Territorios.findOne({
      _id: territorio,
    }).populate({ path: "marcados" });
    if (territory) {
      res.status(201).json({
        _id: territory._id,
        nombre: territory.nombre,
        esquinaLatitudA: territory.esquinaLatitudA,
        esquinaLatitudB: territory.esquinaLatitudB,
        esquinaLatitudC: territory.esquinaLatitudC,
        esquinaLatitudD: territory.esquinaLatitudD,
        esquinaLongitudA: territory.esquinaLongitudA,
        esquinaLongitudB: territory.esquinaLongitudB,
        esquinaLongitudC: territory.esquinaLongitudC,
        esquinaLongitudD: territory.esquinaLongitudD,
        congregacion: territory.congregacion,
        center: territory.center,
        marcados: territory.marcados,
      });
    } else {
      res.status(500);
      throw new Error("Server Error.");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error });
  }
};

const getByCongregacionId = async (req, res) => {
  try {
    const { congregacionId } = req.body.data;
    const territorios = await Territorios.find({
      congregacion: congregacionId,
    }).populate({ path: "marcados" }).populate({ path: "blocks" });

    if (!territorios) {
      res.status(400);
      throw new Error("Not Found");
    }
    // console.log(territorios)
    res.status(201).json({
      territorios,
    });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

const addNumberedBlock = async(req, res) => {
  try {
    const { lat, lng, territory, name } = req.body;

    const blockExists = await blockNumbers_model.findOne({lat, lng});
    if (blockExists) {
      res.status(400);
      throw new Error("Estos datos ya existen.");
    }

    const newBlock = await blockNumbers_model.create({lng, lat, territory, worked: false, name});

    if(newBlock) {
      const getTerritorio = await Territorios.findById(territory).populate({ path: "marcados" }).populate({ path: "blocks" });
      getTerritorio.blocks.push(newBlock._id);
      await getTerritorio.save();

      const refreshTerritory = await Territorios.findById(territory).populate({ path: "marcados" }).populate({ path: "blocks" });
      if(refreshTerritory) {
        res.status(201).json({
          _id: refreshTerritory._id,
          nombre: refreshTerritory.nombre,
          esquinaLatitudA: refreshTerritory.esquinaLatitudA,
          esquinaLatitudB: refreshTerritory.esquinaLatitudB,
          esquinaLatitudC: refreshTerritory.esquinaLatitudC,
          esquinaLatitudD: refreshTerritory.esquinaLatitudD,
          esquinaLongitudA: refreshTerritory.esquinaLongitudA,
          esquinaLongitudB: refreshTerritory.esquinaLongitudB,
          esquinaLongitudC: refreshTerritory.esquinaLongitudC,
          esquinaLongitudD: refreshTerritory.esquinaLongitudD,
          congregacion: refreshTerritory.congregacion,
          center: refreshTerritory.center,
          marcados: refreshTerritory.marcados,
          blocks: refreshTerritory.blocks,
        });
      } else {
        res.status(400);
        throw new Error("Not Found");
      }
    }

  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
}

const editNumberedBlock = async(req, res) => {
  try {
    const {blockId, territory, worked, name} = req.body;

    const findBlock = await  blockNumbers_model.findById(blockId);

    if(findBlock) {
      findBlock.name = name;
      findBlock.worked = worked;

      await findBlock.save();

      const findParentTerritory = await territorios_model.findById(territory).populate({ path: "marcados" }).populate({ path: "blocks" });
      if(findParentTerritory) {
        res.status(201).json({
          _id: findParentTerritory._id,
          nombre: findParentTerritory.nombre,
          esquinaLatitudA: findParentTerritory.esquinaLatitudA,
          esquinaLatitudB: findParentTerritory.esquinaLatitudB,
          esquinaLatitudC: findParentTerritory.esquinaLatitudC,
          esquinaLatitudD: findParentTerritory.esquinaLatitudD,
          esquinaLongitudA: findParentTerritory.esquinaLongitudA,
          esquinaLongitudB: findParentTerritory.esquinaLongitudB,
          esquinaLongitudC: findParentTerritory.esquinaLongitudC,
          esquinaLongitudD: findParentTerritory.esquinaLongitudD,
          congregacion: findParentTerritory.congregacion,
          center: findParentTerritory.center,
          marcados: findParentTerritory.marcados,
          blocks: findParentTerritory.blocks,
        })
      } else {
        res.status(400);
        throw new Error('Not found');
      }
    } else {
      res.status(400);
      throw new Error('Not found');
    }
  } catch (error) {
    
  }
}

const deleteNumberedBlock = async(req, res) => { 
  try{
    const {blockId, territory} = req.body;
    
    await blockNumber.findByIdAndDelete(blockId);
    const getTerritorio = await Territorios.findById(territory).populate({ path: "marcados" }).populate({ path: "blocks" });
    if(getTerritorio) {
      res.status(201).json({
        _id: getTerritorio._id,
        nombre: getTerritorio.nombre,
        esquinaLatitudA: getTerritorio.esquinaLatitudA,
        esquinaLatitudB: getTerritorio.esquinaLatitudB,
        esquinaLatitudC: getTerritorio.esquinaLatitudC,
        esquinaLatitudD: getTerritorio.esquinaLatitudD,
        esquinaLongitudA: getTerritorio.esquinaLongitudA,
        esquinaLongitudB: getTerritorio.esquinaLongitudB,
        esquinaLongitudC: getTerritorio.esquinaLongitudC,
        esquinaLongitudD: getTerritorio.esquinaLongitudD,
        congregacion: getTerritorio.congregacion,
        center: getTerritorio.center,
        marcados: getTerritorio.marcados,
        blocks: getTerritorio.blocks,
      });
    } else {
      res.status(400);
      throw new Error("Not Found");
    }
  }
  catch(error){
    console.log(error);
    res.status(400).json({ error });
  }
}

module.exports = {
  createTerritorio,
  getByCongregacionId,
  createMarcada,
  DeleteMarcada,
  UpdateMarcada,
  addNumberedBlock,
  deleteNumberedBlock,
  editNumberedBlock
};
