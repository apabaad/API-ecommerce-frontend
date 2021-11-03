import productSchema from './productSchema.js';

export const getProducts = () => {
  return productSchema.find();
};
