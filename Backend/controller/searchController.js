import puppeteer from "puppeteer";

let browser; // browser instance to be shared across requests

// Launch browser once when the server starts
(async () => {
  browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });
})();

export const searchYoutube = async (req, res) => {
  const query = req.query.q;

  if (!query) {
    return res.status(400).json({ error: "Missing query parameter ?q=" });
  }

  try {
    const page = await browser.newPage();
    const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
      query
    )}`;
    await page.goto(searchUrl, { waitUntil: "networkidle2" });

    const videoIds = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll("a#video-title"));
      return anchors
        .map((a) => {
          const url = a.href;
          const match = url.match(/v=([^&]+)/);
          return match ? match[1] : null;
        })
        .filter(Boolean);
    });

    await page.close();
    res.json({ results: videoIds });
  } catch (err) {
    console.error("Error scraping YouTube:", err);
    res.status(500).json({ error: "Failed to fetch videos" });
  }
};
