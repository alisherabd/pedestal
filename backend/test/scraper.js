const chai = require('chai')
const expect = chai.expect

const scraper = require('../src/scraper')

describe("fetchHtml function", () => {
	xit("should return non empty result from webscraper website", async () => {
		const html = await scraper.fethHtml("https://webscraper.io/test-sites/e-commerce/allinone");
		expect(html).to.be.not.empty;
	})
})



describe("extract rating from class name that contains 'rating-' prefix", () => {
	it("should have numeric value as a return",  () => {
		var mockData = "calss1 class2 class3 rating-35"
		var actual = scraper.extractRatingNumber(mockData);
		expect(actual).to.equal(35);
	})


	it("should have first occurence of number with same prefix",  () => {
		var mockData = "calss1 class2 class3 rating-35 rating-100"
		var actual = scraper.extractRatingNumber(mockData);
		expect(actual).to.equal(35);
	})

	it("should return -1 if no prefix is found",  () => {
		var mockData = "calss1 class2 class3"
		var actual = scraper.extractRatingNumber(mockData);
		expect(actual).to.equal(-1);
	})
})
