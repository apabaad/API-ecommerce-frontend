import express from 'express';
import { createUser, findUserByEmail } from '../modals/user/userModel.js';
import { newFormValidation } from '../middlewares/validation.middleware.js';
import { hashPassword, verifyPassword } from '../helpers/bcrypt.helper.js';

const Router = express.Router();

Router.post('/', newFormValidation, async (req, res) => {
  try {
    const password = req.body.password;
    const hashedPassword = hashPassword(password);
    req.body.password = hashedPassword;
    const result = await createUser(req.body);

    if (result) {
      return res.json({
        status: 'success',
        message: 'User registered.',
        result,
      });
    }
  } catch (error) {
    console.log(error);
    let msg = 'Error, Unable to create new user';
    if (error.message.includes('E11000 duplicate key error collection')) {
      msg = 'Email already registered';
    }
    res.json({
      status: 'error',
      message: msg,
    });
  }
});

Router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(req.body);

    // find user by email
    const result = await findUserByEmail(email);
    console.log(result);

    if (verifyPassword(password, result.password)) {
      result.password = undefined;
      return res.json({
        status: 'success',
        message: 'login successful',
        result,
      });
    }

    return res.json({
      status: 'error',
      message: 'Authentication Failed',
    });
  } catch (error) {
    console.log(error);
    res.json({
      status: 'error',
      message: 'Failed to login',
    });
  }
});
export default Router;
