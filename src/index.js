
const express=require("express");
const path = require("path")
const app=express();
const port=2050;
const hbs=require("hbs")

const tempelatePath = path.join(__dirname,'../tempelates')

const LogInCollection = require("./mongodb");
const { Collection } = require("mongoose");

app.use(express.urlencoded({ extended: false }))
app.use(express.json())
app.set("view engine" , "hbs")
app.set("views" , tempelatePath)

app.get('/signup', (req, res) => {
    res.render('signup')
})

app.get('/login' , (req, res) => {
    res.render('login')
})

app.get('/', (req, res) => {
    res.render('login')
})


// app.get("/" ,(req,res) =>{
//         res.send("Learnify")
//     }
// );


app.post('/signup', async (req, res) => {
    
    // const data = new LogInCollection({
    //     name: req.body.name,
    //     password: req.body.password
    // })
    // await data.save()

    const data = {
        name: req.body.name,
        password: req.body.password
    }

    // await LogInCollection.insertMany([data])

    // res.render('home')

    const checking = await LogInCollection.findOne({ name: req.body.name })

//    try{
//     if (checking.name === req.body.name && checking.password===req.body.password) {
//         res.send("user details already exists")
//     }
//     else{
//         await LogInCollection.insertMany([data])
//     }
//    }
//    catch{
//     res.send("wrong inputs")
//    }

//     res.status(201).render("home", {
//         naming: req.body.name
//     })


const { name, password } = req.body;

try {
    const existingUser = await LogInCollection.findOne({ name });

    if (existingUser) {
        // User with the same name already exists in the database
        return res.send("User with this name already exists");
    }

    // User doesn't exist, proceed to create a new user
    const newUser = new LogInCollection({ name, password });
    await newUser.save();
    
    res.status(201).render("home", { naming: name });
} catch (error) {
    console.error(error);
    res.send("Error signing up");
}




})


app.post('/login', async (req, res) => {

    try {
        const check = await LogInCollection.findOne({ name: req.body.name })

        if (check.password === req.body.password) {
            res.status(201).render("home", { naming: `${req.body.password}+${req.body.name}` })
        }

        else {
            res.send("incorrect password")
        }


    } 
    
    catch (e) {

        res.send("wrong details")
        

    }


})


 app.listen(
    port,() =>{
        console.log(`Server is running at the port number ${port}`)
    }
 )