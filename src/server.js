import express from 'express';
import bodyParser from "body-parser";
import viewEngine from "./config/viewEngine";   
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from 'cors';
require('dotenv').config();

let app = express();
app.use(cors({origin: true}));

//config app
app.use(bodyParser.json()); // for parsing application/json
app.use(bodyParser.urlencoded({ extended: true })); // for parsing application/x-www-form-urlencoded

//set up the engine to render views
viewEngine(app);
initWebRoutes(app);

connectDB();

let port = process.env.PORT || 6969;
// Port === undefined => port = 6969
const host = process.env.HOST || "127.0.0.1";
app.listen(port, host, () => console.log(`Server started on ${host}:${port}`));