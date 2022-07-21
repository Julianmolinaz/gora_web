const { app } = require("./app");

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  console.log(`Server on port ${PORT}`);
});

module.exports = server;

