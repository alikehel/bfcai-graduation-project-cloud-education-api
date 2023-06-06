import axios from "axios";
import { Configuration, OpenAIApi } from "openai";
import { OPENAI_API_KEY } from "../config/config";
import AppError from "../utils/AppError.util";
import catchAsync from "../utils/catchAsync.util";
const configuration = new Configuration({
    organization: "org-hL7T3fZitPutyZeZ8etu8PqS",
    apiKey: OPENAI_API_KEY
});
const openai = new OpenAIApi(configuration);

export const gradeAnswer = async (
    question: string,
    teacherAnswer: string,
    studentAnswer: string
) => {
    try {
        // const response = await openai.createChatCompletion({
        //     model: "gpt-3.5-turbo",
        //     temperature: 1,
        //     max_tokens: 2,
        //     messages: [
        //         {
        //             role: "system",
        //             content:
        //                 "You are an assistant that evaluates student answers based on the teacher's answer."
        //         },
        //         {
        //             role: "user",
        //             content:
        //                 "I will give you a question and the teacher answer, and I need you to tell me if the student answer is right or wrong based on the teacher answer."
        //         },
        //         {
        //             role: "assistant",
        //             content: "Ok"
        //         },
        //         {
        //             role: "user",
        //             content:
        //                 "you will reply with 'right' or 'wrong' or 'not sure'"
        //         },
        //         {
        //             role: "assistant",
        //             content: "Ok"
        //         },
        //         {
        //             role: "user",
        //             content: `Question: What is 1 + 1, Teacher Answer: 250, Student Answer: 250, Is the student answer right or wrong based only on the teacher answer?`
        //         },
        //         {
        //             role: "assistant",
        //             content: "Right"
        //         },
        //         {
        //             role: "user",
        //             content: `Question: What is 1 + 1, Teacher Answer: 250, Student Answer: 2, Is the student answer right or wrong based only on the teacher answer?`
        //         },
        //         {
        //             role: "assistant",
        //             content: "Wrong"
        //         },
        //         {
        //             role: "user",
        //             content: `Question: ${question}, Teacher Answer: ${teacherAnswer}, Student Answer: ${studentAnswer}`
        //         }
        //     ]
        // });

        const response = await openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            temperature: 1,
            max_tokens: 20,
            messages: [
                {
                    role: "system",
                    content:
                        "You are an assistant that evaluates student answers based on the teacher's answer."
                },
                {
                    role: "user",
                    content:
                        "I will give you a question and the teacher answer, and I need you to tell me the similarity percentage between the student answer and the teacher answer."
                },
                {
                    role: "assistant",
                    content: "Ok"
                },
                {
                    role: "user",
                    content:
                        "you will reply with only the percentage of similarity between the two answers"
                },
                {
                    role: "assistant",
                    content: "Ok"
                },
                {
                    role: "user",
                    content: `Question: What is 1 + 1, Teacher Answer: 250, Student Answer: 250`
                },
                {
                    role: "assistant",
                    content: "100%"
                },
                {
                    role: "user",
                    content: `Question: What is 1 + 1, Teacher Answer: 250, Student Answer: 2, Is the student answer right or wrong based only on the teacher answer?`
                },
                {
                    role: "assistant",
                    content: "0%"
                },
                {
                    role: "user",
                    content: `Question: ${question}, Teacher Answer: ${teacherAnswer}, Student Answer: ${studentAnswer}`
                }
            ]
        });

        // const response = await openai.createCompletion({
        //     model: "text-davinci-003",
        //     // prompt: `Question: ${question}, Teacher Answer: ${teacherAnswer}, Student Answer: ${studentAnswer}, Is the student answer right or wrong based only on the teacher answer?`,
        //     prompt: `Question: ${question}, Teacher Answer: ${teacherAnswer}, Student Answer: ${studentAnswer}, What is the similarity percentage between the student answer and the teacher answer?`,
        //     // temperature: 0, // Higher values means the model will take more risks.
        //     max_tokens: 100, // The maximum number of tokens to generate in the completion. Most models have a context length of 2048 tokens (except for the newest models, which support 4096).
        //     top_p: 1, // alternative to sampling with temperature, called nucleus sampling
        //     frequency_penalty: 0.5, // Number between -2.0 and 2.0. Positive values penalize new tokens based on their existing frequency in the text so far, decreasing the model's likelihood to repeat the same line verbatim.
        //     presence_penalty: 2 // Number between -2.0 and 2.0. Positive values penalize new tokens based on whether they appear in the text so far, increasing the model's likelihood to talk about new topics.
        // });

        console.log(response.data.choices[0]);

        return response.data.choices[0].message?.content;
        // return response.data.choices[0].text?.includes("Right");
    } catch (err) {
        throw new AppError(`Something went wrong with gpt-3.5 | ${err}`, 500);
    }
};
