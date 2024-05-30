import { notEmptyMessage } from "@/libs/utils/common";
import { z } from "zod";

export const ContactInputSchema = z.object({
  name: z.string().min(1, {
    message: notEmptyMessage("Tên"),
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
  email: z
    .string()
    .email({
      message: "Email không hợp lệ",
    })
    .min(1, {
      message: notEmptyMessage("Email"),
    }),
  message: z.string().min(1, {
    message: notEmptyMessage("Lời nhắn"),
  }),
});

export type ContactInputType = z.infer<typeof ContactInputSchema>;
