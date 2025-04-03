import VoyageModel from "../voyages.model.js";

class VoyageDao {
  async create(voyageData) {
    try {
      const voyage = new VoyageModel(voyageData);
      return await voyage.save();
    } catch (error) {
      console.error("Error en DAO al crear viaje:", error);
      throw error;
    }
  }

  async findById(id) {
    try {
      return await VoyageModel.findById(id);
    } catch (error) {
      console.error("Error en DAO al buscar viaje por ID:", error);
      throw error;
    }
  }

  async findByUserId(userId) {
    try {
      // Buscar viajes donde el usuario es skipper o está en la crew
      const voyages = await VoyageModel.find({
        $or: [{ skipper: userId }, { crewMembers: userId }],
      }).sort({ createdAt: -1 });

      return voyages;
    } catch (error) {
      console.error("Error en DAO al buscar viajes por ID de usuario:", error);
      throw error;
    }
  }

  async findAll() {
    try {
      return await VoyageModel.find();
    } catch (error) {
      console.error("Error en DAO al buscar todos los viajes:", error);
      throw error;
    }
  }

  async update(id, updateData) {
    try {
      console.log("updateData ", updateData);
      console.log("id ", id);

      return await VoyageModel.findByIdAndUpdate(id, updateData, {
        new: true, // Devuelve el documento actualizado
        runValidators: true, // Ejecuta validaciones del esquema
        context: "query",
      });
    } catch (error) {
      console.error("Error en DAO al actualizar viaje: ", error);
      throw error;
    }
  }

  // Método para eliminar un viaje
  async delete(id) {
    try {
      return await VoyageModel.findByIdAndDelete(id);
    } catch (error) {
      console.error("Error en DAO al eliminar viaje:", error);
      throw error;
    }
  }
}

export default new VoyageDao();
