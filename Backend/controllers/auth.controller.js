const jwt = require('jsonwebtoken');
const { User } = require('../models');

exports.login = async (req, res) => {
  const { username, password } = req.body;
  const query = {};
  const where = {};

  if (username) {
    where.username = username;
  } else {
    return res.status(401).send({ err: 'Invalid credentials' });
  }

  query.where = where;

  try {
    const user = await User.findOne(query);
    console.log('user', user);
    if (user.password === password) {
      const token = jwt.sign({ id: user.id, rol: user.rol }, process.env.JWT_SECRET);
      return res.send({ token });
    }
    return res.status(401).send({ err: 'Invalid credentials' });
  } catch (err) {
    return res.status(400).send({ err });
  }
};

// No habilitamos la funcion para registrar usuario.
// A los usuarios los crea el administrador desde el ABM de usuarios.
/*
exports.register = async (req, res) => {
  const {
    username, nombre, telefono, email, direccion, password, rol,
  } = req.body;

  try {
    const newUser = await Usuario.create({
      username, nombre, telefono, email, direccion, password, rol,
    });
    res.status(201).send(newUser);
  } catch (err) {
    res.status(400).send({ error: 'Error registrando el usuario' }); // en el futuro mandar solo el error message
  }
};
*/