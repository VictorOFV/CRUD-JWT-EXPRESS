const { z } = require("zod")

const userCreateValidation = z.object({
    name: z.string().min(2, "Seu nome deve conter pelo menos 2 digitos").max(15, "Seu nome deve conter no maximo 15 digitos."),
    email: z.string().email("Por favor utilize um email valido."),
    password: z.string().min(8, "A senha deve conter pelo menos 8 digitos.").max(15, "A senha deve conter no maximo 15 digitos."), 
    confirmPassword: z.string()
})
.refine(data => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/.test(data.password), "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um caractere especial.")
.refine(data => data.password === data.confirmPassword, "As senhas não conferem")

module.exports = userCreateValidation