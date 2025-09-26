
require('dotenv').config()
const http = require("http")
const exportFromAnother = require("./another")

function requestController(){
    //console.log({global})
    //console.log({dir: __dirname})
    console.log(`hola que hay de nuevo ${exportFromAnother.name}`)
}
// configurar nuestro servidor

const PORT = process.env.PORT

const server = http.createServer(requestController)
server.listen(PORT, function(){
    console.log("Aplicacion corriendo en el puerto" + PORT)
})
