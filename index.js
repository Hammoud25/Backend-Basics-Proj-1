const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('./Shared/Services/mongoose.service');

const app = express();

const TaskRouter = require('./Tasks/routes.config');

const port = 5000;

mongoose.connectWithRetry();

app.get('/', (req, res) => {
    res.send("Home");
})

app.use(bodyParser.json({
    extended: true
}));

app.listen(port, function() {
    console.log('app listening at port %s', port);
});

TaskRouter.routesConfig(app);