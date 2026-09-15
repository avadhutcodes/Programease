import {createClient} from "redis";
import { spawn } from 'node:child_process';
import fs from "fs";
import path from "path";
import User from "../Backend/src/models/User";
import connectDB from "../Backend/src/db"
import {codestatus} from "../Backend/src/models/User";

connectDB()
.then(() =>{
    const client = createClient();
client.connect()
  .then(async() => {
    while(1){

        
        const response = await client.rPop("problems");
       
        if(!response){
            
            await new Promise<void>(resolve => {
                setTimeout(resolve,5000);  
            })
            continue;
        }

        const parsedResponse = JSON.parse(response);
        const code = parsedResponse.code;
        const language = parsedResponse.language;
        const _id = parsedResponse._id;

        if(language === "cpp"){
            console.log("running user's c++ code");
            const filepath = path.join( __dirname, "/code/userscode.cpp");
            fs.writeFileSync(filepath,code);
            const compiler = spawn("g++", [filepath, "-o", "./code/output"]);
            let compileError = "";

    compiler.stderr.on("data", (chunk) => {
        compileError += chunk.toString();
    });

    const compilationSuccessful = await new Promise<boolean>((resolve:any) => {
        compiler.on("close",async(exitCode) => {

            if (exitCode !== 0) {
                await User.findByIdAndUpdate(
                    _id,
                    {Result : "compilation failed", compileError},
                    
                )
                resolve(false);
                return;
            }

            resolve(true);
        });
    });

    if (!compilationSuccessful) {
    continue;
}


            const response = spawn("./code/output");
            let stdoutData = '';
            let stderrData = '';
            response.stdout.on("data",(chunk) => {
                stdoutData += chunk.toString();      
            })

            response.stderr.on("data", (chunk)=> {
                  stderrData += chunk.toString();
            })

            await new Promise<void>(resolve => {
                response.on("close", () => {
                    resolve();
                })
            })

            let parinam = '';
              if(stdoutData !== ''){
                parinam = stdoutData;
              }

              else{
                parinam = stderrData;
              }

            await User.findByIdAndUpdate(
                _id,
                {Result : parinam},
                
            );

            await User.findByIdAndUpdate(
                _id,
                {status : codestatus.completed},
                
            )    
        }

        if(language === "javascript"){
            console.log("running user's js code");
            //spwan a node process 
            //store output to database
            //update the status 
            const filepath =path.join( __dirname + "/code/userscode.js");
            fs.writeFileSync(filepath,code);
            const output = spawn("node",[filepath]);
            
            let stdoutData = '';
            let stderrData = '';

             output.stdout.on('data', (chunk) => {
                 stdoutData += chunk.toString();
              });

             output.stderr.on('data', (chunk) => {
               stderrData += chunk.toString();
              });

              await new Promise<void>(resolve => {
                output.on('close', () => {
                    resolve();
                });
              });
            
              let parinam = '';
              if(stdoutData !== ''){
                parinam = stdoutData;
              }

              else{
                parinam = stderrData;
              }

            await User.findByIdAndUpdate(
                _id,
                {Result : parinam},
                
            );

            await User.findByIdAndUpdate(
                _id,
                {status : codestatus.completed},
               
            )
        }

        if(language === "python3"){
            console.log("running user's python code");
            const filepath = path.join(__dirname , "/code/userscode.py");
            fs.writeFileSync(filepath,code);
            const output = spawn("python3",[filepath]);
            let stdoutData = '';
            let stderrData = '';
            output.stdout.on("data",(chunk) => {
                stdoutData += chunk.toString();
            })

            output.stderr.on("data", (chunk) => {
                stderrData += chunk.toString();
            })

            let parinam = '';

            await new Promise<void>(resolve => {
                output.on("close", () => {
                    resolve();
                });
            });

            if(stdoutData !== ''){
                parinam = stdoutData;
            }
            else{
                parinam = stderrData;
            }

            await User.findByIdAndUpdate(
                _id,
                {Result : parinam},
                
            );

            await User.findByIdAndUpdate(
                _id,
                {status : codestatus.completed},
                
            )
        }
    }

})

}

)
