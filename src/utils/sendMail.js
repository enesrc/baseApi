const nodemailer = require("nodemailer")

const sendEmail = async (mailoptions) => {
    const transporter = nodemailer.createTransport({
        host: "smtp-mail.outlook.com",
        port: "587",
        secureConnection: "false",
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASSWORD
        },

    })

    transporter.sendMail(mailoptions, (error, info) => {
        if(error) {
            console.log("Mail gönderirken bir sorunla karşılaştık?! Hata: " + error)
            return false
        }
        
        console.log(info.accepted)
        console.log(info.rejected)
        return true
    })
}

module.exports = sendEmail