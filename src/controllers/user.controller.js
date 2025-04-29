import userService from "../services/user.service.js";
import { generateToken } from "../utils/jwt.utils.js";

const normalize = (word) => {
  if (!word) return "";
  const lower = word.trim().toLowerCase();
  return lower;
};
const firstLetterUpper = (word) => {
  if (!word) return "";
  const normalized = normalize(word);
  const result = normalized[0].toUpperCase() + normalized.slice(1);
  return result;
};

class UserController {
  async register(req, res) {
    const {
      first_name,
      last_name,
      userName,
      email,
      phone,
      birth,
      password,
      password2,
      fact,
    } = req.body;

    try {
      if (password !== password2)
        throw new Error("Las contraseñas no coinciden");
      try {
        const newUser = await userService.registerUser({
          first_name: firstLetterUpper(first_name),
          last_name: firstLetterUpper(last_name),
          userName: normalize(userName),
          email: normalize(email),
          phone: phone.trim(),
          birth,
          password,
          fact: fact || "",
          role: "user",
        });

        // generar el nuevo token jwt
        const token = generateToken(newUser);

        // lo mandamos con la cookie
        res.cookie("userCookieToken", token, {
          httpOnly: true,
          secure: true,
          sameSite: "strict",
          maxAge: 1000 * 60 * 60 * 24, //1h
        });
        return res.status(201).json({
          status: "Success",
          data: {
            userID: newUser._id,
            userName: newUser.userName,
            email: newUser.email,
            role: newUser.role,
            fact: newUser.fact,
          },
        });
      } catch (error) {
        return res.status(400).json({
          status: "error",
          message: "Error en la creacion del usuario, " + error,
        });
      }
    } catch (error) {
      return res.status(500).json({
        status: "error",
        message: "Error interno del servidor, " + error,
      });
    }
  }

  /*/////////////////////
        LOGIN
  */ /////////////////////
  async logIn(req, res) {
    const { userName, email, phone, password } = req.body;
    console.log("llega a aca");

    try {
      const userNameFixed = normalize(userName);
      const emailFixed = normalize(email);
      const phoneFixed = phone?.trim() || "";

      const user = await userService.logInUser(
        userNameFixed,
        emailFixed,
        phoneFixed,
        password
      );

      if (!user) throw new Error("Error en las credenciales del usuario");

      // generar el nuevo token jwt
      const token = generateToken(user);

      // lo mandamos con la cookie
      res.cookie("userCookieToken", token, {
        httpOnly: true,
        secure: true,
        sameSite: true,
        maxAge: 1000 * 60 * 60 * 24, //1h
      });
      return res.status(200).json({
        status: "Success",
        data: {
          userID: user._id,
          userName: user.userName,
          email: user.email,
          role: user.role,
          fact: user.fact,
        },
      });
    } catch (error) {
      if (error.message === "Contraseña incorrecta")
        return res
          .status(401)
          .json({ status: "error", message: "Contraseña incorrecta" });
      if (error.message === "Usuario no encontrado")
        return res
          .status(404)
          .json({ status: "error", message: "Usuario no encontrado" });

      return res.status(500).json({
        status: "error",
        message: "Error interno del servidor " + error.message,
      });
    }
  }

  /*/////////////////////
        CURRENT
  */ /////////////////////
  async getCurrent(req, res) {
    try {
      const userData = await req.user;

      return res.status(200).json({
        status: "Success",
        data: userData,
      });
    } catch (error) {
      return res.status(500).json({
        status: "Error",
        message: "Error getting current session",
      });
    }
  }

  /*/////////////////////
        LOGOUT
  */ /////////////////////
  async logOut(req, res) {
    res.clearCookie("userCookieToken", {
      httpOnly: true,
      secure: true,
      sameSite: true,
      path: "/",
    });

    return res.status(200).json({
      status: "Success",
      message: "Logged out successfully",
    });
  }

  async searchUsers(req, res) {
    try {
      const userName = req.query.username;

      const users = await userService.searchUsersByUsername(userName);

      res.status(200).json({
        status: "Success",
        data: users,
      });
    } catch (error) {
      console.log("error, ", error);

      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
  async searchUserById(req, res) {
    try {
      const { userId } = req.params;

      const user = await userService.getUserById(userId);

      res.status(200).json({
        status: "Success",
        data: user,
      });
    } catch (error) {
      console.log("error, ", error);

      res.status(500).json({
        success: false,
        error: error.message,
      });
    }
  }
}

export default UserController;
