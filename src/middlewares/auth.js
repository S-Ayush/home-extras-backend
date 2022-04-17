import { verifyToken } from "../lib/jwt";
import { User } from "../models/User";

export const authenticateUser = async (req, res, next) => {
  try {
    const { authorization = "" } = req.headers;
    const [, token] = authorization.split("Bearer ");

    if (!token) {
      res.status(401).send("Please login again to continue!");
      return;
    }
    console.log(token);
    const payload = verifyToken(token);
    if (!payload) {
      res.status(401).send("Please login again to continue!");
      return;
    }
    console.log("payload", payload);
    const user = await User.findById(payload._id).lean();
    console.log("user", user);
    if (!user) {
      res
        .status(404)
        .send("User does not exist in our records. Please contact us.");
      return;
    }

    req.currentUser = user;
    next();
  } catch (ex) {
    res.status(500).send("Something went wrong at our side!");
  }
};
