const { app } = require("./app");

const PORT = process.env.PORT;
const HOST = process.env.HOST;

const server = app.listen(PORT, HOST, () => {
  console.log(`Server on port ${PORT}`);
});

module.exports = server;

