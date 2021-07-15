const mongoose  = require("mongoose")
const Task = require("../models/task")
const axios = require("axios")
const pid = process.env.PID
const moment = require("moment")
const { getJsDateFromExcel } = require("excel-date-to-js");

const dataKota = [
    {"label": "Jabodetabek", "code": 1},
    {"label": "Bandung", "code": 2},
    {"label": "Surabaya", "code": 3},
    {"label": "Malang", "code": 4},
    {"label": "Medan", "code": 5},
    {"label": "Makassar", "code": 6},
    {"label": "Palembang", "code": 7},
    {"label": "Yogyakarta", "code": 8},
    {"label": "Bali", "code": 9},
    {"label": "Semarang", "code": 10}
]

const dataMalls = [
    {"label": "Kota Kasablanka Lt LG", "code": 1},
    {"label": "Grand Indonesia", "code": 2},
    {"label": "Pondok Indah Mall 1", "code": 3},
    {"label": "Sumarecon Mall Serpong", "code": 4},
    {"label": "Sumarecon Mall Bekasi", "code": 5},
    {"label": "Pejaten Village", "code": 6},
    {"label": "TSM Cibubur", "code": 7},
    {"label": "Mall Kelapa Gading 2", "code": 8},
    {"label": "Botani Square", "code": 9},
    {"label": "Lippo Mall Puri", "code": 10},
    {"label": "Central Park", "code": 11},
    {"label": "Supermall Karawaci", "code": 12},
    {"label": "Plaza Atrium", "code": 13},
    {"label": "Blok M Plaza", "code": 14},
    {"label": "Living World Alam Sutra", "code": 15},
    {"label": "TSM Bandung", "code": 16},
    {"label": "Paris Van Java", "code": 17},
    {"label": "Festival Citilink", "code": 18},
    {"label": "Ciwalk", "code": 19},
    {"label": "Paskal 23 Mall", "code": 20},
    {"label": "Royal Plaza", "code": 21},
    {"label": "Tunjungan Plaza 3", "code": 22},
    {"label": "Pakuwon City Mall", "code": 23},
    {"label": "Delta Plaza", "code": 24},
    {"label": "Pakuwon Mall", "code": 25},
    {"label": "Malang Town Square", "code": 26},
    {"label": "Malang Mall Olympic Garden", "code": 27},
    {"label": "Medan Sun Plaza Mall", "code": 28},
    {"label": "Medan Center Point", "code": 29},
    {"label": "Medan Plaza Medan Fair", "code": 30},
    {"label": "Makassar TSM Makassar", "code": 31},
    {"label": "Makassar Panakkukang Mall", "code": 32},
    {"label": "Palembang Icon", "code": 33},
    {"label": "Yogyakarta Plaza Ambarukmo", "code": 34},
    {"label": "Yogyakarta Hartono Mall", "code": 35},
    {"label": "Yogyakarta Jogja City Mall", "code": 36},
    {"label": "Yogyakarta Mall Galleria Jogja", "code": 37},
    {"label": "Yogyakarta Malioboro Mall", "code": 38},
    {"label": "Mall Bali Galeria", "code": 39},
    {"label": "Semarang Paragon City", "code": 40},
    {"label": "Semarang DP Mall", "code": 41},
    {"label": "Semarang Ciputra  Mall", "code": 42},
]

exports.getDetail = async function(req,res){
    if(req.session.loggedin==true){
        const login = req.session.data
        res.render("listcabang",{
            login: login
        })
    }else{
        res.redirect("../../login")
    }
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
                var getTouchPoint = getCode.substr(0, 2)
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

exports.getDetailSalesBooth = async function(req,res){
    if(req.session.loggedin==true){
        const login = req.session.data
        var evd = await getKepoEvd(10)
        var dataExcel = await getData(pid, "salesbooth")
        var data = []
        for (let i = 0; i < evd.length; i++) {
            var evdCode = evd[i].code
            var getLokasi = evdCode.substr(evdCode.length-2, 2)
            var lokasi = parseInt(getLokasi)
                for(let x=0;x<dataExcel.length;x++){
                    if(dataExcel[x]["S0"]==lokasi){
                        const filteredKota = dataKota.find(function(item, i){
                            if(item.code === dataExcel[x]["Kota"]){
                                index = i;
                                return i
                            }
                        })
                        const filteredMalls = dataMalls.find(function(item, i){
                            if(item.code === dataExcel[x]["S0"]){
                                index = i;
                                return i
                            }
                        })
                        data.push({
                            id: evd[i].id,
                            datems: getJsDateFromExcel(dataExcel[x]["TglKunjungan"]),
                            city: filteredKota.label,
                            malls: filteredMalls.label,
                            agent: dataExcel[x]["NamaAgent"],
                            teamleader: dataExcel[x]["NamaLeader"]
                        })
                    }
                }
        }
        res.render("detail/salesbooth",{
            login: login,
            data: data,
            datakota: dataKota,
            datamalls: dataMalls
        })
    }else{
        res.redirect("../../login")
    }
}

exports.getDetailServicePoint = async function(req,res){
    if(req.session.loggedin==true){
        const login = req.session.data
        var evd = await getKepoEvd(20)
        var dataExcel = await getData(pid, "servicepoint")
        var data = []
        for (let i = 0; i < evd.length; i++) {
            var evdCode = evd[i].code
            var getLokasi = evd[i].deskripsi.split("_")
            if(evd[i].filename.length > 0){
                data.push({
                    id: evd[i].id,
                    datems: "asdsd",
                    city: getLokasi[1],
                    malls: getLokasi[2]
                })
            }
        }
        res.render("detail/servicepoint",{
            login: login,
            datakota: dataKota,
            datamalls: dataMalls,
            data: data
        })
    }else{
        res.redirect("../../login")
    }
}
exports.getDetailCec = async function(req,res){
    if(req.session.loggedin==true){
        const login = req.session.data
        res.render("detail/cec",{
            login: login
        })
    }else{
        res.redirect("../../login")
    }
}
exports.getDetailKyc = async function(req,res){
    if(req.session.loggedin==true){
        const login = req.session.data
        res.render("detail/kyc",{
            login: login
        })
    }else{
        res.redirect("../../login")
    }
}

exports.getDetailCabang = async function(req,res){
    const idc = req.params.idc
    var data = await getEvdById(idc)
    if(req.session.loggedin==true){
        const login = req.session.data
        res.render("detailcabang",{
            login: login,
            idc: idc,
            data: data
        })
    }else{
        res.redirect("../../../login")
    }
}

exports.getAchTable = async function(req,res){
    if(req.session.loggedin==true){
        const login = req.session.data
        res.render("achievement/table",{
            login: login
        })
    }else{
        res.redirect("../../login")
    }
}
exports.getAchChart = async function(req,res){
    if(req.session.loggedin==true){
        const login = req.session.data
        res.render("achievement/chart",{
            login: login
        })
    }else{
        res.redirect("../../login")
    }
}