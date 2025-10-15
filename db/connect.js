const mongoose = require("mongoose")

const dbConnet = ()=>{
    mongoose.connect(process.env.MONGODB_URL)
    .then(()=>{console.log("Conexion éxitosa con la DB!")})
    .catch((err)=>{console.log("Hubo un error con la DDBB¡", {err})})
}

module.exports = dbConnet

