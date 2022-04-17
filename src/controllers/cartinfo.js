import { Cart } from "../models/CartModel";
import { bufferToDataUri } from "../utils/helpers";
import { validateNewExtras } from "../validations/extrasvalidation";
export const getCart = async (req, res) => {
  try {
    const currentUser = req.currentUser;
    const cartItem = await Cart.find({ user_id: currentUser._id }).lean();

    res.json(cartItem);
  } catch (ex) {
    console.error(ex.message);
    res.status(500).send("Failed to fetch the extras info!");
  }
};

export const getSpecficCartItem = async (req, res) => {
  try {
    const extras = await Extra.find().lean();
    res.json(extras);
  } catch (ex) {
    console.error(ex.message);
    res.status(500).send("Failed to fetch the extras info!");
  }
};

export const addToCart = async (req, res) => {
  try {
    const payload = {};
    payload.home_id = req.body.home_id;
    payload.user_id = req.currentUser._id;

    const newCartItem = new Cart(payload);
    await newCartItem.save();
    res.json(newCartItem);
  } catch (ex) {
    console.error(ex.message);
    res.status(500).send("Failed to add the Extras!");
  }
};
