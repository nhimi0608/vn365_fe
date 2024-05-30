import { notEmptyMessage } from "@/libs/utils/common";
import { z } from "zod";

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
  address: z.string().min(1, {
    message: notEmptyMessage("Địa chỉ"),
  }),
});

export type UserInputType = z.infer<typeof UserInputSchema>;

export const ChangePasswordInputSchema = z
  .object({
    current_password: z
      .string()
      .trim()
      .min(1, {
        message: notEmptyMessage("Mật khẩu hiện tại"),
      })
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
        "Mật khẩu phải chứa ít nhất 6 ký tự, 1 chữ cái, 1 số và 1 ký tự đặc biệt"
      ),
    new_password: z
      .string()
      .min(1, {
        message: notEmptyMessage("Mật khẩu mới"),
      })
      .regex(
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9]).{6,}$/,
        "Mật khẩu phải chứa ít nhất 6 ký tự, 1 chữ cái, 1 số và 1 ký tự đặc biệt"
      ),
    confirm_password: z.string().min(1, {
      message: notEmptyMessage("Xác nhận mật khẩu"),
    }),
  })
  .superRefine((data, ctx) => {
    if (data.new_password !== data.confirm_password) {
      return ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Mật khẩu xác nhận không khớp",
        path: ["confirm_password"],
      });
    }
    return data;
  });

export type ChangePasswordInputType = z.infer<typeof ChangePasswordInputSchema>;

export const RecommendRestaurantInputSchema = z.object({
  name: z.string().min(1, {
    message: notEmptyMessage("Tên nhà hàng"),
  }),
  description: z.string().min(1, {
    message: notEmptyMessage("Mô tả nhà hành"),
  }),
  address: z.string().min(1, {
    message: notEmptyMessage("Địa chỉ"),
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
  image: z.string().min(1, {
    message: notEmptyMessage("Ảnh"),
  }),
  province_id: z.string().min(1, {
    message: notEmptyMessage("Tỉnh thành"),
  }),
});

export type RecommendRestaurantInputType = z.infer<
  typeof RecommendRestaurantInputSchema
>;
