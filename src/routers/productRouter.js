import express from 'express';
import { getProducts } from '../modals/productModal.js';

const Router = express();

Router.get('/', async (req, res) => {
  try {
    const products = await getProducts();
    res.json({
      status: 'success',
      message: 'request success',
      products,
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'cannot fetch products',
    });
  }
});

export default Router;
