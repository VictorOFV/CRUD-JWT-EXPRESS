const { z } = require("zod")

const userCreateValidation = z.object({
    name: z.string().min(2, "Seu nome deve conter pelo menos 2 digitos").max(30, "Seu nome deve conter no maximo 30 digitos."),
    email: z.string().email("Por favor utilize um email valido."),
    username: z.string().min(2, "O username deve conter pelo menos 2 caracteres.").max(15, "O username de conter no maximo 15 caracteres.").toLowerCase(),
    password: z.string().min(8, "A senha deve conter pelo menos 8 digitos.").max(30, "A senha deve conter no maximo 30 digitos."), 
    confirmPassword: z.string()
})
.refine(data => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/.test(data.password), "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um caractere especial.")
.refine(data => data.password === data.confirmPassword, "As senhas não conferem")

module.exports = userCreateValidation