import db from "../db.js";

const Tasks = {};

Tasks.createTask = async (taskData) => {
  try {
    const [taskId] = await db.query("INSERT INTO tasks SET ?", [taskData]);

    return taskId.insertId;
  } catch (error) {
    return new Error(error.message);
  }
};

Tasks.getTasks = async (userId) => {
  try {
    const [tasks] = await db.query("SELECT * FROM tasks WHERE user_id = ?", [
      userId,
    ]);

    return tasks;
  } catch (error) {
    return new Error(error.message);
  }
};

Tasks.getTask = async (id) => {
  try {
    const [task] = await db.query("SELECT * FROM tasks WHERE id = ?", [id]);

    return task;
  } catch (error) {
    return new Error(error.message);
  }
};

Tasks.updateTask = async (newTaskData, id) => {
  try {
    const [result] = await db.query("UPDATE tasks SET ? WHERE id = ?", [
      newTaskData,
      id,
    ]);

    return result;
  } catch (error) {
    return new Error(error.message);
  }
};

Tasks.deleteTask = async (id) => {
  try {
    const [result] = await db.query("DELETE FROM tasks WHERE id = ?", [id]);

    return result;
  } catch (error) {
    return new Error(error.message);
  }
};

export default Tasks;
