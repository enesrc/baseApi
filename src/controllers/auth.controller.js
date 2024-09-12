const User = require('../models/user.model.js');
const bcrypt = require('bcrypt');
const APIError = require('../utils/errors.js');
const Response = require('../utils/response.js');
const { createToken } = require('../middlewares/auth.js');

const login = async (req, res) => {
    console.log(login);
    
    const { email, password } = req.body
    
    const user = await User.findOne({email})
    
    if(!user)
        throw new APIError("ERROR> Email veya Şifre Hatalı (email)<ERROR")

    const resultOfComparing = await bcrypt.compare(password, user.password)

    if(!resultOfComparing)
        throw new APIError("ERROR> Email veya Şifre Hatalı (sifre)<ERROR")

    createToken(user, res)
}

const register = async (req, res) => {
    const { email } = req.body

    const user = await User.findOne({email: email});
    
    if(user)
        throw new APIError("Girmiş Olduğunuz Email Kullanımda!", 401)

    req.body.password = await bcrypt.hash(req.body.password, 10);

    console.log("hash şifre: ", req.body.password);

    const userSave = new User(req.body);

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

module.exports = {
    login,
    register,
    me
}