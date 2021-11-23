import bcrypt from 'bcrypt';

const saltRounds = 10;

export const hashPassword = (plainPassword) => {
  return bcrypt.hashSync(plainPassword, saltRounds);
};

export const verifyPassword = (plainPassword, hashPassFromDB) => {
  return bcrypt.compareSync(plainPassword, hashPassFromDB);
};
