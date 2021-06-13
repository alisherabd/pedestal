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

describe("excludeFromArrayByCriteria function", () => {
	it("should not include given key", async () => {
		const mockData = [{username:"A",rating:5,val1:"sda"},{username:"A",rating:2,val2:"sdfg"},{username:"B",rating:10},{username:"C",rating:10}]
		const expected = [{username:"B",rating:10},{username:"C",rating:10}]
		const result = service.excludeFromArrayByCriteria(mockData,[{username:"A",rating:2,val2:"sdfg"}],'username');

		expect(result).eql(expected);
	}) 

	it("should not change anything if key is not present", async () => {
		const mockData = [{username:"A",rating:5,val1:"sda"},{username:"A",rating:2,val2:"sdfg"},{username:"B",rating:10},{username:"C",rating:10}]
		const result = service.excludeFromArrayByCriteria(mockData,[{username:"D",rating:2,val2:"sdfg"}],'username');

		expect(result).eql(mockData);
	}) 

	it("should not change anything if property is not present", async () => {
		const mockData = [{username1:"A",rating:5,val1:"sda"},{username1:"A",rating:2,val2:"sdfg"},{username2:"B",rating:10},{username2:"C",rating:10}]
		const result = service.excludeFromArrayByCriteria(mockData,[{username:"D",rating:2,val2:"sdfg"}],'username');

		expect(result).eql(mockData);
	}) 
});


describe("tryParseNumericValuewWithDefault function", () => {
	it("should be number if numeric string", async () => {
		const mockData = "5"
		const result = service.tryParseNumericValuewWithDefault(mockData);
		expect(result).equal(5);
	}) 
	it("should be 0 if non-numeric string", async () => {
		const mockData = "5sdf"
		const result = service.tryParseNumericValuewWithDefault(mockData);
		expect(result).equal(0);
	}) 
	it("should be 0 if undefined", async () => {
		const mockData = undefined
		const result = service.tryParseNumericValuewWithDefault(mockData);
		expect(result).equal(0);
	})

	it("should be 0 if null", async () => {
		const mockData = null
		const result = service.tryParseNumericValuewWithDefault(mockData);
		expect(result).equal(0);
	})
	it("should be 0 if unassigned", async () => {
		let mockData;
		const result = service.tryParseNumericValuewWithDefault(mockData);
		expect(result).equal(0);
	})

	it("should be 0 if {}", async () => {
		let mockData={};
		const result = service.tryParseNumericValuewWithDefault(mockData);
		expect(result).equal(0);
	})
	it("should be 0 if []", async () => {
		let mockData=[];
		const result = service.tryParseNumericValuewWithDefault(mockData);
		expect(result).equal(0);
	})

	it("should be 0 if true", async () => {
		let mockData=true;
		const result = service.tryParseNumericValuewWithDefault(mockData);
		expect(result).equal(0);
	})

	it("should be default if non-numeric string", async () => {
		const mockData = "5sdf"
		const result = service.tryParseNumericValuewWithDefault(mockData,11);
		expect(result).equal(11);
	})

	
})



describe("distinctifyArrayByCriteria function", () => {
	it("should exclude dublicate usernames", async () => {
		const mockData = [{username:"A",rating:5,val1:"sda"},{username:"A",rating:2,val2:"sdfg"},{username:"B",rating:10},{username:"C",rating:10}]
		const expected = [{username:"A",rating:5,val1:"sda"},{username:"B",rating:10},{username:"C",rating:10}]
		const result = service.distinctifyArrayByCriteria(mockData,'username');

		expect(result).eql(expected);
	}) 

	it("should be as is if username for each item is exactly once", async () => {
		const mockData = [{username:"A",rating:5,val1:"sda"},{username:"B",rating:10},{username:"C",rating:10}]
		const result = service.distinctifyArrayByCriteria(mockData,'username');

		expect(result).eql(mockData);
	}) 



	it("should be as is if username for each item is exactly once", async () => {
		const mockData = [{
			username: 'Monica1815.mh',
			rating: 50,
			customer_service_rating: 50,
			quality_of_work_rating: 50,
			friendliness_rating: 50,
			pricing_rating: 50,
			overall_experience_rating: 50,
			recommended_dealer_rating: -1,
			comment_text: 'Patrick is just The Best ... there’s really no better way to put it.  I have been a customer of McKaig Chevrolet Buick for several years now, and every time I have an issue, Patrick is my go-to guy!  He is so friendly and knowledgeable!!  He has not only resolved every issue that I have ever had, but he does it over-the-top, so to say ... he does a better job than he even has to.  He answers my questions after hours and puts up with all of my whining. LOL\n' +
			  'I couldn’t recommend a better service guy if I wanted to.  Go see Patrick and he will DEFINITELY take care of you !!!',
			number_of_employees: 8,
			date: 'February 26, 2021',
			visit: 'SERVICE VISIT'
		  },
		  {
			username: 'Monica1815.mh',
			rating: 50,
			customer_service_rating: 50,
			quality_of_work_rating: 50,
			friendliness_rating: 50,
			pricing_rating: 50,
			overall_experience_rating: 50,
			recommended_dealer_rating: -1,
			comment_text: 'This is the 2nd vehicle I have purchased from McKaig Chevrolet Buick, and I wouldn’t purchase a vehicle anywhere else!  Their service department has taken care of me exceptionally several times, especially Patrick Evans!  He is so friendly and so knowledgeable.  I had a small wreck in my 2018 Chevy Traverse that I purchased from McKaig, and Patrick recommended Adrian Cortes to sell me a new vehicle on the spot instead of fixing my Traverse and I took the bait willingly!  LOL !!!  I knew that Adrian would put me in a reliable vehicle that would fit my needs, including 4-wheel drive, having to fit a 6’4” man in the front passenger seat and 2 big car seats in the back, not to mention TONS of room in the back for all my junk and groceries.  Needless to say, Adrian  fixed me up in a 2018 4x4 Jeep Grand Cherokee that is loaded to the max and is WAY sportier and more luxurious than what I had before.  I told Adrian what I wanted in a vehicle and he took me right to it, where I immediately fell in love with the All-Black look, even the 20” wheels.  I feel like a Cool Mom now thanks to Adrian!  I will DEFINITELY purchase my next vehicle from him!  I couldn’t be happier!',
			number_of_employees: 8,
			date: 'February 26, 2021',
			visit: 'SALES VISIT - USED'
		  }]
		  const expected = [{
			username: 'Monica1815.mh',
			rating: 50,
			customer_service_rating: 50,
			quality_of_work_rating: 50,
			friendliness_rating: 50,
			pricing_rating: 50,
			overall_experience_rating: 50,
			recommended_dealer_rating: -1,
			comment_text: 'Patrick is just The Best ... there’s really no better way to put it.  I have been a customer of McKaig Chevrolet Buick for several years now, and every time I have an issue, Patrick is my go-to guy!  He is so friendly and knowledgeable!!  He has not only resolved every issue that I have ever had, but he does it over-the-top, so to say ... he does a better job than he even has to.  He answers my questions after hours and puts up with all of my whining. LOL\n' +
			  'I couldn’t recommend a better service guy if I wanted to.  Go see Patrick and he will DEFINITELY take care of you !!!',
			number_of_employees: 8,
			date: 'February 26, 2021',
			visit: 'SERVICE VISIT'
		  }]
		const result = service.distinctifyArrayByCriteria(mockData,'username');

		expect(result).eql(expected);
	}) 


})