const http = require("http")
const exportFromAnother = require("./another")

function requestController(){
    //console.log({global})
    //console.log({dir: __dirname})
    console.log(`hola que hay de nuevo ${exportFromAnother.name}`)
}
// configurar nuestro servidor
const server = http.createServer(requestController)
server.listen(4000)
