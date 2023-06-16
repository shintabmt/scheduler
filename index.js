const { exec } = require("child_process");
const express = require("express");
const cron = require("node-cron");
const startServer = () => {
  try {
    const app = express();
    server = app.listen(8080, () => {
      console.debug(` Started at server`);
    });
  } catch (e) {}
};
cron.schedule("0 1,12 * * *", function () {
  console.debug("on schedule restart db at ", new Date());
  restartDbService();
});
startServer();

const restartDbService = () => {
  exec("service mysql restart", (error, stdout, stderr) => {
    if (error) {
      console.log(`error: ${error.message}`);
      return;
    }
    if (stderr) {
      console.log(`stderr: ${stderr}`);
      return;
    }
    console.log(`stdout: ${stdout}`);
  });
};
