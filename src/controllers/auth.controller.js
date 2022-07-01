const Login = require("../services/auth/login");

class AuthController {
  static index(req, res) {
    return res.render("auth/login/index.html")
  }

  static async login(req, res) {
    try {
      const data = req.body;
      const login = new Login(data);
      const token = await login.exec();

      return res
        .cookie("access_token", token, {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
        }).status(200).json({ success: true});
    } catch (error) {
      console.error(error);
      return res.json({ success: false });
    }
  }
}

module.exports = AuthController;
