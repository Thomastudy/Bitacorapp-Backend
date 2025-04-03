import mongoose from "mongoose";
import configObject from "./config/config.js";
const { MONGO_URL } = configObject;

const database = mongoose
  .connect(MONGO_URL)
  .then(() => console.log("Conectados a la db"))
  .catch((error) => console.error("Uuu loco todo algo malio sal", error));

export default database;
