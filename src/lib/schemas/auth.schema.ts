import z from "zod";

export const registerSchema = z
  .object({
    firstName: z
      .string()
      .nonempty("First name is required")
      .min(2, "First name must be at least 2 characters"),
    lastName: z
      .string()
      .nonempty("Last name is required")
      .min(2, "Last name must be at least 2 characters"),
    username: z
      .string()
      .nonempty("Username is required")
      .min(3, "Username must be at least 3 characters"),
    email: z
      .string()
      .nonempty("Email is required")
      .email("Invalid email address"),
    phone: z
      .string()
      .min(1, "Phone is required")
      .transform((val) => {
        if (!val) return "";

        let phone = val.replace(/^(\+20)/, "");
        if (!phone.startsWith("0")) {
          phone = "0" + phone;
        }
        return phone;
      })
      .refine((val) => /^01[0125][0-9]{8}$/.test(val), {
        message: "Invalid phone number",
      }),
    password: z
      .string()
      .nonempty("Password is required")
      .regex(
        /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/,
        "Password must be at least 8 characters long and include at least one uppercase letter, one lowercase letter, one number, and one special character",
      ),
    confirmPassword: z.string().nonempty("Please confirm your password"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });
export const loginSchema = z.object({
  username: z
    .string()
    .nonempty("Username is required")
    .min(3, "Username must be at least 3 characters"),
  password: z.string().nonempty("Password is required"),
});

export const forgetPassSchema = registerSchema.pick({ email: true });

export const ReceiveOtpSchema = z.object({
  resetCode: z.string().nonempty("Your OTP is required"),
});

export const resetPasswordSchema = z
  .object({
    newPassword: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type loginValues = z.infer<typeof loginSchema>;
export type registerValues = z.infer<typeof registerSchema>;
export type forgetPassValues = z.infer<typeof forgetPassSchema>;
export type ReceiveOtpValues = z.infer<typeof ReceiveOtpSchema>;
export type resetPasswordValues = z.infer<typeof resetPasswordSchema>;
