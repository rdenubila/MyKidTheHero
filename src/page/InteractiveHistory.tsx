import { Button, Card, Divider, Layout, Spin } from 'antd';
import React, { useState } from 'react';
import nl2br from 'react-nl2br';
import CharacterRow from '../components/CharacterRow';
import OpenAIService from '../services/openAIService';
import PlotForm from './PlotForm';
import theme from '../data/interactive.json';
import { ChatCompletionRequestMessage } from 'openai';
import _ from 'lodash';

function InteractiveHistory() {

    const openAIService = new OpenAIService();
    const [loading, setLoading] = useState<boolean>(false);
    const [characters, setCharacters] = useState<Character[]>(
        localStorage.getItem("characters") ?
            JSON.parse(localStorage.getItem("characters") || "")
            : [{
                name: "",
                category: undefined,
                isProtagonist: true
            }]);

    const [history, setHistory] = useState<string[]>([]);
    const [prompt, setPrompt] = useState<ChatCompletionRequestMessage[]>([]);

    const [i, setI] = useState<number>(0);

    const addChar = () => {
        const char = [...characters];
        char.push({} as Character);

        setCharacters(char);
    }

    const removeChar = (index: number) => {
        const char = [...characters];
        char.splice(index, 1);

        setCharacters(char);
    }

    const changeChar = (index: number, data: Character) => {
        const char = [...characters];
        char[index] = data;

        setCharacters(char);
    }

    const generateHistory = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        incrementHistory();
    }

    const fixPrompt = (prompt: string) => {
        theme[0].parameters.forEach(param => {
            prompt = prompt?.replaceAll(`{{${param.key}}}`, _.sample(param.values) || param.key);
        })

        return prompt;
    }

    const incrementHistory = async (option?: string) => {
        let newPrompt = fixPrompt(theme[0].prompt[i]);

        if (option)
            newPrompt = option + ". " + newPrompt;

        if (i === 0)
            newPrompt = newPrompt + openAIService.charInfo(characters);

        const promptList: ChatCompletionRequestMessage[] = [...prompt, {
            role: "user",
            content: newPrompt
        }];

        setLoading(true);
        const part = await openAIService.generateHistoryByPrompt(promptList);
        setLoading(false);

        if (part) {
            promptList.push({
                role: "assistant",
                content: part
            });

            setHistory([...history, part]);
        }

        setPrompt(promptList);
        setI(i + 1);
    }

    return (
        <Layout.Content className='px-4'>
            <h1 className="title">Gerador de histórias (interativas)</h1>
            <Divider>Personagens</Divider>

            <form onSubmit={generateHistory}>
                <div className="my-8 flex flex-col gap-y-4">
                    {characters.map((character, index) =>
                        <CharacterRow
                            key={`char_${index}`}
                            character={character}
                            index={index}
                            onRemove={removeChar}
                            onChange={changeChar}
                        />
                    )}
                    <div className="">
                        <Button onClick={addChar} className='w-full' type='dashed'>Adicionar personagem</Button>
                    </div>
                </div>
                <div className="my-8">
                    <Button htmlType='submit' className='w-full' type='primary'>Gerar história interativa</Button>
                </div>
            </form>

            <Card title="Sua história">
                <div className="divide-y">
                    {!loading && i === 0 && <div className='py-4 text-center'>Clique no botão "Gerar história interativa" acima para começar a gerar sua história</div>}
                    {history.map(part => <div className='py-4'>{nl2br(part)}</div>)}
                </div>

                {!loading && i > 0 && i < theme[0].prompt.length &&
                    <>
                        <hr className='my-4' />
                        <h4 className='mb-2 font-bold'>Clique abaixo na opção desejada:</h4>
                        <div className="grid grid-cols-2 gap-4">
                            <Button onClick={() => incrementHistory("Opção 1")}>Opção 1</Button>
                            <Button onClick={() => incrementHistory("Opção 2")}>Opção 2</Button>
                        </div>
                    </>
                }
                {loading && <div className='text-center py-4'>
                    <Spin /> Aguarde...
                </div>}
            </Card>

        </Layout.Content>
    )
}

export default InteractiveHistory;
