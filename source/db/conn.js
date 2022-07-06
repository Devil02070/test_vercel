const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/unicorn', {
mongoose.connect('mongodb+srv://Ajay1090:hTMr2f7LuJCMeuZA@cluster0.apxowbx.mongodb.net/unicornsoul?retryWrites=true&w=majority', {
    useNewUrlParser:true,
    useUnifiedTopology: true
    // useCreateIndex:true
}).then(()=>{
    console.log('database connected successfully');
}).catch((e) =>{
    console.log(e);
    // console.log('no connection');
})