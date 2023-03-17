import { z } from "zod";

export const UserLoginSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .email({ message: "Invalid email" }),
    password: z
        .string({ required_error: "Password is required" })
        .min(6, { message: "Password length is less than 6 characters" })
        .max(12, { message: "Password length is more than 12 characters" })
});

export type UserLoginType = z.infer<typeof UserLoginSchema>;

export const UserSignUpSchema = z.object({
    email: z
        .string({ required_error: "Email is required" })
        .email({ message: "Invalid email" }),
    password: z
        .string({ required_error: "Password is required" })
        .min(6, { message: "Password length is less than 6 characters" })
        .max(12, { message: "Password length is more than 12 characters" }),
    passwordConfirm: z
        .string({ required_error: "Password confirm is required" })
        .min(6, { message: "Password length is less than 6 characters" })
        .max(12, { message: "Password length is more than 12 characters" })
        .transform((data) => {}),
    firstName: z
        .string({ required_error: "First name is required" })
        .min(2, { message: "First name length is less than 2 characters" })
        .max(16, {
            message: "First name length is more than 6 characters"
        }),
    lastName: z
        .string({ required_error: "Last name is required" })
        .min(2, { message: "Last name length is less than 2 characters" })
        .max(16, {
            message: "Last name length is more than 16 characters"
        }),
    phoneNumber: z
        .string({ required_error: "Phone number is required" })
        .startsWith("+20", {
            message: "Don't forget to add the country code"
        })
        .length(13, { message: "Phone number is invalid" })
});

export type UserSignUpType = z.infer<typeof UserSignUpSchema>;

export const OrganizationSignUpSchema = z.object({
    name: z.string({ required_error: "Organization name is required" }),
    type: z.string({ required_error: "Organization type is required" }),
    emailDomain: z
        .string({ required_error: "Email domain is required" })
        .includes("."),
    subdomain: z
        .string({ required_error: "Subdomain is required" })
        .min(2, { message: "Subdomain length is less than 2 characters" })
        .max(16, { message: "Subdomain length is more than 16 characters" }),
    officialPhoneNumber: z
        .string({ required_error: "Official Phone number is required" })
        .startsWith("+20", { message: "Don't forget to add the country code" })
        .length(13, { message: "Official Phone number is invalid" }),
    country: z.string({ required_error: "Country is required" }),
    address: z.string({ required_error: "Address is required" })
});
