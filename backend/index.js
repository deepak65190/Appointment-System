require("dotenv").config() ;
const express=require("express") ;

const {connection}=require("./config/db") ;

const app=express() ;
app.use(express.json()) ;

app.get("/" ,(req,res)=>{
    try{
        res.send("welcome to the appointemt system")
    }catch(err){
        console.log(err.message)
    }
}) ;

const PORT =process.env.PORT||8080
app.listen(PORT ,async(req,res)=>{
    try{
await connection ;
console.log("connected to the  server")
console.log(`running on port number ${PORT}`)
    }catch(err){
        console.log(err) ;
        process.exit(1)
    }
})