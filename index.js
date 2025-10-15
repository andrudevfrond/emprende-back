
require('dotenv').config()
const express = require('express')
const dbConnet = require('./db/connect')
const cookieParser = require('cookie-parser')

const taskRoutes = require("./routes/task")
const authRoutes = require("./routes/auth")
const { jwtValidation } = require('./middlewares/jwtValidation')

const app = express()
const port = process.env.PORT

dbConnet()

// servir archivos estacticos
app.use(express.static('public', {extensions: ["html", "css", "js"]}))
// Middleware para parser BODY de la REQUEST (es como el caso "C")
app.use(express.json())
app.use(cookieParser())

// Configuración nuestros routes
app.use("/api/auth/login", authRoutes)
app.use(jwtValidation)
app.use("/api/tasks", taskRoutes)

// poner a escuchar en un puerto
app.listen(port, () => {
    console.log(`App run at port ${port}`);
})