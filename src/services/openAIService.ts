import { Configuration, OpenAIApi } from "openai";
import themes from "../data/themes.json";
import _ from "lodash";

export default class OpenAIService {
    constructor(
        private configuration = new Configuration({ apiKey: process.env.REACT_APP_APIKEY }),
        private openai = new OpenAIApi(configuration)
    ) { }

    generatePrompt(chars: Character[], theme: string) {

        const protagonists = chars
            .filter(char => char.isProtagonist)
            .map(char => `${char.name} (${char.category})`);
        const coadjuvants = chars
            .filter(char => !char.isProtagonist)
            .map(char => `${char.name} (${char.category})`);

        const currentTheme = themes.find(item => item.theme === theme);
        let currentPrompt = _.sample(currentTheme?.prompt);

        currentTheme?.parameters.forEach(param => {
            currentPrompt = currentPrompt?.replaceAll(`{{${param.key}}}`, _.sample(param.values) || param.key);
        })

        if (protagonists.length > 0)
            currentPrompt = currentPrompt + ` O protagonista é ${protagonists.join(", ")}.`;

        if (protagonists.length > 0 && coadjuvants.length > 0)
            currentPrompt = currentPrompt + ` e os coadjuvantes são ${coadjuvants.join(", ")}.`;

        if (protagonists.length === 0 && coadjuvants.length > 0)
            currentPrompt = currentPrompt + ` Os personagens são ${coadjuvants.join(", ")}.`;

        let prompt = currentPrompt || "escreva uma história infantil";

        return prompt;
    }

    async generateHistory(chars: Character[], theme: string) {
        const completion = await this.openai.createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [{ "role": "user", "content": this.generatePrompt(chars, theme) }]
        });
        return completion.data.choices[0].message?.content.trim();
    }

}