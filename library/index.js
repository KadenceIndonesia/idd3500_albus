const axios = require("axios")
const Task = require("../models/task")

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

global.getKepoEvd = function(touchpointCode){
    return new Promise(resolve => {
        Task.find({}).exec()
        .then(response => {
            var dt = []
            for (let i = 0; i < response.length; i++) {
                var getCode = response[i].code
                var tostr = ''+getCode
                var getTouchPoint = tostr.substr(0, 2)
                var touchPoint = parseInt(getTouchPoint)
                if(touchPoint == touchpointCode){
                    dt.push(response[i])
                }
            }
            resolve(dt)
        })
        .catch(error => {
            resolve(error)
        })
    })
}

global.getAllEvd = function(){
    return new Promise(resolve => {
        Task.find({}).exec()
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            resolve(error)
        })
    })
}

global.getEvdById = function(id){
    return new Promise(resolve => {
        Task.find({id: id}).exec()
        .then(response => {
            resolve(response)
        })
        .catch(error => {
            resolve(error)
        })
    })
}

global.getAuth = function(pid, email, pass){
    return new Promise(resolve => {
        axios.post(process.env.APIURL+'/auth/login',{
            pid: pid,
            email: email,
            password: pass
        })
        .then((response) => {
            resolve(response.data)
        })
        .catch((error) => {
            resolve(error)
        })
    })
}