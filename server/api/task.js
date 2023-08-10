const express = require('express');
const router = express.Router();

const auth = require('../../middleware/auth');

const Task = require('../../model/Task');

router.get('/getTask', auth, async (req, res) => {
  try {
    const task = await Task.find({ userId: req.id });

    res.status(200).json({  task });
  } catch (err) {
    res.status(505).send(err);
  }
});

router.post(
  '/createTask',
  auth,
  async (req, res) => {
    const { name,
      department,
      workingHours } = req.body;

    try {
        const task = new Task({
            userId: req.id,
            name,
            department,
            workingHours
        });

        await task.save();

        res.status(200).json({ message: 'Task Created Succesfully' });
    } catch (err) {
      console.log(err)
        res.status(505).send(err);
    }
  }
);

router.post(
    '/updateTask',
    auth,
    async (req, res) => {
      const { taskId, name,
        Department,
        workingHours } = req.body;

      try {
        const task = await Task.findOneAndUpdate({
            _id: taskId
        },
        {
          name,
          Department,
          workingHours
        }, { new: true });

        res.status(200).json({ message: 'Task Updated Successfully' });
      } catch (err) {
          res.status(505).send(err);
      }
    }
);

router.delete(
    '/deleteTask/:taskId',
    auth,
    async (req, res) => {
      const { taskId } = req.params;

      try {
        await Task.findOneAndDelete({ _id: taskId});

        res.status(200).json({ message: 'Task Deleted Succesfully' });
      } catch (err) {
          res.status(505).send(err);
      }
    }
);

module.exports = router;
