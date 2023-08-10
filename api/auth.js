const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const auth = require('../middleware/auth');

const User = require('../model/user');

router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.id);

    res.status(200).json(user);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post(
  '/login',
  async (req, res) => {
    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });

      if (!user) {
        return res
          .status(403)
          .json({ message: 'Credentials not matching.' });
      }

      const isMatch = await bcrypt.compare(password, user.password);

      if (!isMatch) {
        return res
          .status(403)
          .json({ message: 'Credentials not matching.' });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(
        payload,
        process.env.jwtSecret,
        (err, token) => {
          if (err) throw err;
          res
          .cookie("token", token, { httpOnly: true })
          .send(user);
        }
      );
    } catch (err) {
      res.status(500).send(err);
    }
  }
);

router.post(
    '/createUser',
      async (req, res) => {
        const { email, password } = req.body;

        try {
        let user = await User.findOne({ email });

        if (user) {
          return res
            .status(401)
            .json({ message: 'User already exists' });
        }

        user = new User({
          email,
          password,
        });

        const salt = await bcrypt.genSalt(10);

        user.password = await bcrypt.hash(password, salt);

        await user.save();

        res.status(200).json({ msg: 'User created successfully.' });
      } catch (err) {
        res.status(500).send(err);
      }
    }
  );

router.get(
    '/logout', async (req, res, next) => {
    res.clearCookie("token");
    res.status(200).send({ success: true });
});

module.exports = router;
