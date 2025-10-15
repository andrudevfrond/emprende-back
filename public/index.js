
// ob tner elementos de html y guardarlos en constantes
const createEditBtn = document.querySelector("#create-task")
const input = document.querySelector("#task-name")
const taskDiv = document.querySelector("#tasks")

const baseUrl = `${window.origin}/api/`
let TASK_TO_EDIT = null

// nutrir de funcionalidad a los botones
createEditBtn.addEventListener("click",async function(){
    
    const creating = !TASK_TO_EDIT
    const path = creating ? "tasks" :  `tasks/${TASK_TO_EDIT._id}`
    const method = creating ? "POST" : "PUT"
    
    const tareas = await fetch(`${baseUrl}${path}`, {
        method,
        headers:{"Content-type": "application/json"},
        body: JSON.stringify({text :input.value}),
    })
    
    const resJson = await tareas.json()
    
    await getTasks()
    input.value = ""
    createEditBtn.innerText = "Crear tarea"
    TASK_TO_EDIT = null

    console.log({resJson})
})

async function getTasks(){

    taskDiv.innerHTML = null

    const result = await fetch(`${baseUrl}tasks`)
    const taskJson =  await result.json()
    const tasks = taskJson.data

    for (const task of tasks) {
        const taskContainerDiv = document.createElement('div')
        const taskParagrafh = document.createElement('p')
        taskParagrafh.innerText = task.name

        const deleteTaskBtn = document.createElement('button')
        deleteTaskBtn.innerText = "Borrar"
        deleteTaskBtn.setAttribute('id', task._id)

        deleteTaskBtn.addEventListener("click", (e)=>{
            const taskId = e.target.id
            deleteTaskBtn.innerText = "..."
            fetch(`${baseUrl}tasks/${taskId}`, {
                method: "DELETE",
            }).then(()=>{
                const taskDivDelete = deleteTaskBtn.parentElement
                taskDivDelete.remove()
            })
        })

        taskParagrafh.addEventListener('click', (e)=>{
        input.value = task.name
        createEditBtn.innerText = "Editar tarea"
        TASK_TO_EDIT = task
        console.log({TASK_TO_EDIT})
        })

        taskContainerDiv.append(taskParagrafh)
        taskContainerDiv.append(deleteTaskBtn)

        taskDiv.append(taskContainerDiv)
    }
}

getTasks()