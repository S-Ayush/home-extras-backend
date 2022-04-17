import { Router } from "express";
import {
  addHomeInfo,
  getExtrasforHome,
  getHomeInfo,
  getSpecificHome,
} from "../controllers/homesinfo";
import multer from "../lib/upload";
import { authenticateUser } from "../middlewares/auth";

const homeRouter = Router();

homeRouter.use(authenticateUser);
homeRouter.get("/", getHomeInfo);
homeRouter.get("/extras", getExtrasforHome);
homeRouter.get("/:id", getSpecificHome);
homeRouter.post("/", multer.single("media"), addHomeInfo);

export default homeRouter;
