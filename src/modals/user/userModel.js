import userSchema from './userSchema.js';

export const createUser = (newUser) => {
  try {
    const result = userSchema(newUser).save();
    return result;
  } catch (error) {
    throw new Error(error);
  }
};

export const findUserByEmail = (email) => {
  return userSchema.findOne({ email }); //{email} because mongodb always takes parameter as an object. just email wont work.
};
