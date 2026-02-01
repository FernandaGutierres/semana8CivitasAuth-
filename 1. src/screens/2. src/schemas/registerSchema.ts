import { z } from 'zod';

export const civitasRegisterSchema = z.object({
  fullName: z.string().min(3, "El nombre debe ser real"),
  email: z.string().email("Ingrese un correo ciudadano válido"),
  password: z.string().min(8, "Mínimo 8 caracteres para su seguridad"),
  confirmPassword: z.string()
}).refine((data) => data.password === data.confirmPassword, {
  message: "Las contraseñas no coinciden",
  path: ["confirmPassword"],
});
