const express = require("express")
const bodyParser = require("body-parser")
const ejs = require("ejs")
require("dotenv").config()
const indexRoutes = require("./routes/index");
const loginRoutes = require("./routes/login")
const session = require("express-session")

global.baseurl = function(){
	var url = process.env.DOMAIN+":"+process.env.PORT+"/";
    return url;
}
const app = express();
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"));
app.use(session({
    secret: process.env.PROJECT,
    resave: true,
    saveUninitialized: true,
    name: process.env.PROJECT
}))
app.use("/", indexRoutes)
app.use("/login", loginRoutes)

app.listen(process.env.PORT, (req,res) => {
    
})