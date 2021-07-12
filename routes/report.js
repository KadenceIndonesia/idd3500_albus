const express = require("express")
const reportControllers = require("../controllers/report")
const Router = express()

Router.get("/detail", reportControllers.getDetail)
Router.get("/detail/:idc", reportControllers.getDetailCabang)
Router.get("/ach/table", reportControllers.getAchTable)
Router.get("/ach/chart", reportControllers.getAchChart)

module.exports = Router;