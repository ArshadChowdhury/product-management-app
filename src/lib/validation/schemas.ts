import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Invalid email address").min(1, "Email is required"),
});

export const productSchema = z.object({
  name: z.string().min(1, "Product name is required").max(100, "Name too long"),
  description: z
    .string()
    .min(10, "Description must be at least 10 characters")
    .max(600, "Description too long"),
  price: z.coerce
    .number()
    .positive("Price must be greater than 0")
    .max(100000, "Price too high"),
  stock: z.coerce
    .number()
    .int("Stock must be a whole number")
    .positive("Stock must be greater than 0")
    .max(10000, "Stock too high"),
  category: z.enum(
    ["Electronics", "Fitness", "Home", "Fashion", "Books", "Food", "Other"],
    { error: () => ({ message: "Please select a category" }) }
  ),
  imageUrl: z.string().url("Invalid URL").optional().or(z.literal("")),
});

export type LoginFormData = z.infer<typeof loginSchema>;
export type ProductFormData = z.infer<typeof productSchema>;
