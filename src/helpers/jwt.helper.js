import jwt from 'jsonwebtoken';
import { createAccessToken } from '../modals/session/Session.model';
import { setRefreshJWT } from '../modals/user/userModel';

export const createAccessJWT = async ({ _id, email }) => {
  const token = jwt.sign({ email }, process.env.SECRET_ACCESS_JWT, {
    expiresIn: '15m',
  });

  // store in db

  const obj = {
    type: 'accessJWT',
    userId: _id,
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
