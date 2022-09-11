class HomeController {
  static index(req, res) {
    return res.render("inicio/index.html");
  }
}

module.exports = HomeController;
