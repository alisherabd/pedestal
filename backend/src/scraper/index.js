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
  let customer_service_rating = selector
    .find("div[class='pull-left pad-left-md pad-right-md bg-grey-lt margin-bottom-md review-ratings-all review-hide'] > div")
    .find("div:nth-child(1)")
    .find("div:nth-child(2)")
    .attr('class');
  let quality_of_work_rating = selector
    .find("div[class='pull-left pad-left-md pad-right-md bg-grey-lt margin-bottom-md review-ratings-all review-hide'] > div")
    .find("div:nth-child(2)")
    .find("div:nth-child(2)")
    .attr('class');
  let friendliness_rating = selector
    .find("div[class='pull-left pad-left-md pad-right-md bg-grey-lt margin-bottom-md review-ratings-all review-hide'] > div")
    .find("div:nth-child(3)")
    .find("div:nth-child(2)")
    .attr('class');
  let pricing_rating = selector
    .find("div[class='pull-left pad-left-md pad-right-md bg-grey-lt margin-bottom-md review-ratings-all review-hide'] > div")
    .find("div:nth-child(4)")
    .find("div:nth-child(2)")
    .attr('class');
  let overall_experience_rating = selector
    .find("div[class='pull-left pad-left-md pad-right-md bg-grey-lt margin-bottom-md review-ratings-all review-hide'] > div")
    .find("div:nth-child(5)")
    .find("div:nth-child(2)")
    .attr('class');
  let recommended_dealer_rating = selector
    .find("div[class='pull-left pad-left-md pad-right-md bg-grey-lt margin-bottom-md review-ratings-all review-hide'] > div")
    .find("div:nth-child(6)")
    .find("div:nth-child(2)")
    .attr('class');
  let comment_text= selector
    .find("div[class='tr margin-top-md'] > div >p")
    .text();
  let number_of_employees = selector
    .find("div[class='col-xs-12 col-sm-9 pad-none review-wrapper']")
    .find("div[class='clear-fix  margin-top-sm']")
    .find("div[class='col-xs-12 lt-grey pad-left-none employees-wrapper']")
    .children().length;
  let date = selector
    .find("div[class='col-xs-12 col-sm-3 pad-left-none text-center review-date margin-bottom-md']")
    .find("div[class='italic col-xs-6 col-sm-12 pad-none margin-none font-20']")
    .text();
  let visit = selector
    .find("div[class='col-xs-12 col-sm-3 pad-left-none text-center review-date margin-bottom-md']")
    .find("div[class='col-xs-12 hidden-xs pad-none margin-top-sm small-text dr-grey']")
    .text();

  rating = extractRatingNumber(rating)
  customer_service_rating = extractRatingNumber(customer_service_rating)
  quality_of_work_rating = extractRatingNumber(quality_of_work_rating)
  friendliness_rating = extractRatingNumber(friendliness_rating)
  pricing_rating = extractRatingNumber(pricing_rating)
  overall_experience_rating = extractRatingNumber(overall_experience_rating)
  recommended_dealer_rating = extractRatingNumber(recommended_dealer_rating)

  username = username.replace("- ","");
  number_of_employees = (number_of_employees>0?number_of_employees-1:0)

  return {
    username,
    rating,
    customer_service_rating,
    quality_of_work_rating,
    friendliness_rating,
    pricing_rating,
    overall_experience_rating,
    recommended_dealer_rating,
    comment_text,
    number_of_employees,
    date,
    visit
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
// collectReviewsFromMuplitplePages(20).then((html)=>{
//    console.log(html);
// });

scrapDealerSite(1).then((html)=>{
   console.log(html);
});

// these functions are exported for testing
module.exports = {
    fethHtml:fethHtml,
    extractRatingNumber:extractRatingNumber
};