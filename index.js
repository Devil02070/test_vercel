const express = require('express');
const app = express();

const port = process.env.PORT || 8000;

const path = require("path");
const hbs = require("hbs");

// const static_path = path.join(__dirname, './public');
// const temp_path = path.join(__dirname, './templates/views');
// const partials = path.join(__dirname, './templates/partials');

// console.log(static_path);
// console.log(temp_path);
// console.log(partials);

// app.use(express.static(static_path));
// app.set('view engine', 'hbs');
// app.set('views', temp_path);
// hbs.registerPartials(partials);


// app.get("/",(req,res)=>{
//     res.status(200).render('home');
//     // res.send("<h1>Hello Dude!</h1>");
// })


// app.listen(port, ()=>{
//     console.log('server running at 8000');
// })

const session = require('express-session');
app.use(session({
    secret: 'asdfhrfbgjhgr',
    resave: false,
    saveUninitialized: true,
    // cookie: { maxAge: 60000 }
}))

require("./source/db/conn");
const Register = require('./source/models/registers');
const Collection = require('./source/models/collection');
const { Session } = require('inspector');

const static_path = path.join(__dirname,"./public");  
const temp_path = path.join(__dirname,"./templates/views");  
const common_file_path = path.join(__dirname,"./templates/partials");   

app.use(express.json());
app.use(express.urlencoded({extended:false}));       // to get form data

app.use(express.static(static_path))
app.set('view engine', 'hbs');
app.set("views", temp_path);
hbs.registerPartials(common_file_path);

//routing----------------------------------------------------------------**>>
app.get('/login', (req,res)=>{
    res.render('login');
});
app.get('/', (req,res)=>{
    res.status(200).render('login');
});
app.get('/register', (req,res)=>{
    res.status(200).render('register');
});
app.get('/index', (req,res)=>{
    if(req.session.name){
        res.render('index',{
            current_user: req.session.name,
            c_user_email: req.session.email
        });
    }else{
        res.redirect('/');
    }
});
app.get("/about",(req,res)=>{
    if(req.session.email){
        res.render("about");
    }else{
        res.redirect('/');
    }
});
app.get("/inventory",(req,res)=>{
    if(req.session.email){
    res.status(200).render("inventory");
    }else{
        res.redirect('/');
    }
});
app.get('/account',(req,res)=>{
    if(req.session.email){
        res.render('account',{
            user_id: req.session.user_id,
            current_user: req.session.name,
            c_user_email: req.session.email,
            c_user_number: req.session.number
        });
    }else{
        res.redirect('/');
    }
});
app.get("/contact_us",(req,res)=>{
    if(req.session.email){
    res.status(200).render("contact_us");
    }else{
        res.redirect('/');
    }
});
app.get("/logout", (req,res)=>{
    req.session.destroy((err)=>{
        if(err){
            console.log(err)
        }else{
            res.redirect('/')
        }
    })
})
app.get('*',(req,res)=>{
    res.render("error");
})

app.listen(port, ()=>{
    console.log(`Server running at port ${port}`); 
})


//register
app.post("/register", async (req,res)=>{
    try{
        const password = req.body.password;
        const confirm_password = req.body.confirmpassword;
        if(password === confirm_password){
            const Reg_Student = new Register({
                name: req.body.name,
                email: req.body.email,
                password: password,
                confirmpassword: confirm_password,
                date_of_birth: req.body.date_of_birth,
                number: req.body.number,
                gender: req.body.gender
            })
            const registered = await Reg_Student.save();
            res.status(200).render('login',{
                success: "User Registered Successfully.. Please Login.!"
            });
        }else{
            // res.send('Password did not match.')
            res.render('register',{
                password_err: "Password did not match."
            })
        } 
    }
    catch(error){
        const user_name = req.body.name;
        if(user_name !== '' && req.body.email !== '' && req.body.password !== '' && req.body.confirmpassword !== '' && req.body.date_of_birth !== '' && user_name !== '' && req.body.number !== ''){
           // email validation
            const reg_email = req.body.email;
            const check_email = await Register.findOne({email:reg_email});
            const eml = check_email.email;
            if(eml){
                res.render("register",{
                    email_err: "Email Already Registered"
                })
            }
        }else{
            res.render('register',{
                empty_err: "All fields Required"
            });
        }
        // res.status(400).send(error);
    }

}) 


// login
app.post('/login',async(req,res)=>{
    try{
        const email = req.body.email;
        const password = req.body.password;
        
        const user_email = await Register.findOne({email:email}); 
        const name = user_email.name;
        if(user_email.password === password){
            // console.log(req.session)
            req.session.name = name;
            req.session.email = user_email.email;
            req.session.number = user_email.number;
            req.session.user_id = user_email._id;
            // sess = req.session;
            // sess.name = name;
            // sess.email = user_email.email;
            // sess.number = user_email.number;
            // sess.user_id = user_email._id;
            res.redirect('/index');
        }else{
            // res.redirect('/');
            res.render('login',{
                login_err: "Invalid password.."
            })
        }
    }catch(error){
        // res.redirect('/');
        res.render('login', { 
            login_err: "Invalid Details.. Please Register First.!"
        });
        // res.status(400).send("Invalid email! Please Register First.");
    }
})
