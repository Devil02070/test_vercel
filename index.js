const express = require('express');
const app = express();

const port = process.env.PORT || 8000;

app.get("/",(req,res)=>{
    res.send("<h1>Bhai sahab kidaaan??</h1>");
})


app.listen(port, ()=>{
    console.log('server running at 8000');
})