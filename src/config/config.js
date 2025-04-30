import dotenv from "dotenv";
import program from "../utils/commander.js";

const { mode } = program.opts();

dotenv.config({
  path: mode === "prod" ? "./.env.prod" : "./.env.dev",
});

const configObject = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  FRONT_URL: process.env.FRONT_URL,
};

export default configObject;
