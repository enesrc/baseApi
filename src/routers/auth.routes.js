const router = require('express').Router();
const {login, register, me, forgotPassword} = require("../controllers/auth.controller");
const { tokenCheck } = require('../middlewares/auth');
const authValidation = require("../middlewares/validations/auth.validation")

router.post('/login', authValidation.login, login);

router.post('/register', authValidation.register, register);

router.get('/me', tokenCheck, me)

router.post('/forgot-password', forgotPassword)

module.exports = router;
