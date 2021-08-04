const Sequelize = require("sequelize");
const { STRING } = Sequelize;
const conn = new Sequelize(
  process.env.DATABASE_URL || "postgres://localhost/acme_bookmarks_db"
);

const data = [
  {
    name: "LinkedIn",
    URL: "http://www.linkedin.com",
    category: "jobs",
  },
  {
    name: "Indeed",
    URL: "http://www.indeed.com",
    category: "jobs",
  },
  {
    name: "Amazon",
    URL: "http://www.amazon.com",
    category: "shopping",
  },
  {
    name: "W3C Shools - Javascript",
    URL: "https://www.w3schools.com/jsref/default.asp",
    category: "coding",
  },
  {
    name: "Target",
    URL: "http://www.shopping.com",
    category: "shopping",
  },
  {
    name: "The Weeknd",
    URL: "https://www.theweeknd.com/",
    category: "music",
  },
  {
    name: "Stack Overflow",
    URL: "https://stackoverflow.com/",
    category: "coding",
  },
];

const Bookmark = conn.define("bookmark", {
  name: Sequelize.STRING,
  URL: Sequelize.STRING,
  category: Sequelize.STRING,
});

async function syncAndSeed() {
  const bookmarks = await Bookmark.sync();
  await Bookmark.destroy({
    truncate: true,
  });
  for (let d of data) {
    const bookmark = await Bookmark.create(d);
  }
}

module.exports = {
  syncAndSeed,
  Bookmark,
};
