const jwt = require("jsonwebtoken");
require("dotenv-safe").config();
const { autenticaUsuarioDB } = require("../usecases/segurancaUseCases");

const login = async (req, res) => {
  try {
    const usuario = await autenticaUsuarioDB(req.body);

    const token = jwt.sign({ usuario }, process.env.SECRET, {
      expiresIn: 300,
    });

    return res.json({ auth: true, token });
  } catch (err) {
    return res.status(401).json({ auth: false, message: err });
  }
};

const verificarJWT = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(401).json({
      auth: false,
      message: "Nenhum token recebido",
    });
  }

  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if (err) {
      return res.status(401).json({
        auth: false,
        message: "Erro ao validar o token",
      });
    }

    req.usuario = decoded.usuario;
    next();
  });
};

module.exports = { login, verificarJWT };
