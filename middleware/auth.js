const jwt = require('jsonwebtoken');

const authenticate = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).json({ error: 'No token provided!' });

    const token = authHeader.split(' ')[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ error: 'Invalid token!' });
    }
};

const authorize = (role) => (req, res, next) => {
    if (req.user.role !== role) return res.status(403).json({ error: 'Access denied!' });
    next();
};

module.exports = { authenticate, authorize };