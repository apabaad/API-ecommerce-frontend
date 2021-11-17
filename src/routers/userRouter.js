import express from 'express';
import { createUser, findUserByEmail } from '../modals/user/userModel.js';
import { newFormValidation } from '../middlewares/validation.middleware.js';
const Router = express.Router();

Router.post('/', newFormValidation, async (req, res) => {
  try {
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
  const { email, password } = req.body;
  try {
    const result = await findUserByEmail(email);

    if (result) {
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
    res.json({
      status: 'error',
      message: 'Failed to login',
    });
  }
});
export default Router;
