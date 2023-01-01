const Task = require("../Models/task");

const getInfo = async (req, res) => {
  try {
    const task = await Task.find({});

    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const createInfo = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const getId = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.find({ _id: taskID });
    if (!task) {
      return res.status(404).send(`There are no task with id: ${taskID}`);
    }
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const updateTask = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndUpdate(
      { _id: taskID },
      { name: req.body.name, completed: req.body.completed }
    );
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: error });
  }
};

const delId = async (req, res) => {
  try {
    const { id: taskID } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskID });
    if (!task) {
      return res.status(404).send(`There are no task with id: ${TaskID}`);
    }
    res.status(201).json({ task });
  } catch (error) {
    res.status(500).json({ msg: `error` });
  }
};

module.exports = {
  getInfo,
  createInfo,
  getId,
  updateTask,
  delId,
};
