class HomeController {
  static index(req, res) {
	  console.log('inicio');
    return res.render("inicio/index.html");
  }
}

module.exports = HomeController;
