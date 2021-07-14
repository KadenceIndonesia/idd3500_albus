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

exports.getDetailSalesBooth = async function(req,res){
    if(req.session.loggedin==true){
        const login = req.session.data
        res.render("detail/salesbooth",{
            login: login
        })
    }else{
        res.redirect("../../login")
    }
}

exports.getDetailServicePoint = async function(req,res){
    if(req.session.loggedin==true){
        const login = req.session.data
        res.render("detail/servicepoint",{
            login: login
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
    if(req.session.loggedin==true){
        const login = req.session.data
        res.render("detailcabang",{
            login: login,
            idc: idc
        })
    }else{
        res.redirect("../../login")
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