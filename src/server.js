import express from 'express';
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";   
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
require('dotenv').config();

let app = express();

//config app
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//set up the engine to render views
viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;
// Port === undefined => port = 6969
app.listen(port, () => {
    //callback function
    console.log(`Server is running on port ${port}`);
});