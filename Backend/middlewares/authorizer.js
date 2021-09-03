const authorize = (...listaRoles) => (req, res, next) => {
  const { id: authId, rol } = req.auth;
  const { usuarioId: paramId } = req.params;

  console.log('listaRoles', listaRoles);
  console.log('data', authId, paramId, rol);

  if (rol === 'ADMIN') return next();

  if (listaRoles.includes(rol)) {
    if (!paramId) {
      req.auth.restricted = true;
      return next();
    }
    if (paramId == authId) return next();
  }

  return res.status(403).send({ error: 'No autorizado' });
};

module.exports = authorize;
