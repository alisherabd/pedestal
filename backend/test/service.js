const chai = require('chai')
const expect = chai.expect

const service = require('../src/service')

describe("getUsersWithMultipleOccurance function based (username is main criteria)", () => {
	it("should return those users who has more than one occurances", async () => {
		const mockData = [{username:"A",rating:5,val1:"sda"},{username:"A",rating:2,val2:"sdfg"},{username:"B",rating:10}]
		const expected = [{username:"A",rating:5,val1:"sda"},{username:"A",rating:2,val2:"sdfg"}]
		const result = service.getUsersWithMultipleOccurance(mockData);

		expect(result).eql(expected);
	})

	it("should return [] when no only one record exists of each occurence", async () => {
		const mockData = [{username:"A",rating:2},{username:"B",rating:10}]
		const result = service.getUsersWithMultipleOccurance(mockData);

		expect(result).eql([]);
	})

	it("should return [] when main criteria is missing", async () => {
		const mockData = [{username1:"A",rating:2},{username1:"B",rating:10}]
		const result = service.getUsersWithMultipleOccurance(mockData);

		expect(result).eql([]);
	})

	it("should return [] when input is []", async () => {
		const result = service.getUsersWithMultipleOccurance([]);
		expect(result).eql([]);
	})

	it("should return [] when input is undefined", async () => {
		expect(service.getUsersWithMultipleOccurance(undefined)).eql([]);
	})

	it("should return [] when input is null", async () => {
		expect(service.getUsersWithMultipleOccurance(null)).eql([]);
	})

	it("should return [] when input is not assigned", async () => {
		let value;
		expect(service.getUsersWithMultipleOccurance(value)).eql([]);
	})

	it("should return [] when input is object, ", async () => {
		
		expect(service.getUsersWithMultipleOccurance({})).eql([]);
	})

	it("should return [] when input is number", async () => {
		expect(service.getUsersWithMultipleOccurance(1)).eql([]);
	})

})


describe("usersWithAllFiveStars function", () => {
	it("should filter only to five stars", async () => {
		const mockData = [
			{
				rating: 50,
				customer_service_rating: 50,
				quality_of_work_rating: 50,
				friendliness_rating: 50,
				pricing_rating: 50,
				overall_experience_rating: 50
			},
			{
				rating: 1,
				customer_service_rating: 50,
				quality_of_work_rating: 50,
				friendliness_rating: 50,
				pricing_rating: 50,
				overall_experience_rating: 50
			}
		]
		const expected = [{
			rating: 50,
			customer_service_rating: 50,
			quality_of_work_rating: 50,
			friendliness_rating: 50,
			pricing_rating: 50,
			overall_experience_rating: 50
		}]

		const result = service.usersWithAllFiveStars(mockData);

		expect(result).eql(expected);
	}) 
	it("should return [] when input is []", async () => {
		const result = service.usersWithAllFiveStars([]);
		expect(result).eql([]);
	})

	it("should return [] when input is undefined", async () => {
		expect(service.usersWithAllFiveStars(undefined)).eql([]);
	})

	it("should return [] when input is null", async () => {
		expect(service.usersWithAllFiveStars(null)).eql([]);
	})

	it("should return [] when input is not assigned", async () => {
		let value;
		expect(service.usersWithAllFiveStars(value)).eql([]);
	})

	it("should return [] when input is object, ", async () => {
		
		expect(service.usersWithAllFiveStars({})).eql([]);
	})

	it("should return [] when input is number", async () => {
		expect(service.usersWithAllFiveStars(1)).eql([]);
	})
})
