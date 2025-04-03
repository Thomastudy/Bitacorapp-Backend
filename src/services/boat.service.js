import boatRepository from "../repositories/boat.repository.js";
import userService from "./user.service.js";

class BoatService {
  async createBoat(boatData) {
    try {
      if (boatData.owners && Array.isArray(boatData.owners)) {
        const userChecks = await Promise.all(
          boatData.owners.map((userId) => userService.getUserById(userId))
        );

        if (userChecks.some((user) => !user)) {
          throw new Error("Uno o más propietarios no existen");
        }
      }

      if (boatData.authorizedUsers && Array.isArray(boatData.authorizedUsers)) {
        const userChecks = await Promise.all(
          boatData.authorizedUsers.map((userId) =>
            userService.getUserById(userId)
          )
        );

        if (userChecks.some((user) => !user)) {
          throw new Error("Uno o más usuarios autorizados no existen");
        }
      }

      const createdBy = await userService.getUserById({
        _id: boatData.createdBy,
      });
      if (!createdBy) {
        throw new Error(
          "No se ha encontrado al responsable del registro de esta embarcación"
        );
      }

      return await boatRepository.createBoat(boatData);
    } catch (error) {
      throw new Error(`Error al crear el viaje: ${error}`);
    }
  }

  async getBoatsByUser(userId) {
    try {
      const userExists = await userService.getUserById({ _id: userId });
      if (!userExists) {
        throw new Error("Usuario no encontrado");
      }
      const boatList = await boatRepository.getBoatsByUser(userId);

      return boatList;
    } catch (error) {}
  }
}

export default new BoatService();
