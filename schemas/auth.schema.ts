import z from "zod"


export const AuthSchema = z.object({
  email: z.email("Geçersiz email adresi"),
  password: z.string().min(6, "Parola en az 6 karakter olmalı."),
})
export type AuthInput = z.infer<typeof AuthSchema>

