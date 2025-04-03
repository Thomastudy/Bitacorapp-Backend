import UserModel from "../users.model.js";

class UserDao {
  async findById(id) {
    return await UserModel.findById(id);
  }

  async findOne(query) {
    return await UserModel.findOne(query);
  }

  async save(userData) {
    const user = new UserModel(userData);
    return await user.save();
  }

  async searchUsersByUserName(userData) {
    const searchRegex = new RegExp(`.*${userData.userName}.*`, "i");
    const users = await UserModel.find({
      userName: searchRegex,
    })
      .select("userName first_name last_name")
      .limit(10);

    return users;
  }
}

export default new UserDao();
