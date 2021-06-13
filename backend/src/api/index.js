const express = require('express');
const service = require('../service')
const redis = require('../redis')
const scraper = require("../scraper")
const app = express();


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended: true }));
app.get("/",  async (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

app.post("/gettop", async (req, res) => {
    const numberofpages = service.tryParseNumericValuewWithDefault(req.body.numberofpages,5);
    const numberofsuspects = service.tryParseNumericValuewWithDefault(req.body.numberofsuspects,3);
    const users = await scraper.collectReviewsFromMuplitplePages(numberofpages)
    const suspectusers = service.getTopNSuspectUsers(users,numberofsuspects)
    res.status(200).json(suspectusers);
});

app.listen(1000, () => {
    console.log("Server started at port 1000")
});

