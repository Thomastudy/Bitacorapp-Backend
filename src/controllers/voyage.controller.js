import voyageService from "../services/voyage.service.js";

class VoyageController {
  async createVoyage(req, res) {
    try {
      const user = req.body.user;
      const userId = user._id;

      console.log("en el back llega asi la data ", req.body.newVoyageData);

      // Obtener datos del cuerpo de la solicitud
      const {
        boatId,
        skipperId,
        mode,
        crewMembers,
        guestCrew,
        departure,
        arrival,
        miles,
        fact,
      } = req.body.newVoyageData;

      // Validar datos de entrada
      if (!boatId || !mode || !departure || !arrival || !miles) {
        return res.status(400).json({
          message: "Faltan campos obligatorios",
        });
      }

      

      const skipper = skipperId || userId;

      // Llamar al servicio para crear el viaje
      const newVoyage = await voyageService.createVoyage({
        boatId,
        skipper,
        mode: await voyageService.getVoyageMode(mode),
        crewMembers,
        guestCrew,
        departure,
        arrival,
        miles,
        fact,
        createdBy: userId,
      });

      // Responder con el viaje creado
      res.status(201).json({
        message: "Viaje creado exitosamente",
        voyage: newVoyage,
      });
    } catch (error) {
      // Manejo de errores
      console.error("Error al crear viaje:", error);
      res.status(500).json({
        message: "Error al crear el viaje",
        error: error.message,
      });
    }
  }

  async getVoyageById(req, res) {
    try {
      const { id } = req.params;

      const voyage = await voyageService.getVoyageById(id);

      res.status(200).json({
        status: "success",
        data: voyage,
      });
    } catch (error) {
      res.status(404).json({ status: "error", message: error.message });
    }
  }

  async getVoyagesByUser(req, res) {
    try {
      const userId = req.params.userId; // Usuario autenticado
      const voyages = await voyageService.getVoyagesByUserId(userId);

      res.status(200).json({
        status: "success",
        data: voyages,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async getAllVoyages(req, res) {
    try {
      const voyages = await voyageService.getAllVoyages();

      res.status(200).json({
        status: "success",
        data: voyages,
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async updateVoyage(req, res) {
    try {
      const { voyageId } = req.params;
      const updatedData = req.body.updatedData;
      updatedData.mode = await voyageService.getVoyageMode(updatedData.mode);
      updatedData.departure = new Date(updatedData.departure);
      updatedData.arrival = new Date(updatedData.arrival);

      const user = req.body.user;

      const userId = user._id;

      // Primero verificar que el viaje existe y pertenece al usuario
      const existingVoyage = await voyageService.getVoyageById(voyageId);
      if (existingVoyage.createdBy._id.toString() !== userId.toString()) {
        return res.status(403).json({
          status: "error",
          message: "No tienes permiso para modificar este viaje",
        });
      }

      const updatedVoyage = await voyageService.updateVoyage(
        voyageId,
        updatedData
      );
      console.log("aca se esta editando");

      res.status(200).json({
        status: "success",
        message: "Viaje actualizado exitosamente",
        data: updatedVoyage,
      });
    } catch (error) {
      console.log("error ", error);

      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }

  async deleteVoyage(req, res) {
    try {
      const { id } = req.params;
      console.log("log del id ", id);

      // Verificar propiedad del viaje
      const voyage = await voyageService.getVoyageById(id);
      if (voyage.createdBy.toString() !== userId.toString()) {
        return res.status(403).json({
          status: "error",
          message: "No tienes permiso para eliminar este viaje",
        });
      }

      await voyageService.deleteVoyage(id);

      res.status(200).json({
        status: "success",
        message: "Viaje eliminado exitosamente",
      });
    } catch (error) {
      res.status(400).json({
        status: "error",
        message: error.message,
      });
    }
  }
}

export default new VoyageController();
