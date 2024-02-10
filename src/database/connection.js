const mongoose = require("mongoose")

mongoose.connect(process.env.DB_CONNECTION_URL)
.then(() => {
    console.log("[ DATABASE ] - Conectado ao banco de dados.".green)
})
.catch((error) => {
    console.log("[ DATABASE ] - Erro ao se conectar ao banco de dados.".red, error.message)
})