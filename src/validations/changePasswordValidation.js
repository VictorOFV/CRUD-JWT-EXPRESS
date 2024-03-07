const { z } = require("zod")

const changePasswordValidation = z.object({
    oldPassword: z.string(),
    newPassword: z.string().min(8, "A senha deve conter pelo menos 8 digitos.").max(30, "A senha deve conter no maximo 30 digitos."),
    confirmNewPassword: z.string()
})
.refine(data => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]+$/.test(data.newPassword), "A senha deve conter pelo menos uma letra minúscula, uma letra maiúscula, um número e um caractere especial.")
.refine(data => data.newPassword === data.confirmNewPassword, "As senhas não conferem")

module.exports = changePasswordValidation