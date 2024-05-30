import { notEmptyMessage } from "@/libs/utils/common";
import { z } from "zod";

export const LoginInputSchema = z.object({
  email: z
    .string()
    .min(1, {
      message: notEmptyMessage("Email"),
    })
    .email({
      message: "Email không hợp lệ",
    }),

  password: z
    .string()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
      "Mật khẩu phải chứa ít nhất 6 ký tự, 1 chữ cái, 1 số và 1 ký tự đặc biệt"
    ),
});

export type LoginInputType = z.infer<typeof LoginInputSchema>;
