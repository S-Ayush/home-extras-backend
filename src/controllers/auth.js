import { User } from "../models/User";
import { validateLogin, validateRegister } from "../validations/auth";
import { compareHash, hashString } from "../lib/bcrypt";
import { signPayload } from "../lib/jwt";

export const loginUser = async (req, res) => {
  try {
    const { error, value } = validateLogin(req.body);
    if (error) {
      res.status(400).send(error.message);
      return;
    }

    const { email, password } = value;

    const user = await User.findOne({ email }).select("password");
    if (!user) {
      res.status(404).send("Account doesn't exist! Please register first.");
      return;
    }

    const isSamePwd = await compareHash(password, user.password);
    if (!isSamePwd) {
      res.status(400).send("Invalid email or password!");
      return;
    }

    const payload = { _id: user._id, email };
    const token = signPayload(payload);

    res.json({ user: payload, token });
  } catch (ex) {
    console.error(ex.message);
    res.status(500).send("Failed to login!");
  }
};

export const registerUser = async (req, res) => {
  try {
    const { error, value } = validateRegister(req.body);
    if (error) {
      res.status(400).send(error.message);
      return;
    }

    const { email, password } = value;

    const userExists = await User.exists({ email });
    if (userExists) {
      res.status(400).send("Account already exist! Please login.");
      return;
    }

    const hashedPassword = await hashString(password);

    const user = new User({ email, password: hashedPassword });
    await user.save();

    const payload = { _id: user._id, email: user.email };
    const token = signPayload(payload);
    res.json({ user: payload, token });
  } catch (ex) {
    console.error(ex.message);
    res.status(500).send("Failed to register!");
  }
};

export const getCurrentUser = async (req, res) => {
  if (!req.currentUser) {
    res
      .status(404)
      .send("User does not exist in our records. Please contact us.");
    return;
  }

  const payload = { _id: req.currentUser._id, email: req.currentUser.email };
  const token = signPayload(payload);
  res.json({ user: payload, token });
};
