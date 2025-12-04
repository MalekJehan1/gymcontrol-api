module.exports = function professorMiddleware(req, res, next) {
  console.log("Professor Middleware:", req.user);
  if (
    req.user.usuario.tipo !== "professor" &&
    req.user.usuario.tipo !== "admin"
  ) {
    return res
      .status(403)
      .json({ message: "Acesso permitido apenas para professores." });
  }
  next();
};
