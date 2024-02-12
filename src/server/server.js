const express = require("express")
const app = express()

//import routes
const home = require("./routes/home")
const users = require("./routes/users")

// middlewares
app.use(express.json())

//routes
app.use("/", home)
app.use("/users", users)

// init server
const port = process.env.PORT || 3333

app.listen(port, () => {
    console.log(`[ SERVER ] - O servidor está online operando na porta ${port}.`.green)
})