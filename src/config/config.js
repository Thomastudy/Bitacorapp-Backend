import dotenv from "dotenv";
import program from "../utils/commander.js";

const { mode } = program.opts();

// Si estamos en desarrollo, cargamos el .env correspondiente
if (mode !== "prod") {
  dotenv.config({ path: "./.env.dev" });
} else {
  dotenv.config(); // En Railway, las variables ya están en process.env
}

const configObject = {
  MONGO_URI: process.env.MONGO_URI,
  PORT: process.env.PORT,
  JWT_SECRET: process.env.JWT_SECRET,
  FRONT_URL: process.env.FRONT_URL,
};

export default configObject;
