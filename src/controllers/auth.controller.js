const Login = require("../services/auth/login");

class AuthController {
  static async login(req, res) {
    try {
      const data = req.body;
      const login = new Login(data);
      const token = await login.exec();

      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        })
        .status(200)
        .json({
          error: null,
          data: { token }
        });
    } catch (error) {
      return res.json({ error });
    }
  }
}

module.exports = AuthController;
