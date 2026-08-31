import {createClient} from "redis";
import { spawn } from 'node:child_process';
import fs from "fs";

const client = createClient();
client.connect()
  .then(async() => {
    while(1){
        const response = await client.rPop("problems");
        if(!response){
            await new Promise<void>(resolve => {
                setTimeout(resolve,1000);  
            })
            continue;
        }
        const parsedResponse = JSON.parse(response);
        const code = parsedResponse.code;
        const language = parsedResponse.language;

        if(language === "cpp"){
            console.log("running user's c++ code");
            const filepath = __dirname + "/code/userscode.cpp";
            fs.writeFileSync(filepath,code);
            spawn("g++", [filepath, "-o", "./code/output"]);
            await  new Promise<void>(resolve => setTimeout(() => {
                resolve();    
            }, 10000));
            const response = spawn("./code/output");
            response.stdout.on("data",(chunk) => {
                console.log(chunk.toString());
            })


             
        }

        if(language === "js"){
            console.log("running user's js code");
            //spwan a node process 
            //store output to database
            //update the status 
            const filepath = __dirname + "/code/userscode.js";
            fs.writeFileSync(filepath,code);
            const output = spawn("node",[filepath]);
            output.stdout.on("data",(chunk) => {
                console.log(chunk.toString());
            })


        }

        if(language === "python3"){
            console.log("running user's python code");
            const filepath = __dirname + "/code/userscode.py";
            fs.writeFileSync(filepath,code);
            const output = spawn("python3",[filepath]);
            output.stdout.on("data",(chunk) => {
                console.log(chunk.toString());
            })


        }


    }

})


