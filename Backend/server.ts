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
      const client = createClient();
        await client.connect();
        
        await client.lPush("problems",JSON.stringify({code,language,_id}));

         res.json({message:"processing", submissionid: _id});

    }

    catch (error) {
        console.error("Error creating user:", error);
    }

})

app.get("/status/:id", async(req,res)=> {
    const id = req.params.id;
    const submission = await User.findById(id);
    res.json({
        status:submission?.status,
        result:submission?.Result
    });


})

app.listen(3000,()=>{
    console.log("server started listening at 3000");
});



