const express = require('express');
const service = require('../service')
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
    const users = await scraper.collectReviewsFromMuplitplePages(numberofpages)
    const suspectusers = service.getTopNSuspectUsers(users,numberofsuspects)
    res.status(200).json(suspectusers);
});

app.listen(1000, () => {
    console.log("Server started at port 1000")
});

