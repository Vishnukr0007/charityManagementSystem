const jwt = require('jsonwebtoken');

const authMiddleware = ({ req }) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
      // Pass the user info into the context
      return { user: decoded };
    } catch (error) {
      console.error('Token verification failed:', error.message);
    }
  }
  
  return { user: null };
};

module.exports = authMiddleware;
