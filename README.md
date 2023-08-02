# Climate Change API

## Introduction

The Climate Change API is a web application that provides access to climate change articles from various reputable news sources. It utilizes web scraping techniques to gather information on climate change topics from popular news websites and presents them in a structured format.

## How it Works

The API performs the following steps to fetch climate change articles:

1. It maintains a list of reputable news websites known for their coverage of climate change issues.

2. Using the Axios library, the API makes HTTP requests to the websites to fetch the HTML content.

3. Cheerio, a powerful library, is used to parse the HTML and extract relevant article information such as title and URL.

4. The API then aggregates the articles from different sources and provides them in a single JSON response.

## Endpoints

The API provides the following endpoints:

1. `GET /news`: Retrieves a list of climate change articles from various news sources.

2. `GET /news/:newsId`: Fetches specific climate change articles from a particular news source.

## How to Use

To get a list of climate change articles from different sources, make a GET request to the `/news` endpoint:

```bash
curl https://example.com/news
```

To retrieve specific articles from a particular news source, use the `/news/:newsId` endpoint, replacing `:newsId` with the name of the news source:

```bash
curl https://example.com/news/thetimes
```

## Sample Response

The API response will be in JSON format and will contain an array of climate change articles with each article having a title, URL, and source name:

```json
{
  "articles": [
    {
      "title": "Climate Change and Its Impact on Biodiversity",
      "url": "https://example.com/article/123",
      "source": "thetimes"
    },
    {
      "title": "The Role of Renewable Energy in Combating Climate Change",
      "url": "https://example.com/article/456",
      "source": "guardian"
    },
    {
      "title": "Addressing Climate Change Challenges in the 21st Century",
      "url": "https://example.com/article/789",
      "source": "nyt"
    }
    // More articles...
  ]
}
```

## Contributions

Contributions to the Climate Change API project are welcome! If you find any bugs or want to add more features, feel free to create a pull request.

## Disclaimer

The information provided by the Climate Change API is for informational purposes only. The articles are sourced from external websites, and the API does not guarantee the accuracy or reliability of the content. Users are encouraged to verify information independently.

## Contact

For any inquiries or feedback, please reach out to Gerald Kamau at kamaugerald36@gmail.com

---

*This project was created by Gerald Kamau as part of a personal project*
