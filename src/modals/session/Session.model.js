import SessionSchema from './Session.schema';

export const createAccessToken = (sessionObj) => {
  return SessionSchema(sessionObj).save();
};

export const getSession = (filter) => {
  return SessionSchema.findOne(filter);
};
