const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) return res.status(401).send({ err: 'Se debe prover un header \'Authorization\' con el formato: \'Bearer <Token>\'' });

    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded) {
      req.auth = decoded;
      return next();
    }

    return res.status(401).json({ err: 'Token invalido' });
  } catch (err) {
    return res.status(401).send({ err: 'Token invalido. Debe proverse con el formato: "Bearer <token>"' });
  }
};
