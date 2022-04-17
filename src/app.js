import express from "express";
import helmet from "helmet";
import cors from "cors";
import path from "path";

import authRouter from "./routes/auth";
import homeRouter from "./routes/homeroutes";
import extrasRouter from "./routes/extrasrouters";
import cartRouter from "./routes/cartrouters";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(helmet());
app.use(cors());
app.use("/static", express.static("uploads", {}));

app.use("/api/auth", authRouter);
app.use("/api/homes", homeRouter);
app.use("/api/extras", extrasRouter);
app.use("/api/cart", cartRouter);

export default app;
