// Dependencias
import express from "express";
import cors from "cors";
import { engine } from "express-handlebars";
import cookieParser from "cookie-parser";
// Database
import "./database.js";
import usersRouter from "./routes/users.router.js";
import voyagesRouter from "./routes/voyages.router.js";
import viewsRouter from "./routes/views.router.js";
import boatsRouter from "./routes/boats.router.js";
// Config
import configObject from "./config/config.js";
const { PORT, FRONT_URL } = configObject;

const app = express();

/*////////////////////

MIDDLEWARE

////////////////////*/
//Middleware: aca le digo al servidor que voy a usar formato json
app.use(express.json());
//esto le dice a la app que va a recibir datos complejos
app.use(express.urlencoded({ extended: true }));
// Hace que busque las cosas llamandolas desde esta ubicacion
app.use(express.static("./src/public"));
// usar las cookies
app.use(cookieParser());
// CORS (Cross-Origin Resource Sharing) es un mecanismo de seguridad
app.use(cors({ origin: FRONT_URL, credentials: true }));

/*////////////////////

CONFIGURACION EXPRESS-HANDLEBARS

//////////////////////
*/
app.engine("handlebars", engine());
app.set("view engine", "handlebars");
app.set("views", "./src/views");

/*//////////////////////////

Rutas

//////////////////////////*/
app.get("/", (req, res) => {
  res.send("Hola desde Bitacorapp");
});

app.use("/api/sessions", usersRouter);
app.use("/api/voyages", voyagesRouter);
app.use("/api/boats", boatsRouter);
app.use("/", viewsRouter);

/*//////////////////////////
  
Servidor

//////////////////////////*/
app.listen(PORT, () => {
  console.log(`Escuchando en el puerto: http://localhost:${PORT}`);
});
