import { Router } from "express";
import boatController from "../controllers/boat.controller.js";

const router = Router();

// Rutas publicas
// router.get("/", boatController.getAllboats);
router.get("/:userId", boatController.getBoatsByUser);

// Rutas privadas que requieren autenticacion
router.post("/create", boatController.createBoat);
// router.post("/:id", boatController.updateboat);
// router.delete("/del/:id", boatController.deleteboat);

export default router;
