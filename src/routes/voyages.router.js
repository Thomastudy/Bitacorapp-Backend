import { Router } from "express";
import voyageController from "../controllers/voyage.controller.js";

const router = Router();

// Rutas publicas
// este deberia no ponerlo y deberia poner authenticacion para ver los voyages. Con esta ruta estoy vulnerable a que me saquen todos los datos
router.get("/", voyageController.getAllVoyages);

router.get("/:userId", voyageController.getVoyagesByUser);
router.get("/detail/:id", voyageController.getVoyageById);

// Rutas privadas que requieren autenticacion
router.post("/create", voyageController.createVoyage);
router.put("/:voyageId", voyageController.updateVoyage);
router.delete("/del/:id", voyageController.deleteVoyage);

export default router;
