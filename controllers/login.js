const path = require("path")
const axios = require("axios")
const session = require("express-session")
require("dotenv").config()
exports.getLogin = (req,res)=>{
    res.render("login")
}
global.getAuth = function(pid, email, pass){
    return new Promise(resolve => {
        axios.post('http://survey.kadence.co.id:9999/auth/login',{
            pid: pid,
            email: email,
            password: pass
        })
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            resolve(err)
        })
    })
}
exports.getAuth = async function(req,res){
    var pid = req.body.pid
    var email = req.body.email
    var pass = req.body.password
    const auth = await getAuth(pid, email, pass)
    if(auth.message=='success'){
        req.session.loggedin = true
        req.session.data = auth.login
        res.redirect("../../")
    }else{
        console.log(auth)
        res.redirect("../")
    }
}