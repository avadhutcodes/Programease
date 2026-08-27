import {createClient} from "redis";

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
            await new Promise(resolve => setTimeout(resolve,5000));  
        }

        if(language === "js"){
            console.log("running user's js code");
            //spwan a node process 
            //store output to database
            //update the status 
        }

        if(language === "python"){
            console.log("running user's python code");
            await new Promise(resolve => setTimeout(resolve,5000));  
        }


    }

})


