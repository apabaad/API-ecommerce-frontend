import express from 'express';
import { createUser } from '../modals/user/userModel.js';
// import { newFormValidation } from '../middlewares/validation.middleware.js';
const Router = express.Router();

Router.post('/', async (req, res) => {
  try {
    console.log(req.body);
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

export default Router;
