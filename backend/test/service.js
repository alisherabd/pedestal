const chai = require('chai')
const expect = chai.expect

const service = require('../src/service')

describe("getGroupByCriteriaRecords function based citeria and number of occurances", () => {
	it("should return those users who has more than one occurances", async () => {
		const mockData = [{username:"A",rating:5,val1:"sda"},{username:"A",rating:2,val2:"sdfg"},{username:"B",rating:10}]
		const expected = [{username:"A",rating:5,val1:"sda"},{username:"A",rating:2,val2:"sdfg"}]
		const result = service.getGroupByCriteriaRecords(mockData,'username',1);

		expect(result).eql(expected);
	})

	it("should return those users who has more than one occurances and matching key", async () => {
		const mockData = [{username:"A",rating:5,val1:"sda"},{username:"A",rating:2,val2:"sdfg"},{username:"B",rating:10},{username2:"B",rating:10}]
		const expected = [{username:"A",rating:5,val1:"sda"},{username:"A",rating:2,val2:"sdfg"}]
		const result = service.getGroupByCriteriaRecords(mockData,'username',1);

		expect(result).eql(expected);
	})

	it("should return based on occurance size", async () => {
		const mockData = [{val:"A",rating:5,val1:"sda"},{val:"A",rating:2,val2:"sdfg"},{val:"B",rating:10},{val:"B",rating:10},{val:"B",rating:10,val3:"some value"}]
		const expected = [{val:"B",rating:10},{val:"B",rating:10},{val:"B",rating:10,val3:"some value"}]
		const result = service.getGroupByCriteriaRecords(mockData,'val',2);

		expect(result).eql(expected);
	})

	it("should return [] when main criteria is missing", async () => {
		const mockData = [{username1:"A",rating:2},{username1:"B",rating:10}]
		const result = service.getGroupByCriteriaRecords(mockData,'username',1);

		expect(result).eql([]);
	})

	it("should return [] when input is []", async () => {
		const result = service.getGroupByCriteriaRecords([],'username',1);
		expect(result).eql([]);
	})

	it("should return [] when input is undefined", async () => {
		expect(service.getGroupByCriteriaRecords(undefined,'username',1)).eql([]);
	})

	it("should return [] when input is null", async () => {
		expect(service.getGroupByCriteriaRecords(null,'username',1)).eql([]);
	})

	it("should return [] when input is not assigned", async () => {
		let value;
		expect(service.getGroupByCriteriaRecords(value,'username',1)).eql([]);
	})

	it("should return [] when input is object, ", async () => {
		
		expect(service.getGroupByCriteriaRecords({},'username',1)).eql([]);
	})

	it("should return [] when input is number", async () => {
		expect(service.getGroupByCriteriaRecords(1,'username',1)).eql([]);
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

