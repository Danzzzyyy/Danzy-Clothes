import dotenv from 'dotenv';
import connectDB from './DB/server.js'
import app from './app.js';

dotenv.config({
    path:'./.env'
})

connectDB()
.then(()=>{
    app.on("error",(e)=>{
        console.log("Error: ",e);
        throw e
    })
    
    app.listen(process.env.PORT || 8000, ()=>{
        console.log(`Server is running at port: ${process.env.PORT}`);
        
    })
})
.catch((e)=>{
    console.log("Mongo db connection failed !!! ",e)
})

