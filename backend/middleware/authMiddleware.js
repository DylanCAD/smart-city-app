const jwt = require('jsonwebtoken');
const secret = "votre_clé_secrète"; // identique à authController

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.sendStatus(401);

  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, secret);
    req.user = decoded;
    next();
  } catch {
    res.sendStatus(403);
  }
};

module.exports = authenticate;
