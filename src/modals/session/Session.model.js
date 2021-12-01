import SessionSchema from './Session.schema.js';

export const createAccessToken = (sessionObj) => {
  return SessionSchema(sessionObj).save();
};

export const getSession = (filter) => {
  return SessionSchema.findOne(filter);
};
