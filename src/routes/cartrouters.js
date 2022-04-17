import { Router } from "express";
import {
  addToCart,
  getCart,
  getSpecficCartItem,
} from "../controllers/cartinfo";
import { authenticateUser } from "../middlewares/auth";

const cartRouter = Router();

cartRouter.use(authenticateUser);
cartRouter.get("/", getCart);
cartRouter.post("/", addToCart);
cartRouter.get("/:id", getSpecficCartItem);

export default cartRouter;
