
const form = document.querySelector("form")
const inputEmail = document.querySelector("#email")
const inputCode = document.querySelector("#code")
const codeBtn = document.querySelector("#codeBtn")

const baseBackendUrl = `${window.origin}/api`

// nutrir de funcionalidad los botones
form.addEventListener("submit", async function(e){
    e.preventDefault()
    console.log("Intentando iniciar sesión...")

    if(!inputEmail.value) {
        Swal.fire("Ups!", "Debes ingresar un correo", "info")
        return
    }
    if (!inputCode.value){
        Swal.fire("Ups!", "Debes código de ingreso", "info")
        return
    }   

    const res = await fetch(`${baseBackendUrl}/auth/login/${inputEmail.value}`,{
        method:"POST",
        headers:{"Content-type": "application/json"},
        body: JSON.stringify({code: inputCode.value})
    })
    const resJson = await res.json()
    window.location.href = "/"
})

codeBtn.addEventListener("click", async function(e){
    console.log("Pidiendo código...")

    if(!inputEmail.value) {
        Swal.fire("Ups!", "Debes ingresar un correo", "info")
        return
    }

    const res = await fetch(`${baseBackendUrl}/auth/login/${inputEmail.value}/code`,{
        method:"POST",
    })
    const resJson = await res.json()
})