const routes = require('express').Router();
const service = require('../../service')
const redis = require('../../redis')
const scraper = require("../../scraper")



routes.post("/gettop", async (req, res) => {
    const numberofpages = service.tryParseNumericValuewWithDefault(req.body.numberofpages,5);
    const numberofsuspects = service.tryParseNumericValuewWithDefault(req.body.numberofsuspects,3);
    const users = await scraper.collectReviewsFromMuplitplePages(numberofpages)
    const suspectusers = service.getTopNSuspectUsers(users,numberofsuspects)
    res.status(200).json(suspectusers);
});



module.exports = routes; 