// Import `GoogleGenerative` from the package we installed earlier.
import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

import prompt from '../../constants/prompt';

// Create an asynchronous function POST to handle POST 
// request with parameters request and response.
export async function POST(req, res) {

    try {
        // Access your API key by creating an instance of GoogleGenerativeAI we'll call it GenAI
        const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

        // Ininitalise a generative model
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        // Retrieve the data we recieve as part of the request body
        const data = await req.json();

        // Define a prompt varibale
        const body = data.body;
        console.log({ body });

        const updatedPrompt = `
            Generate a softball batting order and fielding chart for the following players, adhering to the specified rules:

            ${JSON.stringify(body)}
            
            ${prompt}`;

        // Pass the prompt to the model and retrieve the output
        const result = await model.generateContent(updatedPrompt);
        const response = await result.response;
        const output = await response.text();

        // Extract the JSON string using a regular expression
        const jsonMatch = output.match(/```json\n(.*)\n```/s);

        if (jsonMatch) {
            const jsonString = jsonMatch[1];
            return NextResponse.json({ output: JSON.parse(jsonString) });
        }

        // Send the llm output as a server reponse object
    } catch (error) {
        console.error(error)
    }
}
