import voyageDao from "../models/DAO/voyage.dao.js";
import userService from "../services/user.service.js";

class VoyageRepository {
  async createVoyage(voyageData) {
    return await voyageDao.create(voyageData);
  }

  async findById(id) {
    const voyageData = await voyageDao.findById(id);
    const voyageSkipper = await voyageData.populate("skipper", "userName");

    const voyageCreator = await voyageSkipper.populate("createdBy", "userName");

    const voyageBoat = await voyageCreator.populate("boatId", "boatName");

    const voyageCrew = await voyageBoat.populate("crewMembers", "userName");

    return voyageCrew;
  }

  async findAll() {
    return await voyageDao
      .findAll()
      .populate("skipper", "userName")
      .populate("crewMembers", "userName");
  }

  async findByUserId(userId) {
    // Verificar que el usuario exista
    const userExists = await userService.getUserById({ _id: userId });
    if (!userExists) {
      throw new Error("Usuario no encontrado");
    }

    const voyages = await voyageDao.findByUserId(userId);

    // Poblar datos de skipper y crew
    return Promise.all(
      voyages.map(async (voyage) => {
        await voyage.populate("skipper", "userName");
        await voyage.populate("createdBy", "userName");
        await voyage.populate("crewMembers", "userName");
        await voyage.populate("boatId", "boatName");
        return voyage;
      })
    );
  }

  async update(id, updateData) {
    return await voyageDao.update(id, updateData);
  }

  // Eliminar un viaje
  async delete(id) {
    return await voyageDao.delete(id);
  }
}

export default new VoyageRepository();
