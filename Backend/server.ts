import express from "express";
import {createClient} from "redis";
import cors from "cors";
import connectDB from "./src/db";
import User from "./src/models/User";
import {codestatus} from "./src/models/User";

const app = express();
app.use(cors());


app.use(express.json());

connectDB();

app.post("/submission", async(req,res) => {
    console.log("1 req got");
    const code = req.body.code;
    const language = req.body.language;
/* first job of backend done*/
    try{
        console.log("2 before DB");
        let newuser = await User.create({
            code:code,
            status:codestatus.processing,
            language:language
        })

        console.log("3 after DB");

        let _id = newuser._id; 
/* sending the user's code to the worker via redis queue -- 2nd job of backend done*/
    console.log("4 before redis client");
      const client = createClient();
        await client.connect();
        console.log("redis started !!!!");

     console.log("5 main step of lpush");
        await client.lPush("problems",JSON.stringify({code,language,_id}));


         res.json({message:"processing", submissionid: _id});

         console.log("6 everything done");
    }

    catch (error) {
        console.error("Error creating user:", error);
    }

})

app.listen(3000,()=>{
    console.log("server started listening at 3000");
});



