const mongoose = require('mongoose');
// mongoose.connect('mongodb://localhost:27017/unicorn', {
mongoose.connect('mongodb+srv://vercel-admin-user:sVYsKN9LVY7tduxz@cluster0.sl4lsln.mongodb.net/admin', {
    useNewUrlParser:true,
    useUnifiedTopology: true
    // useCreateIndex:true
}).then(()=>{
    console.log('database connected successfully');
}).catch((e) =>{
    console.log(e);
    // console.log('no connection');
})