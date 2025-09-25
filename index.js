const http = require("http")
const exportFromAnother = require("./another")

function requestController(){
    //console.log({global})
    //console.log({dir: __dirname})
    console.log({http})
}
// configurar nuestro servidor
const server = http.createServer(requestController)
server.listen(4000)
