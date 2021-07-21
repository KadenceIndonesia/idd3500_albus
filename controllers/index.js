const path = require("path")
const session = require("express-session")
const pid = process.env.PID
const axios = require("axios")
require("../library")


exports.getIndex = async function(req,res){
    if(req.session.loggedin==true){
        const login = req.session.data
        var dataSalesBooth = await getData(pid, "salesbooth")
        var dataServicePoint = await getData(pid, "servicepoint")
        var dataKyc = await getData(pid, "kyc")
        var dataCecChat = await getData(pid, "cec%2Fchat")
        var dataCecCall = await getData(pid, "cec%2Fcallcenter")
        var dataCecTwitter = await getData(pid, "cec%2Ftwitter")
        var dataCecEmail = await getData(pid, "cec%2Femail")
        var countCec = dataCecChat.length + dataCecCall.length + dataCecTwitter.length + dataCecEmail.length
        const achievement = [
            {label: "Sales Booth", target: 60, y: parseFloat((dataSalesBooth.length * 100 / 60).toFixed(2)), count: dataSalesBooth.length, color: "#069E2D" },
            {label: "Service Point", target: 40, y: parseFloat((dataServicePoint.length * 100 / 40).toFixed(2)), count: dataServicePoint.length, color: "#058E3F" },
            {label: "CEC", target: 65, y: parseFloat((countCec * 100 / 65).toFixed(2)), count: countCec, color: "#04773B" },
            {label: "KYC", target: 25, y: parseFloat((dataKyc.length * 100 / 25).toFixed(2)), count: dataKyc.length, color: "#036016" },
        ]
        const detailCec = [
            {label: "Chat", target: 30, y: parseFloat((dataCecChat.length * 100 / 60).toFixed(2)), count: dataCecChat.length, color: "#069E2D" },
            {label: "Call", target: 30, y: parseFloat((dataCecCall.length * 100 / 60).toFixed(2)), count: dataCecCall.length, color: "#058E3F" },
            {label: "Email", target: 30, y: parseFloat((dataCecEmail.length * 100 / 60).toFixed(2)), count: dataCecEmail.length, color: "#04773B" },
            {label: "Twitter", target: 30, y: parseFloat((dataCecTwitter.length * 100 / 60).toFixed(2)), count: dataCecTwitter.length, color: "#036016" }
        ]
        res.render("index",{
            login: login,
            achievement: achievement,
            detailcec: detailCec
        })
    }else{
        res.redirect("./login")
    }
}

exports.getLogin = (req,res)=>{
    res.send("login")
}