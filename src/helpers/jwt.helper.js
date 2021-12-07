import jwt from 'jsonwebtoken';
import { createAccessToken } from '../modals/session/Session.model.js';
import { setRefreshJWT } from '../modals/user/userModel.js';

export const createAccessJWT = async ({ _id, email }) => {
  const token = jwt.sign({ email }, process.env.SECRET_ACCESS_JWT, {
    expiresIn: '15m',
  });

  // store in db

  const obj = {
    type: 'accessJWT',
    UserId: _id,
    token,
  };

  const result = await createAccessToken(obj);
  if (result?._id) {
    return token;
  }
  return false;
};

export const createRefreshJWT = async ({ _id, email }) => {
  const token = jwt.sign({ email }, process.env.SECRET_REFRESH_JWT, {
    expiresIn: '30d',
  });
  const result = await setRefreshJWT(_id, token);
  if (result) {
    return token;
  }
  return false;
};

export const verifyRefreshJWT = (refreshJWT) => {
  try {
    return jwt.verify(refreshJWT, process.env.SECRET_REFRESH_JWT);
  } catch (error) {
    console.log(error);
    return false;
  }
};

export const getJWTs = async (userObj) => {
  const accessJWT = await createAccessJWT(userObj);
  const refreshJWT = await createRefreshJWT(userObj);
  return { accessJWT, refreshJWT };
};
