import { Injectable } from '@nestjs/common';
import { Configuration, OpenAIApi, CreateCompletionRequest } from "openai";

@Injectable()
export class ChatGPTService {
    private openAiApi: OpenAIApi;

    constructor() {
        const configuration = new Configuration({
            organization: process.env.CHATGPT_API_ORGANIZATION,
            apiKey: process.env.CHATGPT_API_KEY
        });
        this.openAiApi = new OpenAIApi(configuration);
    }

    async generateResponse(message: string) {
        try {
            const params: CreateCompletionRequest = {
                prompt: message,
                model: "text-davinci-003",
                max_tokens: 500,
            }
            const response = await this.openAiApi.createCompletion(params)
            console.log(response.data.choices[0].text)
            return response.data.choices[0].text
        } catch (error) {
            return error
        }
    }

}
