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
    const numberofpages = req.body.numberofpages;
    const numberofsuspects = req.body.numberofsuspects;
    const users = await scraper.collectReviewsFromMuplitplePages(service.tryParseNumericValuewWithDefault(numberofpages,5))
    const suspectusers = service.getTopNSuspectUsers(users,service.tryParseNumericValuewWithDefault(numberofsuspects,3))
    res.status(200).json(suspectusers);
});

app.listen(1000, () => {
    console.log("Server started at port 1000")
});

