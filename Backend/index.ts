import express from "express";
import {createClient} from "redis";
import cors from "cors";
import connectDB from "./src/db";

const app = express();
app.use(cors());

const client = createClient();
client.connect();

app.use(express.json());

connectDB();

app.post("/submission", (req,res) => {
    const code = req.body.code;
    const language = req.body.language;

    /* sending the user's code to the worker via redis queue -- 1st job of backend done*/

    client.lPush("problems",JSON.stringify({code,language}));



    res.json({
        message:"processing",
    });


})

app.listen(3000,()=>{
    console.log("server started listening at 3000");
});



