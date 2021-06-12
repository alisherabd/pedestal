const chai = require('chai')
const expect = chai.expect

const scraper = require('../src/scraper')

describe("fetchHtml function", () => {
	xit("should return non empty result from webscraper website", async () => {
		const html = await scraper.fethHtml("https://webscraper.io/test-sites/e-commerce/allinone");
		expect(html).to.be.not.empty;
	})
})

