import Tasks from "../models/Tasks.model.js";

export const createTask = async (req, res) => {
  try {
    const taskData = {
      user_id: req.user.id,
      title: req.body.title,
      description: req.body.description,
    };

    const taskId = await Tasks.createTask(taskData);

    if (taskId instanceof Error)
      return res
        .status(500)
        .json({ message: "Error al crear la tarea", error: taskId.message });

    return res.json({
      id: taskId,
      user_id: req.user.id,
      title: req.body.title,
      description: req.body.description,
      done: 0,
      createdAt: new Date().toLocaleDateString("es-co", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
      updatedAt: new Date().toLocaleDateString("es-co", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al registrar la tarea", error: error.message });
  }
};

export const getTasks = async (req, res) => {
  try {
    const tasks = await Tasks.getTasks(req.user.id);

    if (tasks instanceof Error)
      return res.status(500).json({
        message: "Error al recuperar las tareas",
        error: tasks.message,
      });
    else if (tasks.length === 0)
      return res.status(404).json({ message: "Aún no hay tareas creadas" });

    return res.json(tasks);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al recuperar las tareas", error: error.message });
  }
};

export const getTask = async (req, res) => {
  try {
    const task = await Tasks.getTask(req.params.id);

    if (task instanceof Error)
      return res
        .status(500)
        .json({ message: "Error al recuperar la tarea", error: task.message });
    else if (task.length === 0)
      return res.status(404).json({ message: "Tarea no encontrada" });
    else if (task[0].user_id !== req.user.id)
      return res
        .status(401)
        .json({ message: "Esta tarea le pertenece a otro usuario" });

    return res.json(task[0]);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al obtener la tarea", error: error.message });
  }
};

export const updateTask = async (req, res) => {
  try {
    const task = await Tasks.getTask(req.params.id);

    if (task instanceof Error)
      return res
        .status(500)
        .json({ message: "Error al recuperar la tarea", error: task.message });
    else if (task.length === 0)
      return res.status(404).json({ message: "Tarea no encontrada" });
    else if (task[0].user_id !== req.user.id)
      return res
        .status(401)
        .json({ message: "Esta tarea le pertenece a otro usuario" });

    const result = await Tasks.updateTask(req.body, req.params.id);

    if (result instanceof Error)
      return res.status(500).json({
        message: "Error al actualizar la tarea",
        error: result.message,
      });

    return res.json({
      id: task[0].id,
      user_id: task[0].user_id,
      title: req.body.title ? req.body.title : task[0].title,
      description: req.body.description
        ? req.body.description
        : task[0].description,
      done: task[0].done,
      createdAt: task[0].createdAt,
      updatedAt: new Date().toLocaleDateString("es-co", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      }),
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al actualizar la tarea", error: error.message });
  }
};

export const deleteTask = async (req, res) => {
  try {
    const task = await Tasks.getTask(req.params.id);

    if (task instanceof Error)
      return res
        .status(500)
        .json({ message: "Error al recuperar la tarea", error: task.message });
    else if (task.length === 0)
      return res.status(404).json({ message: "Tarea no encontrada" });
    else if (task[0].user_id !== req.user.id)
      return res
        .status(401)
        .json({ message: "Esta tarea le pertenece a otro usuario" });

    const result = await Tasks.deleteTask(req.params.id);

    if (result instanceof Error)
      return res
        .status(500)
        .json({ message: "Error al eliminar la tarea", error: result.message });

    return res.sendStatus(200);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error al eliminar la tarea", error: error.message });
  }
};
