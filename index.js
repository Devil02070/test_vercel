const express = require('express');
const app = express();

const port = process.env.PORT || 8000;

app.get("/",(req,res)=>{
    res.send("hii");
})


app.listen(port, ()=>{
    console.log('server running at 8000');
})