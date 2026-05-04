import jwt from 'jsonwebtoken';

// Generates a JSON Web Token securely encoding the user ID and role
const generateToken = (id, role) => {
  return jwt.sign({ id, role }, process.env.JWT_SECRET || 'secretkey', {
    expiresIn: '30d',
  });
};

export default generateToken;
