import { notEmptyMessage } from "@/libs/utils/common";
import { z } from "zod";

const roleSchema = z.enum(["ADMIN", "USER"]);

export const UserInputSchema = z.object({
  name: z.string().min(1, {
    message: notEmptyMessage("Tên"),
  }),
  email: z
    .string()
    .email({
      message: "Email không hợp lệ",
    })
    .min(1, {
      message: notEmptyMessage("Email"),
    }),
  phone_number: z
    .string()
    .min(1, {
      message: notEmptyMessage("Số điện thoại"),
    })
    .regex(
      RegExp(/([+84|84|0]+(3|5|7|8|9|1[2|6|8|9]))+([0-9]{8})\b/),
      "Số điện thoại không hợp lệ"
    ),
  password: z
    .string()
    .trim()
    .regex(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
      "Mật khẩu phải chứa ít nhất 6 ký tự, 1 chữ cái, 1 số và 1 ký tự đặc biệt"
    ),
  address: z.string().min(1, {
    message: notEmptyMessage("Địa chỉ"),
  }),
  role: roleSchema,
});

export type UserInputType = z.infer<typeof UserInputSchema>;
export type RoleType = z.infer<typeof roleSchema>;

export const UserFilterSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
});

export type UserFilterType = z.infer<typeof UserFilterSchema>;
