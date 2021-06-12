const chai = require('chai')
const expect = chai.expect

const service = require('../src/service')

describe("getUsersWithMultipleOccurance function", () => {
	it("should return those users who has more than one occurances", async () => {
		const mockData = [{username:"A",rating:5},{username:"A",rating:2},{username:"B",rating:10}]
		const expected = [{username:"A",rating:5},{username:"A",rating:2}]
		const result = service.getUsersWithMultipleOccurance(mockData);

		expect(result).equal(expected);
	})

	it("should return [] when no only one record exists of each occurence", async () => {
		const mockData = [{username:"A",rating:2},{username:"B",rating:10}]
		const result = service.getUsersWithMultipleOccurance(mockData);

		expect(result).equal([]);
	})

	it("should return [] when input is []", async () => {
		const result = service.getUsersWithMultipleOccurance([]);
		expect(result).equal([]);
	})

	it("should return [] when input is undefined", async () => {
		expect(service.getUsersWithMultipleOccurance(undefined)).equal([]);
	})

	it("should return [] when input is null", async () => {
		expect(service.getUsersWithMultipleOccurance(null)).equal([]);
	})

	it("should return [] when input is not assigned", async () => {
		let value;
		expect(service.getUsersWithMultipleOccurance(value)).equal([]);
	})

	it("should return [] when input is object, async", () => {
		
		expect(service.getUsersWithMultipleOccurance({})).equal([]);
	})

	it("should return [] when input is number", async () => {
		expect(service.getUsersWithMultipleOccurance(1)).equal([]);
	})

	it("should return [] when input is boolean", async () => {
		expect(service.getUsersWithMultipleOccurance(ture)).equal([]);
	})
})

