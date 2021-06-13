const express = require('express');
const routes = require('./routes');
const app = express();


app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended: true }));

//home page
app.get("/",  async (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

app.use('/api/', routes);

//execute webserver to accept requests
app.listen(1000, () => {
    console.log("Server started at port 1000")
});

