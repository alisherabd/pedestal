const chai = require('chai')
const expect = chai.expect

const scraper = require('../src/scraper')

describe("fetchHtml function", () => {
	xit("should return non empty result from webscraper website", async () => {
		const html = await scraper.fethHtml("https://webscraper.io/test-sites/e-commerce/allinone");
		expect(html).to.be.not.empty;
	})
})



describe("extractRatingNumber function", () => {
	const prefix = "rating-";
	it("should have numeric value as a return when have 'rating-' as a prefix",  () => {
		const mockData = `calss1 class2 class3 ${prefix}35`
		const actual = scraper.extractRatingNumber(mockData);
		expect(actual).to.equal(35);
	})


	it("should have first occurence of number with same prefix 'rating-'",  () => {
		const mockData = `calss1 class2 class3 ${prefix}35 ${prefix}100`
		const actual = scraper.extractRatingNumber(mockData);
		expect(actual).to.equal(35);
	})

	it("should return -1 if no prefix 'rating-' is found",  () => {
		const mockData = "calss1 class2 class3"
		const actual = scraper.extractRatingNumber(mockData);
		expect(actual).to.equal(-1);
	})
	it("should return -1 if input is empty string",  () => {
		const mockData = ""
		const actual = scraper.extractRatingNumber(mockData);
		expect(actual).to.equal(-1);
	})

	it("should return -1 if input is null",  () => {
		const mockData = null
		const actual = scraper.extractRatingNumber(mockData);
		expect(actual).to.equal(-1);
	})

	it("should return -1 if input is undefined",  () => {
		const mockData = undefined
		const actual = scraper.extractRatingNumber(mockData);
		expect(actual).to.equal(-1);
	})

	it("should return -1 if input not assigned",  () => {
		let mockData;
		const actual = scraper.extractRatingNumber(mockData);
		expect(actual).to.equal(-1);
	})

	it("should return -1 if input is single word",  () => {
		const mockData = "class";
		const actual = scraper.extractRatingNumber(mockData);
		expect(actual).to.equal(-1);
	})

	it("should return -1 if contains prefix with non-numeric value",  () => {
		const mockData = `${prefix}class`;
		const actual = scraper.extractRatingNumber(mockData);
		expect(actual).to.equal(-1);
	})

	it("should return valid result if contains prefix with numeric after non-numeric prefix value",  () => {
		const mockData = `${prefix}class ${prefix}class1 ${prefix}35 ${prefix}100`;
		const actual = scraper.extractRatingNumber(mockData);
		expect(actual).to.equal(35);
	})
})
