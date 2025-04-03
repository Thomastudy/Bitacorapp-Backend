import userRepository from "../repositories/user.repository.js";
import { createHash, isValidPassword } from "../utils/password.utils.js";

class UserService {
  async registerUser(userData) {
    // 1) Me aseguro que el usuario no existe por mail ni por usuario
    // a- Usuario

    const existeUsuario = await userRepository.getUserByUserName(
      userData.userName
    );
    if (existeUsuario) throw new Error("El Usuario ya se encuentra registrado");

    // b- Email
    const existeEmail = await userRepository.getUserByEmail(userData.email);
    if (existeEmail) throw new Error("El Email ya se encuentra registrado");

    // 2) Creamos el usuario
    userData.password = createHash(userData.password);

    return await userRepository.createUser(userData);
  }

  async logInUser(userName, email, phone, password) {
    const selectSelector = async () => {
      if (userName !== "") {
        return await userRepository.getUserByUserName(userName);
      } else if (email !== "") {
        return await userRepository.getUserByEmail(email);
      } else if (phone !== "") {
        return await userRepository.getUserByPhone(phone);
      } else {
        throw new Error("Error al recibir credenciales");
      }
    };

    const user = await selectSelector();
    if (!user) {
      throw new Error("Usuario no encontrado");
    }
    if (!isValidPassword(password, user))
      throw new Error("Contraseña incorrecta");

    return user;
  }

  async getUserById(id) {
    return await userRepository.getUserById(id);
  }

  async searchUsersByUsername(userName) {
    return await userRepository.searchUsersByUsername(userName);
  }
}

export default new UserService();
