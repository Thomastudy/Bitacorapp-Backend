import mongoose from "mongoose";
import configObject from "./config/config.js";
const { MONGO_URI } = configObject;

const database = mongoose
  .connect(MONGO_URI)
  .then(() => console.log("Conectados a la db "+ MONGO_URI))
  .catch((error) => console.error("Uuu loco todo algo malio sal", error));

export default database;
