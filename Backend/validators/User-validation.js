const { z } = require("zod");

//login
const signin = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email address" })
    .min(3, { message: "Email must be at least 3 characters long" })
    .max(255, { message: "Email must not be more than 255 characters long" }),

  password: z
    .string({ required_error: "Password is required" })
    .min(7, { message: "Password must be at least 7 characters long" })
    .max(1024, {
      message: "Password must not be more than 18characters long",
    }),
});

///*
const signup = z
  .object({
    first_name: z
      .string({ required_error: "First name is required" })
      .min(3, { message: "First name must be at least 3 characters" })
      .max(14, { message: "First name must not exceed 14 characters" }),

    last_name: z
      .string({ required_error: "Last name is required" })
      .min(3, { message: "Last name must be at least 3 characters" })
      .max(14, { message: "Last name must not exceed 14 characters" }),

    email: z
      .string({ required_error: "Email is required" })
      .trim()
      .email({ message: "Invalid email address" })
      .min(3, { message: "Email must be at least 3 characters long" })
      .max(255, { message: "Email must not exceed 255 characters" }),

    password: z
      .string({ required_error: "Password is required" })
      .min(7, { message: "Password must be at least 7 characters long" })
      .max(1024, {
        message: "Password must not be more than 1024 characters long",
      }),

    profile_avatar: z
      .string()
      .url({ message: "Profile avatar must be a valid URL" })
      .optional(),
  })
  .refine(
    (data) => data.first_name.toLowerCase() !== data.last_name.toLowerCase(),
    {
      message: "First name and last name should not be the same",
      path: ["last_name"],
    }
  );

module.exports = { signin, signup };
