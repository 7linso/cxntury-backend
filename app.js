import "dotenv/config";

import express from "express";
import cors from "cors";
import db from "./models/index.js";

import sessionRoutes from "./routes/session.routes.js";
import worksheetRoutes from "./routes/worksheet.routes.js";

const { sequelize } = db;

const app = express();
app.use(cors());
app.use(express.json());

app.get("/health", (_, res) => res.json({ ok: true }));

app.use("/api", sessionRoutes);
app.use("/api", worksheetRoutes);

const start = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB connection success");

    const port = process.env.PORT || 3000;
    app.listen(process.env.PORT || 3000, "0.0.0.0");
  } catch (err) {
    console.error("DB connection failed", err);
    process.exit(1);
  }
};

start();
