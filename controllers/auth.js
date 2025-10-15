const {transporter} = require('../helpers/mailer')
const jwt = require('jsonwebtoken')
const { User } = require("../Models/user")

const getCode = async (req, res) => {
    const {email} = req.params

    const userdb = await User.findOne({email})
    
    if (!userdb){
        await Userer.create({firstname: "andres",lastname: "galindo", email, Login_code: null})
        return res.status(400).json({ok:false, message:"No existe un usuario con ese correo"})
    }

    let code = ""

    for (let index = 0; index < 6; index++) {
        let character = Math.floor(Math.random() *9)
        code+= character
    }
    
    userdb.Login_code = code
    await userdb.save()

    const result = await transporter.sendMail({
        from: `Andrés Galindo ${process.env.EMAIL}`,
        to: email,
        subject: "Código de inicio de sesión: " + code ,
        body: "Este es tu código para iniciar sesión: " + code
    })
    res.status(200).json({ok: true, message:"Código enviado con éxito!"})
}

const authenticate = async (req, res)=>{
    const {email} = req.params
    const {code} = req.body

    const userdb = await User.findOne({email, Login_code:code})
    
    if (!userdb){
        return res.status(400).json({ok:false, message:"Credenciales invalidas"})
    }

    const tokenPayload={
        _id :userdb._id,
        firstname: userdb.firstname,
        email: userdb.email
    }

    const token = jwt.sign(tokenPayload, process.env.JWT_SECRET_KEY)

    res.cookie("jwt", token)

    res.status(200).json({
        ok: true, 
        data: tokenPayload, 
        message:"Inicio de sesión éxitoso!"
    })
}

module.exports = {
    getCode,
    authenticate
}