import { z } from "zod";

export const loginSchema = z.object({
  user: z.string().min(1, "Usuário é obrigatório"),

  pass: z.string().min(6, "A senha deve possuir pelo menos 6 caracteres"),
});

export type LoginFormData = z.infer<typeof loginSchema>;
