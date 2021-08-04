const express = require("express");
const routes = require('./routes/bookmarks');
const db = require("./db");
const app = express();

app.use(routes);

app.listen("1221", () => {
  console.log(`app listening in port 1221`);
});

const init = async () => {
  await db.syncAndSeed();
};

init();
