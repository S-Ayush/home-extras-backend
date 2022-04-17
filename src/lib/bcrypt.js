import bcrypt from 'bcryptjs';

export const hashString = async rawString => {
  const salt = await bcrypt.genSalt();
  return bcrypt.hash(rawString, salt);
};

export const compareHash = async (rawString, hashed) => {
  return bcrypt.compare(rawString, hashed);
};
