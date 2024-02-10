const express = require("express")
const app = express()

//import routes
const home = require("./routes/home")

// middlewares
app.use(express.json())

//routes
app.use("/", home)

// init server
const port = process.env.PORT || 3333

app.listen(port, () => {
    console.log(`[ SERVER ] - O servidor está online operando na porta ${port}.`.green)
})