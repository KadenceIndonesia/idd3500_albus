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