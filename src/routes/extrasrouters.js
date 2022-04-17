import { Router } from "express";
import { addExtrasInfo, getExtrasInfo } from "../controllers/extrasinfo";
import multer from "../lib/upload";
import { authenticateUser } from "../middlewares/auth";

const extrasRouter = Router();

extrasRouter.use(authenticateUser);
extrasRouter.get("/", getExtrasInfo);
extrasRouter.post("/", multer.single("media"), addExtrasInfo);

export default extrasRouter;
