import jwt from 'jsonwebtoken';

const jwtSecret = process.env.JWT_SECRET;

const expiresIn = 1000 * 60 * 60 * 24 * 2; // 2 days

export const signPayload = payload => {
  return jwt.sign(payload, jwtSecret, { expiresIn });
};

export const verifyToken = token => {
  return jwt.verify(token, jwtSecret);
};
