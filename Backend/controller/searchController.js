import puppeteer from "puppeteer";

export const searchYoutube = async (req, res) => {
  const query = req.query.q; // read ?q= from request

  if (!query) {
    return res.status(400).json({ error: "Missing query parameter ?q=" });
  }

  const browser = await puppeteer.launch({
    headless: true,
    args: ["--no-sandbox", "--disable-setuid-sandbox"],
  });

  const page = await browser.newPage();
  const searchUrl = `https://www.youtube.com/results?search_query=${encodeURIComponent(
    query
  )}`;

  await page.goto(searchUrl, { waitUntil: "networkidle2" });

  // Run inside the browser context
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

  await browser.close();

  return res.json({ results: videoIds });
};
