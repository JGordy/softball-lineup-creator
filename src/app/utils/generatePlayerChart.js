const { GoogleGenerativeAI } = require("@google/generative-ai");

import prompt from "../constants/prompt";

const API_KEY = process.env.NEXT_PUBLIC_API_KEY;

const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

const generatePlayerChart = async ({ setPlayerChart }) => {
    setPlayerChart();

    try {
        const result = await model.generateContent(prompt);
        const { response } = result;
        const { text } = response;
        let responseString = text();
        console.log({ responseString });

        // Extract the JSON string using a regular expression
        const jsonMatch = responseString.match(/```json\n(.*)\n```/s);

        console.log({ jsonMatch });

        if (jsonMatch) {
            const jsonString = jsonMatch[1];
            setPlayerChart(JSON.parse(jsonString));
        }
    } catch (error) {
        console.error('Error generating text:', error);
        setPlayerChart();
    }
};

export default generatePlayerChart;