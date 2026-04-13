const jwt = require('jsonwebtoken');

// Verify that the request includes a valid JWT before continuing.
const authenticateToken = (req, res, next) => {
    // Read the Authorization header and make sure it uses the Bearer format.
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        return res.status(401).json({ message: 'Authentication token required' });
    }

    // Extract the token value and verify it with the app secret.
    const token = authHeader.split(' ')[1];
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
        return res.status(500).json({ message: 'JWT secret is not configured' });
    }

    jwt.verify(token, jwtSecret, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid or expired token' });
        }

        req.user = decoded;
        next();
    });
};

// Allow only users with an admin role to access protected actions.
const isAdmin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        return next();
    }

    return res.status(403).json({ message: 'Admin access required' });
};

module.exports = { authenticateToken, isAdmin };
