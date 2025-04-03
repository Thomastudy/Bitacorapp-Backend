import boatService from "../services/boat.service.js";

class BoatController {
  async createBoat(req, res) {
    const {
      boatName,
      boatType,
      owners,
      authorizedUsers,
      brand,
      model,
      length,
      flag,
      photo,
      comments,
    } = req.body.boatData;

    const user = req.body.user;
    const userId = user._id;

    try {
      const boatData = {
        boatName,
        boatType,
        owners,
        authorizedUsers: [userId, ...authorizedUsers],
        brand,
        model,
        length,
        flag,
        photo,
        comments,
        createdBy: userId,
      };

      const filteredBoatData = Object.fromEntries(
        Object.entries(boatData).filter(([_, value]) => value !== "")
      );

      const newBoat = await boatService.createBoat(filteredBoatData);

      return res.status(201).json({ status: "Success", data: newBoat });
    } catch (error) {
      console.error("Error al crear viaje:", error);
      res.status(500).json({
        message: "Error al crear el viaje",
        error: error.message,
      });
    }
  }

  async getBoatsByUser(req, res) {
    const { userId } = req.params;

    try {
      const boatList = await boatService.getBoatsByUser(userId);

      return res.status(200).json({ status: "Success", data: boatList });
    } catch (error) {
      console.error("Error en servidor al encontrar barcos:", error);
      res.status(500).json({
        message: "Error en servidor al encontrar barcos",
        error: error.message,
      });
    }
  }
}

export default new BoatController();
