import categorySchema from './categorySchema.js';

export const getCategories = () => {
  return categorySchema.find();
};
