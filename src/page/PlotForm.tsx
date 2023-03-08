import { Button, Divider } from 'antd';
import React, { useState } from 'react';
import CharacterRow from '../components/CharacterRow';
import ThemeSelect from '../components/ThemeSelect';

type Props = {
  onSubmit: (characters: Character[], theme: string) => void
}

function PlotForm({ onSubmit }: Props) {
  const [characters, setCharacters] = useState<Character[]>(
    localStorage.getItem("characters") ?
      JSON.parse(localStorage.getItem("characters") || "")
      : [{
        name: "",
        category: undefined,
        isProtagonist: true
      }]);

  const [theme, setTheme] = useState<string | null>();

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

  const generate = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    onSubmit(
      characters,
      theme || ""
    );
  }

  return (<>
    <form onSubmit={generate}>
      <Divider>Personagens</Divider>

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

      <Divider>Selecione um tema</Divider>

      <div className="my-8 grid grid-cols-1 gap-4">
        <ThemeSelect value={theme} onChange={setTheme} />
      </div>

      <div className="my-8">
        <Button htmlType='submit' className='w-full' type='primary'>Gerar história</Button>
      </div>
    </form>

  </>);
}

export default PlotForm;
