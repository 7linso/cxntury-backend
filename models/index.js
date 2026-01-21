import "dotenv/config";
import fs from "fs";
import path from "path";
import Sequelize from "sequelize";
import { fileURLToPath, pathToFileURL } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const basename = path.basename(__filename);

const db = {};

const isProd = process.env.NODE_ENV === "production";

const DB_NAME = isProd ? process.env.DB_NAME : process.env.DEV_DB_NAME;
const DB_USER = isProd ? process.env.DB_USER : process.env.DEV_DB_USER;
const DB_PASSWORD = isProd
  ? process.env.DB_PASSWORD
  : process.env.DEV_DB_PASSWORD;
const DB_HOST = isProd ? process.env.DB_HOST : process.env.DEV_DB_HOST;
const DB_PORT =
  Number(isProd ? process.env.DB_PORT : process.env.DEV_DB_PORT) || 3306;

const sequelize = new Sequelize(DB_NAME, DB_USER, DB_PASSWORD, {
  host: DB_HOST,
  port: DB_PORT,
  dialect: "mysql",
  logging: false,
  ...(isProd && process.env.DB_SSL === "1"
    ? { dialectOptions: { ssl: { rejectUnauthorized: false } } }
    : {}),
});

const files = fs
  .readdirSync(__dirname)
  .filter(
    (file) =>
      file.indexOf(".") !== 0 &&
      file !== basename &&
      file.endsWith(".js") &&
      !file.endsWith(".test.js"),
  );

for (const file of files) {
  const fullPath = path.join(__dirname, file);
  const fileUrl = pathToFileURL(fullPath).href;

  const { default: modelFactory } = await import(fileUrl);
  const model = modelFactory(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
}

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
