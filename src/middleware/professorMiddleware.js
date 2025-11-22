module.exports = function professorMiddleware(req, res, next) {
  if (req.user.tipo !== 'professor' && req.user.tipo !== 'admin') {
    return res.status(403).json({ message: 'Acesso permitido apenas para professores.' });
  }
  next();
};
