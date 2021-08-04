const db = require("./db.js");
const express = require("express");

const app = express();

app.listen("1221", () => {
  console.log(`app listening in port 1221`);
});

app.get("/", (req, res, next) => {
  res.redirect("/bookmarks");
});

app.get("/bookmarks", async (req, res, next) => {
  const bookmarks = await db.Bookmark.findAll();
  const categoryCounts = bookmarks.reduce((acc, val) => {
    acc[val.category] = acc[val.category] || 0;
    acc[val.category]++;
    return acc;
  }, {});
  const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
        <ul>
        ${Object.entries(categoryCounts)
          .map(
            (cat) => `
        <li>
        <a href='/bookmarks/${cat[0]}'> 
            ${cat[0].charAt(0).toUpperCase() + cat[0].slice(1)} (${cat[1]})
        </a>
        </li>`
          )
          .join("")}
        </ul>
    </body>
    </html>`;
  try {
    res.send(html);
  } catch (err) {
    next(err);
  }
});

app.get("/bookmarks/:cat", async (req, res, next) => {
  const cat = req.params.cat;
  const links = await db.Bookmark.findAll({
    where: { category: cat },
  });
  const categoryCounts = links.reduce((acc, val) => {
    acc[val.category] = acc[val.category] || 0;
    acc[val.category]++;
    return acc;
  }, {});
  const html = `<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Document</title>
    </head>
    <body>
    <button><a href='../'>BACK TO BOOKMARKS</a></button>
    <h1> 
    ${Object.entries(categoryCounts)
      .map(
        (cat) => `
          ${cat[0].charAt(0).toUpperCase() + cat[0].slice(1)} (${cat[1]})`
      )
      .join("")}
    </h1>
    <ul>
        ${links
          .map(
            (link) =>
              `<li><a href=${link.URL} target="_blank" rel="noopener noreferrer">${link.name}</a></li>`
          )
          .join("")}
    </ul>
    </body>
    </html>`;
  try {
    res.send(html);
  } catch (err) {
    next(err);
  }
});

const init = async () => {
  await db.syncAndSeed();
};

init();
