import { notEmptyMessage } from "@/libs/utils/common";
import { z } from "zod";

export const ShopFilterSchema = z.object({
  id: z.string().optional(),
  name: z.string().optional(),
  status: z.string().optional(),
  region: z.string().optional(),
});

export type ShopFilterType = z.infer<typeof ShopFilterSchema>;

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
  foods: z.array(
    z.string().min(1, {
      message: notEmptyMessage("Món ăn"),
    })
  ),
});

export type RecommendRestaurantInputType = z.infer<
  typeof RecommendRestaurantInputSchema
>;
