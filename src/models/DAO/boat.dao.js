import BoatModel from "../boats.model.js";

class BoatDao {
  async createBoat(boatData) {
    const boat = new BoatModel(boatData);
    return await boat.save();
  }

  async findByUserId(userId) {
    try {
      const query = { $or: [{ owner: userId }, { authorizedUsers: userId }] };
      const boats = await BoatModel.find(query);
      return boats;
    } catch (error) {
      console.error("Error en DAO al buscar viajes por ID de usuario:", error);
      throw error;
    }
  }
}

export default new BoatDao();
