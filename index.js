const PORT = process.env.PORT || 8000;
const express = require("express");
const cheerio = require("cheerio");
const axios = require("axios");

const app = express();

const newspapers = [
  {
    name: "cityam",
    address:
      "https://www.cityam.com/london-must-become-a-world-leader-on-climate-change-action/",
  },
  {
    name: "thetimes",
    address: "https://www.thetimes.co.uk/environment/climate-change",
  },

  {
    name: "telegraph",
    address: "https://www.telegraph.co.uk/climate-change",
  },
  {
    name: "nyt",
    address: "https://www.nytimes.com/international/section/climate",
  },
  {
    name: "latimes",
    address: "https://www.latimes.com/environment",
  },
  {
    name: "smh",
    address: "https://www.smh.com.au/environment/climate-change",
  },
  {
    name: "bbc",
    address: "https://www.bbc.co.uk/news/science_and_environment",
  },
  {
    name: "es",
    address: "https://www.standard.co.uk/topic/climate-change",
  },
  {
    name: "sun",
    address: "https://www.thesun.co.uk/topic/climate-change-environment/",
  },
];

const fetchArticles = async () => {
  const articlesPromises = newspapers.map(async (newspaper) => {
    const response = await axios.get(newspaper.address);
    const html = response.data;
    const $ = cheerio.load(html);

    const articles = [];
    $(`a:contains("climate")`, html).each(function () {
      const title = $(this).text();
      const refinedUrl = $(this).attr("href");
      const combineUrl = new URL(refinedUrl, newspaper.address);
      articles.push({
        title,
        address: combineUrl.toString(),
        name: newspaper.name,
      });
    });
    return articles;
  });

  const allArticles = await Promise.all(articlesPromises);
  return allArticles.flat();
};

const fetchSpecificArticles = async (newsId) => {
  const newspaper = newspapers.find((n) => n.name === newsId);
  if (!newspaper) {
    throw new Error("The source does not exist");
  }

  const response = await axios.get(newspaper.address);
  const html = response.data;
  const $ = cheerio.load(html);

  const articles = [];
  $(`a:contains("climate")`, html).each(function () {
    const title = $(this).text();
    const refinedUrl = $(this).attr("href");
    const combineUrl = new URL(refinedUrl, newspaper.address);
    articles.push({
      title,
      address: combineUrl.toString(),
      name: newspaper.name,
    });
  });

  return articles;
};

app.get("/", (req, res) => {
  res.json("Welcome to my climate change api. Navigate to /news to get started!");
});

app.get("/news", async (req, res) => {
  try {
    const articles = await fetchArticles();
    res.json(articles);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "The fetch request did not go through" });
  }
});

app.get("/news/:newsId", async (req, res) => {
  const newsId = req.params.newsId;
  try {
    const articles = await fetchSpecificArticles(newsId);
    res.json(articles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "The source does not exist" });
  }
});

app.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
