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
  return userSchema.findOne({ email }); //{email} because to find, mongodb always takes parameter as an object. just email wont work.
};

export const getUserById = (_id) => {
  return userSchema.findById(_id);
};
export const getUser = (filter) => {
  return userSchema.findOne({ filter });
};

export const setRefreshJWT = (_id, refreshJWT) => {
  return userSchema.findOneAndUpdate(_id, { refreshJWT });
};
