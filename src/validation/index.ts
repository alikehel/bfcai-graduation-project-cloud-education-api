import { z } from "zod";

//--------------------- Users ---------------------//

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
    // passwordConfirm: z
    //     .string({ required_error: "Password confirm is required" })
    //     .min(6, { message: "Password length is less than 6 characters" })
    //     .max(12, { message: "Password length is more than 12 characters" })
    //     .transform((data) => {}),
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

//--------------------- Organizations ---------------------//

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

//--------------------- Courses ---------------------//

export const CourseCreateSchema = z.object({
    name: z.string({ required_error: "Course name is required" }),
    description: z.string({ required_error: "Course description is required" }),
    code: z.string({ required_error: "Course code is required" }),
    category: z.string({ required_error: "Course category is required" }),
    isActive: z.boolean(),
    prerequisites: z.array(z.string()).optional()
});

export type CourseCreateType = z.infer<typeof CourseCreateSchema>;

export const CourseUpdateSchema = CourseCreateSchema.partial();

export type CourseUpdateType = z.infer<typeof CourseUpdateSchema>;

//--------------------- Course Section ---------------------//

export const CourseSectionCreateSchema = z.object({
    title: z.string({ required_error: "Course section title is required" }),
    order: z.number().optional()
});

export type CourseSectionCreateType = z.infer<typeof CourseSectionCreateSchema>;

// const literalSchema = z.union([z.string(), z.number(), z.boolean(), z.null()]);
// type Literal = z.infer<typeof literalSchema>;
// type Json = Literal | { [key: string]: Json } | Json[];
// const jsonSchema: z.ZodType<Json> = z.lazy(() =>
//     z.union([literalSchema, z.array(jsonSchema), z.record(jsonSchema)])
// );

export const CourseSectionUpdateSchema = z.object({
    title: z
        .string({ required_error: "Course section title is required" })
        .optional(),
    // content: jsonSchema.optional()
    content: z.string().optional()
});

export type CourseSectionUpdateType = z.infer<typeof CourseSectionUpdateSchema>;
