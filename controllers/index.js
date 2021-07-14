const path = require("path")
const session = require("express-session")
const pid = process.env.PID
const axios = require("axios")

global.getData = function(pid, touchpoint){
    return new Promise(resolve => {
        axios.get(process.env.APIURL+"/api/"+pid+"%2F"+touchpoint)
        .then((response) => {
            resolve(response.data)
        })
        .catch(error => {
            resolve(error)
        })
    })
}

exports.getIndex = async function(req,res){
    if(req.session.loggedin==true){
        const login = req.session.data
        var dataSalesBooth = await getData(pid, "salesbooth")
        var dataServicePoint = await getData(pid, "servicepoint")
        var dataKyc = await getData(pid, "kyc")
        var dataCec = await getData(pid, "cec")
        const achievement = [
            {label: "Sales Booth", target: 60, y: dataSalesBooth.length * 100 / 60, count: dataSalesBooth.length, color: "#069E2D" },
            {label: "Service Point", target: 40, y: dataServicePoint.length * 100 / 40, count: dataServicePoint.length, color: "#058E3F" },
            {label: "CEC", target: 65, y: dataCec.length * 100 / 65, count: dataCec.length, color: "#04773B" },
            {label: "KYC", target: 25, y: dataKyc.length * 100 / 25, count: dataKyc.length, color: "#036016" },
        ]

        res.render("index",{
            login: login,
            achievement: achievement
        })
    }else{
        res.redirect("./login")
    }
}

exports.getLogin = (req,res)=>{
    res.send("login")
}