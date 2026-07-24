const jwt = require('jsonwebtoken');

const protect = (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];

      // Handle Instant Demo / Recruiter Bypass
      if (token === 'demo-jwt-token-12345') {
        req.user = {
          _id: 'demo-recruiter-id',
          name: 'Demo Recruiter',
          email: 'recruiter@demo.com',
        };
        return next();
      }

      // Verify real signed JWTs
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      req.user = decoded;
      next();
    } catch (error) {
      console.error('JWT Verification Failed:', error.message);
      return res.status(401).json({ message: 'Not authorized, token failed' });
    }
  } else {
    return res.status(401).json({ message: 'Not authorized, no token' });
  }
};

module.exports = { protect };