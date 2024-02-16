require("express-async-errors")
const express = require("express")
const app = express()

//import routes
const home = require("./routes/home")
const users = require("./routes/users")
const login = require("./routes/login")
const checklist = require("./routes/checklist")
const task = require("./routes/task")

//import middlewares
const zodValidationErrorHandler = require("./middlewares/zodValidationErrorHandler");
const errorHandler = require("./middlewares/errorHandler")
const apiErrorHandle = require("./middlewares/ApiErrorHandle")

// middlewares
app.use(express.json())

//routes
app.use("/", home)
app.use("/users", users)
app.use("/login", login)
app.use("/checklist", checklist)
app.use("/task", task)

// error middlewares
app.use(zodValidationErrorHandler)
app.use(apiErrorHandle)
app.use(errorHandler)

// init server
const port = process.env.PORT || 3333

app.listen(port, () => {
    console.log(`[ SERVER ] - O servidor está online operando na porta ${port}.`.green)
})