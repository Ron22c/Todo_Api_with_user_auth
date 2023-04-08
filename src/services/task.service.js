import Task from "../database/models/task.model.js";

export const create = async (req) => {
  const task = new Task({
    ...req.body,
    owner: req.user._id,
  });
  await task.save();

  return task;
};

export const getTasks = async (req) => {
  // setup a query string
  const match = {};
  const sort = {};
  if (req.query.completed) {
    match.completed = req.query.completed === "true";
  }

  if (req.query.sortBy) {
    const [by, method] = req.query.sortBy.split(":");
    sort[by] = method === "asc" ? 1 : -1;
  }

  // const tasks = await Task.find({ owner: req.user._id })
  await req.user.populate({
    path: "tasks",
    match,
    options: {
      limit: +req.query.limit,
      skip: +req.query.skip,
      sort,
    },
  });

  return req.user.tasks;
};

export const getTaskById = async (req) => {
  const { id } = req.params;
  const task = await Task.findOne({ _id: id, owner: req.user._id });

  return task;
};

export const updateTaskById = async (req) => {
  const validProps = ["description", "completed"];
  const reqProps = Object.keys(req.body);
  // const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true })
  const task = await Task.findOne({ _id: req.params.id, owner: req.user._id });

  if (!task) return;

  for (const reqProp of reqProps) {
    if (!validProps.includes(reqProp)) {
      return res
        .status(400)
        .send({ error: `Invalid task (${reqProp}) property!` });
    }
  }
  for (const reqProp of reqProps) {
    task[reqProp] = req.body[reqProp];
  }

  await task.save();

  return task;
};

export const deleteTaskById = async (req) => {
  const task = await Task.findOneAndDelete({
    _id: req.params.id,
    owner: req.user.id,
  });

  return task;
};
