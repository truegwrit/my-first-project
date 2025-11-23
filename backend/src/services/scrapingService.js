const axios = require('axios');
const cheerio = require('cheerio');
const puppeteer = require('puppeteer');

class ScrapingService {
  constructor() {
    this.userAgent = process.env.USER_AGENT || 'Mozilla/5.0 (compatible; ArtDiscoveryBot/1.0)';
    this.rateLimit = parseInt(process.env.SCRAPING_RATE_LIMIT) || 1000;
    this.lastRequest = 0;
  }

  async rateLimit() {
    const now = Date.now();
    const timeSinceLastRequest = now - this.lastRequest;
    if (timeSinceLastRequest < this.rateLimit) {
      await new Promise(resolve => setTimeout(resolve, this.rateLimit - timeSinceLastRequest));
    }
    this.lastRequest = Date.now();
  }

  async scrapeWithCheerio(url) {
    await this.rateLimit();

    try {
      const response = await axios.get(url, {
        headers: {
          'User-Agent': this.userAgent
        },
        timeout: 10000
      });

      return cheerio.load(response.data);
    } catch (error) {
      console.error(`Cheerio scraping failed for ${url}:`, error.message);
      throw error;
    }
  }

  async scrapeWithPuppeteer(url) {
    await this.rateLimit();

    let browser;
    try {
      browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
      });

      const page = await browser.newPage();
      await page.setUserAgent(this.userAgent);
      await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });

      const content = await page.content();
      await browser.close();

      return cheerio.load(content);
    } catch (error) {
      if (browser) await browser.close();
      console.error(`Puppeteer scraping failed for ${url}:`, error.message);
      throw error;
    }
  }

  // Example scrapers for different art types
  async scrapeArtwork(searchQuery) {
    // This is a placeholder - you'll need to implement actual scraping
    // based on specific art websites (e.g., museum sites, art databases)
    console.log(`Scraping artwork for: ${searchQuery}`);

    return {
      type: 'artwork',
      title: 'Example Artwork',
      creator: 'Example Artist',
      description: 'This is a placeholder for scraped artwork data',
      imageUrl: null,
      externalUrl: null,
      metadata: { searchQuery }
    };
  }

  async scrapeFilmData(title) {
    // Placeholder for film scraping (could use IMDb, TMDb, etc.)
    console.log(`Scraping film data for: ${title}`);

    return {
      type: 'film',
      title: title,
      creator: 'Director Name',
      description: 'Film description',
      imageUrl: null,
      externalUrl: null,
      metadata: { year: 2024, genre: [] }
    };
  }

  async scrapeMusicData(query) {
    // Placeholder for music scraping
    console.log(`Scraping music data for: ${query}`);

    return {
      type: 'music',
      title: 'Album/Song Title',
      creator: 'Artist Name',
      description: 'Music description',
      imageUrl: null,
      externalUrl: null,
      metadata: { genre: [], releaseDate: null }
    };
  }

  async scrapeBookData(title) {
    // Placeholder for book scraping (could use Google Books, Goodreads, etc.)
    console.log(`Scraping book data for: ${title}`);

    return {
      type: 'book',
      title: title,
      creator: 'Author Name',
      description: 'Book description',
      imageUrl: null,
      externalUrl: null,
      metadata: { isbn: null, publishYear: null }
    };
  }

  async scrapeComicData(title) {
    // Placeholder for comic/manga scraping
    console.log(`Scraping comic data for: ${title}`);

    return {
      type: 'comic',
      title: title,
      creator: 'Creator Name',
      description: 'Comic/manga description',
      imageUrl: null,
      externalUrl: null,
      metadata: { publisher: null, series: null }
    };
  }

  async scrapeAnimationData(title) {
    // Placeholder for animation scraping
    console.log(`Scraping animation data for: ${title}`);

    return {
      type: 'animation',
      title: title,
      creator: 'Studio/Director',
      description: 'Animation description',
      imageUrl: null,
      externalUrl: null,
      metadata: { studio: null, year: null }
    };
  }

  async scrapeArtByType(type, query) {
    switch (type) {
      case 'artwork':
        return await this.scrapeArtwork(query);
      case 'film':
      case 'tv':
        return await this.scrapeFilmData(query);
      case 'music':
        return await this.scrapeMusicData(query);
      case 'book':
        return await this.scrapeBookData(query);
      case 'comic':
      case 'manga':
        return await this.scrapeComicData(query);
      case 'animation':
        return await this.scrapeAnimationData(query);
      default:
        throw new Error(`Unsupported art type: ${type}`);
    }
  }
}

module.exports = new ScrapingService();
