const jwt = require("jsonwebtoken");

const verifyToken = (req, res, next) => {

  if (!req.header("Authorization")) {
    return res
      .status(401)
      .json({ error: "Acceso denegado" });
  }

  try {
    const token = req.header("Authorization").split(" ")[1];
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    req.user = verified;
    next();
  } catch (error) {
    res
      .status(400)
      .json({ error: "Token no es válido" });
  }
}

module.exports = verifyToken;
