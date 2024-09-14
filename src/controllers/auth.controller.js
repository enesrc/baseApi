const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const APIError = require('../utils/errors.js');
const Response = require('../utils/response.js');
const { createToken } = require('../middlewares/auth.js');
const crypto = require('crypto');
const sendEmail = require('../utils/sendMail.js');
const moment = require('moment');

const login = async (req, res) => {
    const { email, password } = req.body

    const user = await User.findOne({email})
    
    if(!user)
        throw new APIError("Email veya Şifre Hatalı (email [for dev])")

    const resultOfComparing = await bcrypt.compare(password, user.password)

    if(!resultOfComparing)
        throw new APIError("Email veya Şifre Hatalı (sifre [for dev])")

    createToken(user, res)
}

const register = async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({email: email});
    
    if(user)
        throw new APIError("Girmiş Olduğunuz Email Kullanımda!", 401)

    req.body.password = await bcrypt.hash(req.body.password, 10)

    const userSave = new User(req.body)

    await userSave.save()
        .then((data)=>{
            return new Response(data, "Kayıt Başarıyla Eklendi").created(res)
        })
        .catch((err)=>{
            throw new APIError("Kayıt Eklenemedi!", 400)
        })
}

const me = async (req, res) => {
    return new Response(req.user).success(res)
}

const forgotPassword = async (req, res) => {
    const email = req.body.email

    const user = await User.findOne({email}).select("name lastname email")

    if(!user){
        return new APIError("Böyle bir kullanıcı yok", 400)
    }

    const resetCode = crypto.randomBytes(3).toString("hex")

    await sendEmail({
        from: process.env.EMAIL_USER,
        to: user.email,
        subject: "Şifre Sıfırlama",
        text: `Şifre sıfırlama kodunuz: ${resetCode}`
    })

    await User.updateOne(
    {email},
    {
        reset: {
            code: resetCode,
            time: moment(new Date()).add(15, "minute").format("YYYY-MM-DD HH:mm:ss")
        }
    })

    return new Response(true, "Lütfen Mail Kutunuzu Kontrol Edin..").success(res)
}

module.exports = {
    login,
    register,
    me,
    forgotPassword
}