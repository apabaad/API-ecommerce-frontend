import express from 'express';
import { getCategories } from '../modals/categoryModal.js';

const Router = express();

// get categories
Router.get('/', async (req, res) => {
  try {
    const categories = await getCategories();
    res.json({
      status: 'success',
      message: 'request success',
      categories,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      status: 'error',
      message: 'Error, Unable to fetch categories',
    });
  }
});

export default Router;
