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

