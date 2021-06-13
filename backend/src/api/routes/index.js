const routes = require('express').Router();
const service = require('../../service')

routes.post("/gettop", async (req, res) => {
   const users = await service.getDataFromScraper(req.body.numberofpages,req.body.numberofsuspects)
   res.status(200).json(users);
});


module.exports = routes; 