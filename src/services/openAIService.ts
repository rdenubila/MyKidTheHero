import { Configuration, OpenAIApi } from "openai";

export default class OpenAIService {
    constructor(
        private configuration = new Configuration({ apiKey: process.env.REACT_APP_APIKEY }),
        private openai = new OpenAIApi(configuration)
    ) { }

    generatePrompt(chars: Character[], challenge: string, ambience: string, moral: string) {
        let prompt = "História infantil";
        prompt += `\nTema: ${ambience}`;
        prompt += `\nInimigo: ${challenge}`;
        prompt += "\nProtagonistas: " + chars
            .filter(char => char.isProtagonist)
            .map(char => `\n- ${char.name}: ${char.category}`)
        prompt += "\nCoadjuvantes: " + chars
            .filter(char => !char.isProtagonist)
            .map(char => `\n- ${char.name}: ${char.category}`)
        // prompt += `\nMoral: ${moral}`;

        return prompt;
    }

    async generateHistory(chars: Character[], challenge: string, ambience: string, moral: string) {
        const completion = await this.openai.createCompletion({
            model: "text-davinci-003",
            max_tokens: 1000,
            prompt: this.generatePrompt(chars, challenge, ambience, moral)
        });
        return completion.data.choices[0].text;
    }

}