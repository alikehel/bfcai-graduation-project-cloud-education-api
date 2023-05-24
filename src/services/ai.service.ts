import axios from "axios";
import AppError from "../utils/AppError.util";
import catchAsync from "../utils/catchAsync.util";

const apiLink = "http://graduation-project-ai-api-production.up.railway.app";

export const getSentiment = async (review: string) => {
    const response = await axios.post(apiLink + "/sentiment_analyzer", {
        string: review
    });

    if (response.status !== 200) {
        throw new AppError("Something went wrong!", 500);
    }

    return response.data;
};
