const cheerio = require("cheerio");
const axios = require("axios").default;

const fethHtml = async url => {
  try {
    const { data } = await axios.get(url);
    return data;
  } catch {
    console.error(`ERROR: An error occurred while trying to fetch the URL: ${url}`);
  }
};

const extractRatingNumber

const extractDeal = selector => {
  const username = selector
    .find("span[class='italic font-18 black notranslate']")
    .text()
    .trim();

  const rating = selector
    .find("div[class='rating-static visible-xs pad-none margin-none']")
    .attr('class');
  rating.

  return {
    username,

  };
};

const scrapDealerSite = async () => {
  const steamUrl = 'https://www.dealerrater.com/dealer/McKaig-Chevrolet-Buick-A-Dealer-For-The-People-dealer-reviews-23685/page1/?filter=ONLY_POSITIVE';
  const html = await fethHtml(steamUrl);
  const $ = cheerio.load(html);

  const searchResults = $("body").find("div.review-entry");

  const reviews = searchResults
    .map((idx, el) => {
      const elementSelector = $(el);
      return extractDeal(elementSelector);
    })
    .get();

  return reviews;
};

// scrapDealerSite().then((html)=>{
//     console.log(html);

// });


module.exports = {
    fethHtml:fethHtml,
    scrapDealerSite:scrapDealerSite
};