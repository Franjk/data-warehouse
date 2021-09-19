const authorize = (...roleList) => (req, res, next) => {
  const { id: authId, role } = req.auth;
  const { usuarioId: paramId } = req.params;

  console.log('listaRoles', roleList);
  console.log('data', authId, paramId, role);

  if (role === 'ADMIN') return next();

  if (roleList.includes(role)) {
    return next();
  }

  return res.status(403).send({ error: 'No autorizado' });
};

module.exports = authorize;
