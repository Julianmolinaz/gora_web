const { app } = require("./app");
const logger = require("./src/libs/logger");  

const PORT = process.env.PORT;

const server = app.listen(PORT, () => {
  logger.info(`Server on port ${PORT}`);
});

module.exports = server;

