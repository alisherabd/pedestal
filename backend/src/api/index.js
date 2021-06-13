const express = require('express');
const service = require('../service')
const app = express();

app.get("/", (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

app.post("/gettop", (req, res) => {
    res.status(200).json({ message: 'Connected!' });
});

// app.get('/gettop', (req, res) => {
//     res.status(200).json({ message: 'Connected!' });
// });

app.listen(1000, () => {
    console.log("Server started at port 1000")
});