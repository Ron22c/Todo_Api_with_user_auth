import { taskServices } from "../services/index.js";

export const create = async (req, res) => {
  try {
    const task = await taskServices.create(req);
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send(err);
  }
};

export const get = async (req, res) => {
  try {
    const tasks = await taskServices.getTasks(req);
    res.send(tasks);
  } catch (err) {
    res.status(500).send(err);
  }
};

export const getById = async (req, res) => {
  try {
    const task = await taskServices.getTaskById(req);
    if (!task) return res.status(404).send({ error: "Task not found!" });
    res.send(task);
  } catch (err) {
    if (err.name.includes("CastError"))
      return res.status(404).send({ error: "Task not found!" });
    res.status(500).send(err);
  }
};

export const updateById = async (req, res) => {
  try {
    const task = await taskServices.updateTaskById(req);
    if (!task) return res.status(404).send({ error: "Task not found!" });
    res.send(task);
  } catch (err) {
    if (err.message.includes("ObjectId failed"))
      return res.status(404).send({ error: "Task not found!" });
    if (err.message.includes("Boolean failed"))
      return res.status(400).send({ error: err.message });

    res.status(500).send(err);
  }
};

export const deleteById = async (req, res) => {
  try {
    const task = await taskServices.deleteTaskById(req);
    if (!task) return res.status(404).send({ error: "Task not found!" });
    res.send(task);
  } catch (err) {
    if (err.message.includes("ObjectId failed"))
      return res
        .status(404)
        .send({ error: `Invalid task id (${req.params.id})` });
    res.status(500).send(err);
  }
};
