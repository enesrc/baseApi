const rateLimit = require("express-rate-limit")

const skipList = ["::1"] //localhost'ta limite takılmamak için

const apiLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: (req, res) => {
        console.log("api url: " + req.url)
        console.log("api ip: " + req.ip)
        if(req.url == "/login" || req.url == "/register")
            return 5
        else
            return 100
    },
    message: { 
        success: false,
        message: "Çok fazla istekte bulundunuz !"
    },
    standardHeaders: true,
    legacyHeaders: false,
    skip: (req, res) => skipList.includes(req.ip)
})

module.exports = apiLimiter