const express=require("express");
const path=require("path");
const app=express();
require("./db/mongodb")
const port=process.env.PORT||2050;
const static_path=path.join(_dirname , "../public");

app.use(express.static(static_path));
app.set("view engine" , "hbs")



app.get(
    "/" ,(req,res) =>{
        res.render("index,hbs")
    }
);
 app.listen(
    port,() =>{
        console.log(`Server is running at the port number ${port}`)
    }
 )