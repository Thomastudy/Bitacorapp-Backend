import mongoose from "mongoose";
import userDao from "../models/DAO/user.dao.js";
import voyageRepository from "../repositories/voyage.repository.js";
import userService from "./user.service.js";

class VoyageService {
  async createVoyage(voyageData) {
    try {
      const skipperExists = await userService.getUserById({
        _id: voyageData.skipper,
      });
      if (!skipperExists) {
        throw new Error("Skipper no encontrado");
      }

      // validar fechas
      const departure = new Date(voyageData.departure);
      const arrival = new Date(voyageData.arrival);

      if (isNaN(departure.getTime())) {
        throw new Error("Fecha de salida invalida");
      }
      if (isNaN(arrival.getTime())) {
        throw new Error("Fecha de llegada invalida");
      }
      if (arrival <= departure) {
        throw new Error(
          "La hora de llegada debe ser posterior a la hora de salida"
        );
      }

      // procesar y validar a la tripulacion
      if (voyageData.crew && voyageData.crew.length > 0) {
        voyageData.crew = await this.processCrewMembers(voyageData.crew);
      }

      return await voyageRepository.createVoyage(voyageData);
    } catch (error) {
      throw new Error(`Error al crear el viaje: ${error}`);
    }
  }

  async processCrewMembers(crew) {
    return Promise.all(
      crew.map(async (member) => {
        // Si es un ObjectId, verificar que el usuario existe
        if (member) {
          const userExists = await userDao.findById({ _id: member._id });
          if (!userExists) {
            throw new Error(
              `Usuario con ID ${member.crewMember} no encontrado`
            );
          }
          return { crewMember: member.crewMember };
        }

        // Si es un string o un objeto con fullName
        if (typeof member.crewMember === "string") {
          const memberName = typeof member.crewMember === "string";
          return {
            crewMember: {
              memberName: memberName.trim(),
            },
          };
        }

        throw new Error("Formato de miembro de tripulación inválido");
      })
    );
  }

  async getVoyageMode(inputMode) {
    switch (inputMode) {
      case "Comercial":
        return "commercial";
      case "Paseo":
        return "recreational";
      case "Regata":
        return "regata";
      case "Escuela":
        return "research";
      case "Entrenamiento":
        return "training";
      case "Otro":
        return "other";
    }
  }

  async getVoyageById(id) {
    try {
      const voyage = await voyageRepository.findById(id);
      if (!voyage) {
        throw new Error("Viaje no encontrado");
      }
      return voyage;
    } catch (error) {
      throw new Error(`Error al obtener el viaje: ${error.message}`);
    }
  }

  async getVoyagesByUserId(userId) {
    try {
      return await voyageRepository.findByUserId(userId);
    } catch (error) {
      throw new Error(
        `Error al obtener los viajes del usuario: ${error.message}`
      );
    }
  }

  async getAllVoyages() {
    try {
      return await voyageRepository.findAll();
    } catch (error) {
      throw new Error(`Error al obtener los viajes: ${error.message}`);
    }
  }

  async updateVoyage(id, updateData) {
    try {
      // procesar y validar a la tripulacion
      if (updateData.crewMember && updateData.crewMember.length > 0) {
        updateData.crewMember = await this.processCrewMembers(
          updateData.crewMember
        );
      }
      console.log("aca en el voyage service edit");

      const updatedVoyage = await voyageRepository.update(id, updateData);
      if (!updatedVoyage) {
        throw new Error("Viaje no encontrado");
      }
      return updatedVoyage;
    } catch (error) {
      throw new Error(`Error al actualizar el viaje: ${error.message}`);
    }
  }

  async deleteVoyage(id) {
    try {
      const deletedVoyage = await voyageRepository.delete(id);
      if (!deletedVoyage) {
        throw new Error("Viaje no encontrado");
      }
      return deletedVoyage;
    } catch (error) {
      throw new Error(`Error al eliminar el viaje: ${error.message}`);
    }
  }
}

export default new VoyageService();
