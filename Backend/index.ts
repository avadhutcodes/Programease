import express from "express";
import {createClient} from "redis";
import cors from "cors";

const app = express();
app.use(cors());

const client = createClient();
client.connect();

app.use(express.json());

app.get("/testing", (req,res) => {
    res.json({ message:"working"});
});

app.post("/submission", (req,res) => {
    const Code = req.body.code;
    const UserId = req.body.id;
    const language = req.body.language;

    /* sending the user's code to the worker via redis queue -- 1st job of backend done*/

    client.lPush("problems",JSON.stringify({UserId,Code,language}));

    res.json({
        message:"processing",
    });


})

app.listen(3000,()=>{
    console.log("server started listening at 3000");
});



