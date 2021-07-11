const path = require("path")
const session = require("express-session")

exports.getIndex = async function(req,res){
    if(req.session.loggedin==true){
        const login = req.session.data
        res.render("index",{
            login: login
        })
    }else{
        res.redirect("./login")
    }
}

exports.getLogin = (req,res)=>{
    res.send("login")
}