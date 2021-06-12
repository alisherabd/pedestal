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

const extractRatingNumber = classNames=>{
    const prefix = 'rating-';
    let result = "-1";
    if(classNames){
        for (let classname of classNames.split(' ')) {
            if(classname.includes(prefix)){
                result=classname.replace(prefix,"");
                if(result.length>0 && !isNaN(result)) // isNaN(result) returns true if the variable does NOT contain a valid number
                {
                    break;
                }
                else{
                    result="-1";
                }
            }
        }
    }
    return parseInt(result);
}


const extractSpecificValuesFromEachIteration = selector => {
  let username = selector
    .find("span[class='italic font-18 black notranslate']")
    .text()
    .trim();
    username
  let rating = selector
    .find("div > div[class='col-xs-6 col-sm-12 pad-none dealership-rating'] > div")
    .attr('class');
  rating = extractRatingNumber(rating)
  username = username.replace("- ","");

  return {
    username,
    rating
  };
};

const scrapDealerSite = async (pageNumber) => {
  let steamUrl = `https://www.dealerrater.com/dealer/McKaig-Chevrolet-Buick-A-Dealer-For-The-People-dealer-reviews-23685/page${pageNumber}/?filter=ONLY_POSITIVE`;
  const html = await fethHtml(steamUrl);
  const $ = cheerio.load(html);

  const searchResults = $("body").find("div.review-entry");

  const reviews = searchResults
    .map((idx, el) => {
      const elementSelector = $(el);
      return extractSpecificValuesFromEachIteration(elementSelector);
    })
    .get();
  return reviews;
};

// this is the main function to collect all the reviews from specified number of pages: return array
const collectReviewsFromMuplitplePages = async (numberOfPages) => {
    let reviews = [];
    for (let pageNumber = 1; pageNumber <= numberOfPages; pageNumber++) {
        const singlePageReviews = await scrapDealerSite(pageNumber);
        reviews = reviews.concat(singlePageReviews);
    }
    return reviews;
}
//for checking data
// collectReviewsFromMuplitplePages(5).then((html)=>{
//    console.log(html);
// });

// these functions are exported for testing
module.exports = {
    fethHtml:fethHtml,
    extractRatingNumber:extractRatingNumber
};