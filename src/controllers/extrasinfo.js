import { Extra } from "../models/ExtraModel";
import { bufferToDataUri } from "../utils/helpers";
import { validateNewExtras } from "../validations/extrasvalidation";
export const getExtrasInfo = async (req, res) => {
  try {
    const extras = await Extra.find().lean();
    res.json(extras);
  } catch (ex) {
    console.error(ex.message);
    res.status(500).send("Failed to fetch the extras info!");
  }
};

export const addExtrasInfo = async (req, res) => {
  try {
    const { error, value } = validateNewExtras(req.body);
    if (error) {
      res.status(400).send(error.message);
      return;
    }

    if (!req.file) {
      res.status(400).send("Extras image is required");
      return;
    }

    const dataUri = bufferToDataUri(req.file.mimetype, req.file.buffer);

    const payload = { ...value, cover: dataUri };
    payload.createdBy = req.currentUser._id;

    const newExtras = new Extra(payload);
    await newExtras.save();

    res.json(newExtras);
  } catch (ex) {
    console.error(ex.message);
    res.status(500).send("Failed to add the Extras!");
  }
};
