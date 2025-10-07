
require('dotenv').config()
const express = require('express')

const app = express()
const port = process.env.PORT
const mongoose = require("mongoose")
const Schema = mongoose.Schema

mongoose.connect(process.env.MONGODB_URL)
.then(()=>{console.log("Conexion éxitosa con la DB!")})
.catch((err)=>{console.log("Hubo un error con la DDBB¡", {err})})

//schema
const taskSchema = new Schema({
    name: String,
    done: Boolean,
    //createBy
})

const Task = mongoose.model("Task", taskSchema)

// servir archivos estacticos
app.use(express.static('public'))
// Middleware para parser BODY de la REQUEST (es como el caso "C")
app.use(express.json())

// A Pasamos una funcion anonima
// app.use((req, res, next) =>{
//     console.log("No especificamos como debe ser el inicio de la ruta")
//     console.log("middleware 1")
//     next()
// })

// B Pasamos una funcion RETORNADA por OTRA FUNCION/METODO
// const logger = {
//     logThis : (whatToLog) =>{
//         return (req, res, next) => {
//             console.log("Middleware 2: ", whatToLog);
//             next()
//         }
//     },
// }

// app.use("/andres", logger.logThis("loggeame esto") )

// // configurar rutas
// app.get('/', (req, res)=> {
//     res.send("hello world!")
// })

app.get("/api/tasks", (req, res)=> {
    Task.find().then((tasks)=>{
        res.status(200).json({ok:true, data:tasks})
    }).catch((err)=>{
        res.status(400).json({ok:false, message:"Hubo un error al obtener las tareas"})
    })
})

// Middleware para parser BODY de la REQUEST (es como el caso "C")
app.post("/api/tasks", express.json(), function(req, res){
    const body = req.body
    
    console.log({body});

    Task.create({
        name:body.text,
        done: false,
        hello: "hola"
    }).then((createdTask)=> {
        res.status(201).json({
            ok:true,
            message:"Tarea creada con éxito",
            data: createdTask
        })
    }).catch((err)=>{
        res.status(400).json({
            ok:false, 
            message: "Error al crear la tarea"
        })
    })
})

app.put("/api/tasks/:id", express.json(), function(req, res){
    const body = req.body
    const id = req.params.id
    console.log({body});

    Task.findByIdAndUpdate(id,{
        name:body.text,
    }).then((updatedTask)=> {
        res.status(200).json({
            ok:true,
            message:"Tarea modificada con éxito",
            data: updatedTask
        })
    }).catch((err)=>{
        res.status(400).json({
            ok:false, 
            message: "Error al modificar la tarea"
        })
    })
})

app.delete("/api/task/:id", express.json(), function(req, res){
    const id = req.params.id
    Task.findByIdAndDelete(id).then((deletedTask)=>{
        res.status(200).json({ok:true, data: deletedTask})
    }).catch(()=>{
        res.status(400).json({ok: false, message: 'Hubo un error al eliminar la tarea'})
    })
})

// poner a escuchar en un puerto
app.listen(port, () => {
    console.log(`App run at port ${port}`);
})