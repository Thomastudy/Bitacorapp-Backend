import boatDao from "../models/DAO/boat.dao.js";

class BoatRepository {
  async createBoat(boatData) {

    return await boatDao.createBoat(boatData);
  }

  async getBoatsByUser(userId) {
    const boatList = await boatDao.findByUserId(userId);
    return boatList;
  }
}

export default new BoatRepository();
