import z from "zod";

export const registerSchema = z.object({
  user: z.string({
    required_error: "Usuario requerido",
  }),
  email: z
    .string({
      required_error: "Correo requerido",
    })
    .email({
      message: "Correo inválido",
    }),
  password: z
    .string({
      required_error: "Contraseña requerida",
    })
    .min(6, {
      message: "La contraseña debe ser de mínimo 6 caracteres",
    }),
});

export const loginSchema = z.object({
  email: z
    .string({
      required_error: "Correo requerido",
    })
    .email({
      message: "Correo inválido",
    }),
  password: z
    .string({
      required_error: "Contraseña requerido",
    })
    .min(6, {
      message: "La contraseña debe ser de mínimo 6 caracteres",
    }),
});
