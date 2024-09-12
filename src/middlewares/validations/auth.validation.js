const joi = require("joi")
const APIError = require("../../utils/errors")

class AuthValidation {
    constructor() {}

    static register = async (req, res, next) => {
        try {
            await joi.object({
                name: joi.string().trim().min(2).max(30).required().messages({
                    "string.base": "İsim Alanı Normal Metin Olmalı!",
                    "string.empty": "İsim Alanı Boş Olmamalı!",
                    "string.min": "İsim Alanı En Az 2 Karakter Olmalı!",
                    "string.max": "İsim Alanı En Fazla 30 Karakter Olmalı!",
                    "string.required": "İsim Alanı Zorunludur!"
                }),
                lastname: joi.string().trim().min(2).max(30).required().messages({
                    "string.base": "Soyisim Alanı Normal Metin Olmalı!",
                    "string.empty": "Soyisim Alanı Boş Olmamalı!",
                    "string.min": "Soyisim Alanı En Az 2 Karakter Olmalı!",
                    "string.max": "Soyisim Alanı En Fazla 30 Karakter Olmalı!",
                    "string.required": "Soyisim Alanı Zorunludur!"
                }),
                email: joi.string().trim().email().min(5).max(200).required().messages({
                    "string.base": "Email Alanı Normal Metin Olmalı!",
                    "string.empty": "Email Alanı Boş Olmamalı!",
                    "string.email": "Geçerli Bir Email Giriniz!",
                    "string.min": "Email Alanı En Az 5 Karakter Olmalı!",
                    "string.max": "Email Alanı En Fazla 200 Karakter Olmalı!",
                    "string.required": "Email Alanı Zorunludur!"
                }),
                password: joi.string().trim().min(6).max(30).required().messages({
                    "string.base": "Şifre Alanı Normal Metin Olmalı!",
                    "string.empty": "Şifre Alanı Boş Olmamalı!",
                    "string.min": "Şifre Alanı En Az 6 Karakter Olmalı!",
                    "string.max": "Şifre Alanı En Fazla 30 Karakter Olmalı!",
                    "string.required": "Şifre Alanı Zorunludur!"
                })
                
            }).validateAsync(req.body)
        } 
        catch (error) {
            throw new APIError(error.message, 400)
        }   
        next()
    }

    static login = async (req, res, next) => {
        try {
            await joi.object({
                email: joi.string().trim().email().min(5).max(200).required().messages({
                    "string.base": "Email Alanı Normal Metin Olmalı!",
                    "string.empty": "Email Alanı Boş Olmamalı!",
                    "string.email": "Geçerli Bir Email Giriniz!",
                    "string.min": "Email Alanı En Az 5 Karakter Olmalı!",
                    "string.max": "Email Alanı En Fazla 200 Karakter Olmalı!",
                    "string.required": "Email Alanı Zorunludur!"
                }),
                password: joi.string().trim().min(6).max(30).required().messages({
                    "string.base": "Şifre Alanı Normal Metin Olmalı!",
                    "string.empty": "Şifre Alanı Boş Olmamalı!",
                    "string.min": "Şifre Alanı En Az 6 Karakter Olmalı!",
                    "string.max": "Şifre Alanı En Fazla 30 Karakter Olmalı!",
                    "string.required": "Şifre Alanı Zorunludur!"
                })
            }).validateAsync(req.body)
        }
        catch (error) {
            throw new APIError(error.message, 400)
        } 
        next()
    }
        
}

module.exports = AuthValidation