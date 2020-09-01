const { AuthenticationError } = require('apollo-server');

const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../config');

module.exports = (context) => {
  // context = { ... headers }
  const authHeader = context.req.headers.authorization;
  if (authHeader) {
    // Bearer ....
    const token = authHeader.split('bearer ')[1];
    if (token) {
      try {
        const user = jwt.verify(token, JWT_SECRET);
        return user;
      } catch (err) {
        throw new AuthenticationError('Invalid/Expired token');
      }
    }
    throw new Error("Authentication token must be 'Bearer [token]");
  }
  throw new Error('Authorization header must be provided');
};