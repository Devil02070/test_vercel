const express = require('express');
const app = express();

const port = process.env.PORT || 8000;

const path = require("path");
const hbs = require("hbs");

const static_path = path.join(__dirname, './public');
const temp_path = path.join(__dirname, './templates/views');
const partials = path.join(__dirname, './templates/partials');

console.log(static_path);
console.log(temp_path);
console.log(partials);

app.use(express.static(static_path));
app.set('view engine', 'hbs');
app.set('views', temp_path);
hbs.registerPartials(partials);


app.get("/",(req,res)=>{
    res.send("<h1>Bhai sahab kidaaan??</h1>");
})


app.listen(port, ()=>{
    console.log('server running at 8000');
})