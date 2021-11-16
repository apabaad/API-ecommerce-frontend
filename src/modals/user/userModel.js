import userSchema from './userSchema.js';

export const createUser = (newUser) => {
  try {
    const result = userSchema(newUser).save();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};
