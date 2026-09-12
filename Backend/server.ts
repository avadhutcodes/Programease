import express from "express";
import {createClient} from "redis";
import cors from "cors";
import connectDB from "./src/db";
import User from "./src/models/User";
import {codestatus} from "./src/models/User";

const app = express();
app.use(cors());

const client = createClient();
client.connect();

app.use(express.json());

connectDB();

app.post("/submission", async(req,res) => {
    const code = req.body.code;
    const language = req.body.language;
/* first job of backend done*/
    try{
        let newuser = await User.create({
            code:code,
            status:codestatus.processing,
            language:language
        })

        
        let _id = newuser._id; 
/* sending the user's code to the worker via redis queue -- 2nd job of backend done*/
        await client.lPush("problems",JSON.stringify({code,language,_id}));
        console.log(code);

         res.json({message:"processing"});


    }

    catch (error) {
        console.error("Error creating user:", error);
    }

})

app.listen(3000,()=>{
    console.log("server started listening at 3000");
});



