// ***************** IMPORTS *****************//
const router = require('express').Router();
const Employee = require('../Models/EmpModels');
const bcrypt = require('bcryptjs');
const ejs = require('ejs');
/////////////////= IMPORTS DONE =/////////////////



// ROUTES
    // -- TO SIGNUP A USER localhost:4000/emp/signup - POST
    // -- TO LOGIN localhost:4000/emp/login - POST
    // -- TO DISPLAY ALL USERS localhost:4000/emp/ - GET
    

// ***************** CRUD COMMANDS *****************//
router

// Code for displaying all users - access page -> localhost:4000/emp/ 

    .get('/', async (req,res) => {
        try{
            const allemp = await Employee.find();
            if(allemp.length ===0 ){
                res.status(400).send("No employee data to display");
            }
            else{
                res.send(allemp);
            }
        }catch(err){
            res.status(400).send(err);
    }
    })


// Code for creating user - access page -> localhost:4000/users/signup 
    .get('/signup', async(req,res)=> res.render('../views/signup.ejs'))

    .post('/signup', async(req,res)=>{

        // checking if user already in the database

        const emailExsist = await Employee.findOne({email :req.body.email});
        if(emailExsist){
            return res.status(400).send("Email Already Exsist");
        }

        // hashing the password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(req.body.password, salt);

        // crearting new user
        const newEmp = await new Employee({
            name : req.body.name,
            email: req.body.email,
            password : hashPassword
        });
        try{
            // saving the user
            const saveEmp = await newEmp.save();
            // res.send({saveEmp: newEmp._id});
            console.log(newEmp);

        } catch(err){
            return res.status(400).send(err);
        }
        res.redirect('/emp/login');
    })


// Code for logging in  - access page -> localhost:4000/emp/login 
    .get('/login', async(req,res)=> res.render('../views/login.ejs'))
    
    .post('/login', async (req,res)=>{

        // checking if the email exsist on db or not
        try{
            const emp = await Employee.findOne({email :req.body.email});
            if(!emp){
                return res.render('../views/status.ejs', {message: "Oops! Something wrong with your email", status: "Wrong Email", option: "Retry"});
            }

            // check for password is correct or not
            const validPass = await bcrypt.compare(req.body.password, emp.password);
            if(!validPass){
                return  res.render('../views/status.ejs', {message: 'Oops, Your password is wrong', status: "Wrong Password", option: "Retry"});
            }
            
            // Display a private page on successful login
            res.render('../views/status.ejs', {message: "Congrats ! You are signed in successfully", status : "Logged In", option: "Logout"});
        }catch(e){
           res.send(e);
        }
    }
    )
/////////////////= CRUD COMMANDS DONE =/////////////////

module.exports = router;