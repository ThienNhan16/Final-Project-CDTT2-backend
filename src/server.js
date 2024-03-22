import express from 'express';
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
// import cors from 'cors';
require('dotenv').config();

let app = express();
// app.use(cors({ origin: true }));

//Add header
app.use(function (req, res, next) {

    //Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);

    //Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH , DELETE');

    //Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    //set to true if you need the website to include cookies in the requests sent
    //to the API (e.g. in case you use session)
    res.setHeader('Access-Control-Allow-Credentials', true);

    //pass to next layer of middleware
    next();
})

//config app
// app.use(bodyParser.json()); // for parsing application/json
// app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb',extended: true}));

//set up the engine to render views
viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;
// Port === undefined => port = 8080
const host = process.env.HOST || "127.0.0.1";
app.listen(port, host, () => console.log(`Server started on ${host}:${port}`));