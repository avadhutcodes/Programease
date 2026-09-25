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
                compileError = compileError.replace(filepath,"");
                await User.findByIdAndUpdate(
                    _id,
                    {Result : compileError,
                    status:codestatus.completed}
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
            const MAX_OUTPUT = 1* 1024;//(restricting the output to only 1 KB)
            let stdoutData = '';
            let stderrData = '';
            let timeoutt = false;
            const TIME_LIMIT = 600000;
            let outputLimitExceeded = false;
            const timeout = setTimeout(() => {
               stdoutData = "  Time limit Exceeded";
               timeoutt = true;
               response.kill("SIGKILL");
            }, TIME_LIMIT);

            response.stdout.on("data",(chunk) => {
                if (timeoutt) return;

                stdoutData += chunk.toString(); 

                if (Buffer.byteLength(stdoutData, "utf8") >= MAX_OUTPUT) {
                  outputLimitExceeded = true;
                  stdoutData = "   ======= Output Limit Exceeded =======\n" + "Program produced more than 1 MB of output.";
                 response.kill("SIGKILL");       
            }
        });
        

            response.stderr.on("data", (chunk)=> {
                  stderrData += chunk.toString();
            });

            await new Promise<void>(resolve => {
                response.on("close", () => {
                    clearTimeout(timeout);
                    resolve();
                })
            })

            let parinam = '';
            if (timeoutt) {
              parinam = " Time Limit Exceeded !!!";
            }

          else if (stdoutData !== "") {
           stdoutData = stdoutData.replace(filepath, "");
           parinam = stdoutData;
          }
        else {
          stderrData = stderrData.replace(filepath, "");  
          parinam = stderrData;
    }

            await User.findByIdAndUpdate(
                _id,
                {Result : parinam,
                status : codestatus.completed},
                
            );

        }
    

        if(language === "javaScript"){
            //spwan a node process 
            //store output to database
            //update the status 
            const filepath =path.join( __dirname , "/code/userscode.js");
            fs.writeFileSync(filepath,code);
            const output = spawn("node",[filepath]);
            
            let stdoutData = '';
            let stderrData = '';
            const MAX_OUTPUT = 1024 * 1024;
            let outputLimitExceeded = false;
            let timeoutt = false;
            const TIME_LIMIT = 10000;

         const timeout = setTimeout(() => {
          stdoutData = "  Time limit Exceeded ";
          timeoutt = true;
          output.kill("SIGKILL");
        }, TIME_LIMIT);

             output.stdout.on('data', (chunk) => {
                if(outputLimitExceeded){
                    return ;
                }
                 stdoutData += chunk.toString();
                if (Buffer.byteLength(stdoutData, "utf8") > MAX_OUTPUT) {
                 outputLimitExceeded = true;
                 stdoutData = "   ======= Output Limit Exceeded =======\n" + "Program produced more than 1 MB of output.";
                output.kill()
                  }
        
              })

             output.stderr.on('data', (chunk) => {
               stderrData += chunk.toString();
              });

              await new Promise<void>(resolve => {
                output.on('close', () => {
                    clearTimeout(timeout);
                    resolve();
                });
              });
            
              let parinam = '';

               if(timeoutt){
                parinam = "   Time limit Exceeded !!!!! "
                
            }
              else if(stdoutData !== ''){
                stdoutData = stdoutData.replace(filepath, "");
                parinam = stdoutData;
              }

              else{
                stderrData = stderrData.replace(filepath, "");
                parinam = stderrData;
              }

            await User.findByIdAndUpdate(
                _id,
                {Result : parinam,
                status : codestatus.completed},
                
            );

            
        }

        if(language === "python3"){
            const filepath = path.join(__dirname , "/code/userscode.py");
            fs.writeFileSync(filepath,code);
            const output = spawn("python3",[filepath]);

            let stdoutData = '';
            let stderrData = '';
            const MAX_OUTPUT = 1024 * 1024;
            let outputLimitExceeded = false;
            const TIME_LIMIT = 10000;
            let timeoutt = false;
           

           const timeout = setTimeout(() => {
           timeoutt = true;
          output.kill("SIGKILL");
        }, TIME_LIMIT);

            output.stdout.on("data",(chunk) => {
                if(timeoutt){
                    return;
                }
                stdoutData += chunk.toString();
                if (Buffer.byteLength(stdoutData, "utf8") > MAX_OUTPUT) {
                 outputLimitExceeded = true;
                 stdoutData = "   ======= Output Limit Exceeded =======\n " + "Program produced more than 1 MB of output." ;
                 output.kill("SIGKILL");
                  }

            })

            output.stderr.on("data", (chunk) => {
                stderrData += chunk.toString();
            })

           

            await new Promise<void>(resolve => {
                output.on("close", () => {
                    clearTimeout(timeout);
                    resolve();
                });
            });

            let parinam = '';

            if(timeoutt){
                parinam = "   Time limit Exceeded !!!!! "
                
            }

            else if(stdoutData !== ''){
                stdoutData = stdoutData.replace(filepath, "");
                parinam = stdoutData;
            }
            else{
                stderrData = stderrData.replace(filepath, "");
                parinam = stderrData;
            }



            await User.findByIdAndUpdate(
                _id,
                {Result : parinam,
                status : codestatus.completed}
                
            );

        }
    }

})

}

)
