import express from 'express'

const app = express()

app.listen(3000, ()=>{
    console.log("Server is running on port 3000!")
})

app.get('/hello',(req,res)=>{
    console.log("Hello")
    res.status(200).send("Hello")
})