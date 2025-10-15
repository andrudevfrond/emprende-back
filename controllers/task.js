
const { Task } = require("../Models/task")

const getAll = (req, res)=> {
    Task.find().then((tasks)=>{
        res.status(200).json({ok:true, data:tasks})
    }).catch((err)=>{
        res.status(400).json({ok:false, message:"Hubo un error al obtener las tareas"})
    })
}

const create = (req, res) =>{
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
}

const updated = (req, res)=>{
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
}

const deleted = (req, res)=>{
    const id = req.params.id
    Task.findByIdAndDelete(id).then((deletedTask)=>{
        res.status(200).json({ok:true, data: deletedTask})
    }).catch(()=>{
        res.status(400).json({ok: false, message: 'Hubo un error al eliminar la tarea'})
    })
}

module.exports = {
    getAll,
    create,
    updated,
    deleted
}