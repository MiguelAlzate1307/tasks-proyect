import db from "../db.js";

const User = {};

User.register = async (userData) => {
  try {
    const [userId] = await db.query("INSERT INTO users SET ?", [userData]);

    return userId.insertId;
  } catch (error) {
    return new Error(error.message);
  }
};

User.login = async (email) => {
  try {
    const [user] = await db.query("SELECT * FROM users WHERE email = ?", [
      email,
    ]);

    return user;
  } catch (error) {
    return new Error(error.message);
  }
};

User.updateData = async (newData, id) => {
  try {
    const [result] = await db.query("UPDATE users SET ? WHERE id = ?", [
      newData,
      id,
    ]);

    return result;
  } catch (error) {
    return new Error(error.message);
  }
};

User.findById = async (id) => {
  try {
    const [user] = await db.query("SELECT * FROM users WHERE id = ?", [id]);

    return user;
  } catch (error) {
    return new Error(error.message);
  }
};

export default User;
