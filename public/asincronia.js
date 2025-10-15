
// console.time("loop took")
// let total = 0

// for (let index = 0; index < 500_000_000; index++) {
//     total += index
// }
// console.timeEnd("loop took")

const baseUrl1 = "https://jsonplaceholder.typicode.com"

// metodo comun
const makeRequest = (method, url, callback)=> {
    const xhr = new XMLHttpRequest()
    xhr.open(method, url)
    xhr.responseType = "json"
    xhr.onload = ()=>{
        if(xhr.status >= 200 && xhr.status < 300){
            callback(null, xhr.response)
        }else{
            callback(new Error(xhr.statusText), null)
        }
    }

    xhr.onerror=()=>{
        callback(new Error("Network error"), null)
    }
    xhr.send()
}

// callback hell

// console.time("fetch took")
// makeRequest("GET", `${baseUrl1}/users/1`, (err, user)=>{
//     console.log({user})
//     makeRequest("GET", `${baseUrl1}/posts?userId=${user.id}`, (err, posts)=>{
//         console.log({posts})
//         const post = posts[0]
//         makeRequest("GET", `${baseUrl1}/comments?postId=${post.id}`,(err, comment)=>{
//             console.log({comment})
//             console.timeEnd("fetch took")
//         } )
//     })
// })

// promise
const promMakeRequest = (method, url)=> {

    const promise = new Promise((resolve, reject)=>{
        const xhr = new XMLHttpRequest()
        xhr.open(method, url)
        xhr.responseType = "json"
        xhr.onload = ()=>{
            if(xhr.status >= 200 && xhr.status < 300){
                resolve(xhr.response)
            }else{
                reject(`ERROR DE PETICION ${xhr.status}`)
            }
        }

        xhr.onerror=()=>{
            reject(new Error("Network error"))
        }
        xhr.send()
    })

    return promise
}

function myFetch (url){
    return fetch(url).then((res) => res.json())
}

async function GetDataUserById(id){
    try {
        const user = await myFetch(`${baseUrl1}/users/${id}`)
        const posts = await myFetchc(`${baseUrl1}/posts?userId=${user.id}`)
        const comments = await myFetch(`${baseUrl1}/comments?postId=${posts[0].id}`)
        console.log({user, posts, comments})    
    } catch (error) {
        console.log({error})
    }finally{
        console.log("Esto siempre se ejecuta")
    }
}

GetDataUserById(5)

// const result = myFetch(`${baseUrl1}/users/1`)

// result
// .then((user)  => myFetch(`${baseUrl1}/posts?userId=${user.id}`))
// .then((posts) => myFetch(`${baseUrl1}/comments?postId=${posts[0].id}`))
// .then((comments)=>{
//     console.log({comments})
// })
// .catch((err)=>{
//     console.log("todo salio mal", err)
// }).finally(()=>{
//     console.log("Esto se ejecutaria siempre")
// })

// Peligro de la inversion Of COntrol


// asincronia dada por el entorno timer

// let second = 2

// setTimeout(() => {
//    console.log(`ya pasaron los ${second} segundos`) 
// }, second * 1000);

// console.log('esto se ejecuta al instante')

// // ojo con las operaciones sincronas



// console.log("finalizo el loop", total)
