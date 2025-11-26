import express from 'express';
import {Student} from '../models/student.js';

const router = express.Router();

router.get('/degree', async (req, res, next) => {
  const {name} = req.query;
  if (!name) {
    return res.status(400).send('Missing parameter: name');
  }

  try {
    const students = await Student.find({name});
    if (students.length === 0) {
      return res.status(404).send('No such student');
    }
    if (students.length > 1) {
      return res
        .status(400)
        .send(
          'There are multiple students with the same name. Please provide an email address instead.'
        );
    }

    const student = students[0];
    return res.send(`${student.name} : ${student.degree}`);
  } catch (err) {
    next(err);
  }
});
router.get('/email', async (req, res, next) => {
  const {name} = req.query;
  if (!name) {
    return res.status(400).send('Missing parameter: name');
  }

  try {
    const students = await Student.find({name});
    if (students.length === 0) {
      return res.status(404).send('No such student');
    }
    if (students.length > 1) {
      return res
        .status(400)
        .send(
          'There are multiple students with the same name. Please contact the administrator by phone.'
        );
    }
    const student = students[0];
    return res.send(`${student.name} : ${student.email}`);
  } catch (err) {
    next(err);
  }
});
router.get('/stat', async (req, res, next) => {
  const {degree} = req.query;

  if (!degree) {
    return res.status(400).send('Missing parameter: degree');
  }

  try {
    const count = await Student.countDocuments({degree});
    const label = degree === 'Master' ? "Master's" : degree;
    return res.send(`Number of ${label} student : ${count}`);
  } catch (err) {
    next(err);
  }
});
router.put('/register', async (req, res, next) => {
  const name = req.query.name || req.body.name;
  const email = req.query.email || req.body.email;
  const graduationRaw = req.query.graduation || req.body.graduation;
  const graduation = parseInt(graduationRaw, 10);

  if (!name || !email || Number.isNaN(graduation)) {
    return res
      .status(400)
      .send('Missing parameter(s): name, email, graduation');
  }

  try {
    const exists = await Student.findOne({email});
    if (exists) {
      return res.send('Already registered');
    }

    const last = await Student.findOne().sort({sid: -1}).lean();
    const nextSid = last ? last.sid + 1 : 1;

    await Student.create({
      sid: nextSid,
      name,
      email,
      degree: 'Unknown',
      graduation,
    });

    return res.send('Registration successful');
  } catch (err) {
    next(err);
  }
});

export default router;
