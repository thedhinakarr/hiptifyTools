import express from "express";


const app = express();
const port = 8001;

app.use(express.json());

/* A total of 34 API endpoints as of 11/11/23 */

app.get("/", (req,res)=>{
    res.send("Server is up");
})

app.listen(port, ()=>{
    console.log("Listening on port",port);
} )