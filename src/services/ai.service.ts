import axios from "axios";
import AppError from "../utils/AppError.util";
// import catchAsync from "../utils/catchAsync.util";

const sentimentAnalyzerEndpoint =
    "https://graduation-project-ai-api.onrender.com/sentiment_analyzer/";

const toxicDetectionEndpoint =
    "https://graduation-project-ai-api.onrender.com/toxic_comment/";

// const summarizationEndpoint = "https://graduation-project-ai-api.onrender.com";

// const gradingEndpoint = "https://graduation-project-ai-api.onrender.com";

export const getSentiment = async (review: string) => {
    try {
        const response = await axios.post(sentimentAnalyzerEndpoint, {
            string: review
        });

        const rating =
            (response.data.result.pos + response.data.result.neu) * 10;

        // console.log(response.data);
        // console.log(rating);

        return rating;
    } catch (err) {
        throw new AppError(
            "Something went wrong with the sentiment analyzer ai api",
            500
        );
    }
};

export const checkToxicity = async (comment: string) => {
    try {
        const response = await axios.post(toxicDetectionEndpoint, {
            string: comment
        });

        const toxicity = +response.data.result;

        // console.log(response.data);
        // console.log(toxicity);

        return toxicity;
    } catch (err) {
        throw new AppError(
            "Something went wrong with the toxicity detection ai api",
            500
        );
    }
};
