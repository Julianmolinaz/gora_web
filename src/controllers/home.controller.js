class HomeController {
  static index(req, res) {
    return res.render("home/index.html");
  }
}

module.exports = HomeController;
