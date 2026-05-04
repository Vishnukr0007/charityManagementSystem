import jwt from 'jsonwebtoken';
import { AuthAccount } from '../models/index.js';

// Middleware to verify JWT and attach decoded user to context
const authMiddleware = async ({ req }) => {
  let token;
  
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'secretkey');
      
      // Verification check: ensure account is still ACTIVE
      // We assume the token contains { id: ref_id, role: role }
      // To properly check account_status, we need to find the AuthAccount
      const account = await AuthAccount.findOne({ 
        where: { ref_id: decoded.id, role: decoded.role } 
      });

      if (!account || account.account_status !== 'ACTIVE') {
        return { user: null };
      }

      // Pass the user info into the context
      return { user: decoded };
    } catch (error) {
      console.error('Token verification failed:', error.message);
    }
  }
  
  return { user: null };
};

export default authMiddleware;
