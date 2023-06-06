import { z } from "zod";
import { zu } from "zod_utilz";

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

export const UserUpdateSchema = z.object({
    firstName: z
        .string({ required_error: "First name is required" })
        .min(2, { message: "First name length is less than 2 characters" })
        .max(16, {
            message: "First name length is more than 6 characters"
        })
        .optional(),
    lastName: z
        .string({ required_error: "Last name is required" })
        .min(2, { message: "Last name length is less than 2 characters" })
        .max(16, {
            message: "Last name length is more than 16 characters"
        })
        .optional(),
    phoneNumber: z
        .string({ required_error: "Phone number is required" })
        .startsWith("+20", {
            message: "Don't forget to add the country code"
        })
        .length(13, { message: "Phone number is invalid" })
        .optional(),
    role: z.enum(["STUDENT", "TEACHER"]).optional(),
    courses: z.array(z.string()).optional()
});

export type UserUpdateType = z.infer<typeof UserUpdateSchema>;

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

export const CourseReviewSchema = z.object({
    rating: z.number().max(10).min(1).optional(),
    review: z.string({ required_error: "Review is required" })
});

export type CourseReviewType = z.infer<typeof CourseReviewSchema>;

//--------------------- Course Section ---------------------//

export const CourseSectionCreateSchema = z.object({
    title: z.string({ required_error: "Course section title is required" }),
    order: z.number().optional()
});

export type CourseSectionCreateType = z.infer<typeof CourseSectionCreateSchema>;

export const CourseSectionUpdateSchema = z.object({
    title: z.string().optional(),
    content: zu.stringToJSON().optional()
});

export type CourseSectionUpdateType = z.infer<typeof CourseSectionUpdateSchema>;

//------------------ Course Section Comment ------------------//

export const CourseSectionCommentCreateSchema = z.object({
    content: z.string({ required_error: "Comment can't be empty" })
});

export type CourseSectionCommentCreateType = z.infer<
    typeof CourseSectionCommentCreateSchema
>;

export const CourseSectionCommentUpdateSchema =
    CourseSectionCommentCreateSchema;

export type CourseSectionCommentUpdateType = z.infer<
    typeof CourseSectionCommentUpdateSchema
>;

//------------------ Exams ------------------//

const MCQQuestionSchema = z.object({
    questionText: z.string().min(1),
    questionType: z.literal("mcq"),
    questionChoices: z.array(
        z.object({
            choiceText: z.string().min(1),
            isCorrect: z.boolean()
        })
    )
});

const EssayQuestionSchema = z.object({
    questionText: z.string().min(1),
    questionType: z.literal("essay"),
    questionAnswer: z.string().min(1)
});

export const ExamCreateSchema = z.object({
    name: z.string().min(1),
    description: z.string().min(1),
    duration: z.number().int().positive(),
    startTime: z.string().min(1),
    endTime: z.string().min(1),
    // questions: z.array(zu.stringToJSON())
    questions: z.array(MCQQuestionSchema.or(EssayQuestionSchema))
});

export type ExamCreateType = z.infer<typeof ExamCreateSchema>;

// const answerSchema = z.object({
//     questionId: z.string().min(1),
//     answer: z.string().min(1)
// });

// const answerArraySchema = z.array(answerSchema);
