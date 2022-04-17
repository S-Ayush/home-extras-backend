import { json } from "express/lib/response";
import { Extra } from "../models/ExtraModel";
import { Home } from "../models/HomeModel";
import { bufferToDataUri } from "../utils/helpers";
import { validateNewRecipe } from "../validations/homevalidations";

export const getHomeInfo = async (req, res) => {
  try {
    const homes = await Home.find().lean();
    res.json(homes);
  } catch (ex) {
    console.error(ex.message);
    res.status(500).send("Failed to fetch the homes info!");
  }
};

export const getSpecificHome = async (req, res) => {
  try {
    const { id } = req.params;
    const homes = await Home.findById(id);
    res.json(homes);
  } catch (ex) {
    console.error(ex.message);
    res.status(500).send("Failed to fetch the homes info!");
  }
};

export const addHomeInfo = async (req, res) => {
  try {
    req.body.extras = JSON.parse(req.body.extras);
    const { error, value } = validateNewRecipe(req.body);
    if (error) {
      res.status(400).send(error.message);
      return;
    }

    if (!req.file) {
      res.status(400).send("Home image is required");
      return;
    }

    const dataUri = bufferToDataUri(req.file.mimetype, req.file.buffer);

    const payload = { ...value, cover: dataUri };
    payload.createdBy = req.currentUser._id;

    const newHome = new Home(payload);
    await newHome.save();

    res.json(newHome);
  } catch (ex) {
    console.error(ex.message);
    res.status(500).send("Failed to add the home!");
  }
};

export const getExtrasforHome = async (req, res) => {
  try {
    const extras = await Extra.find().lean();
    const _extras = {
      Extras: {
        free: extras.map((data) => data.title),
        paid: extras.map((data) => data.title),
      },
    };
    res.json(_extras);
  } catch (err) {
    console.error(ex.message);
    res.status(500).send("Failed to fetch the Extras info!");
  }
};
