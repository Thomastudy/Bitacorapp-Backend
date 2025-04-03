import boatDao from "../models/DAO/boat.dao.js";
import userDao from "../models/DAO/user.dao.js";

class UserRepository {
  async createUser(userData) {
    return await userDao.save(userData);
  }

  async getUserById(userData) {
    return await userDao.findById(userData);
  }

  async getUserByEmail(email) {
    return await userDao.findOne({ email });
  }

  async getUserByPhone(phone) {
    return await userDao.findOne({ phone });
  }

  async getUserByUserName(userName) {
    return await userDao.findOne({ userName });
  }

  async searchUsersByUsername(userName) {
    return await userDao.searchUsersByUserName({ userName });
  }

 
}

export default new UserRepository();
