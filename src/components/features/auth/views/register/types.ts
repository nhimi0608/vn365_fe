import { notEmptyMessage } from "@/libs/utils/common";
import { z } from "zod";

export const RegisterInputSchema = z
  .object({
    username: z.string().min(1, {
      message: notEmptyMessage("Tên"),
    }),
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
    phone_number: z
      .string()
      .min(1, {
        message: notEmptyMessage("Số điện thoại"),
      })
      .regex(
        RegExp(/([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/),
        "Số điện thoại không hợp lệ"
      ),
    address: z.string().min(1, {
      message: notEmptyMessage("Địa chỉ"),
    }),
    confirmPassword: z.string().min(1, {
      message: "Nhập lại mật khẩu không được bỏ trống",
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu không khớp",
    path: ["confirmPassword"],
  });

export type RegisterInputType = z.infer<typeof RegisterInputSchema>;
