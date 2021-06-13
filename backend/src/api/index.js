const express = require('express');
const routes = require('./routes');
const app = express();
const PORT = 3000;

app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb',extended: true }));

//home page
app.get("/",  async (req, res) => {
    res.sendFile(__dirname + "/index.html")
});

app.use('/api/', routes);

//execute webserver to accept requests
app.listen(process.env.PORT || PORT, () => {
    console.log(`Server listening at port ${process.env.PORT || PORT}`)
});

