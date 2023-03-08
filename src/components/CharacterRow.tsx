import { DeleteFilled } from '@ant-design/icons';
import { Button, Checkbox, Input, Select } from 'antd';
import { CheckboxChangeEvent } from 'antd/es/checkbox';

type Props = {
    character: Character;
    index: number;
    onRemove: (index: number) => void;
    onChange: (index: number, data: Character) => void;
}

function CharacterRow({ character, index, onRemove, onChange }: Props) {

    const changeName = (newValue: React.ChangeEvent<HTMLInputElement>) => {
        const char = { ...character };
        char.name = newValue.target.value;

        onChange(index, char);
    }

    const changeCategory = (newValue: string) => {
        const char = { ...character };
        char.category = newValue;

        onChange(index, char);
    }

    const changeIsProtagonist = (e: CheckboxChangeEvent) => {
        const char = { ...character };
        char.isProtagonist = e.target.checked;

        onChange(index, char);
    }

    return (<>
        <div className="flex flex-col md:flex-row gap-2 items-center my-2 md:my-0">
            <div className='w-full md:flex-1'>
                <Input value={character.name} onChange={changeName} placeholder='Nome do(a) personagem' />
            </div>
            <div className='w-full md:w-36'>
                <Select
                    value={character.category}
                    onChange={changeCategory}
                    className='w-full'
                    placeholder="Categoria"
                    options={[
                        { value: 'menino', label: 'Menino' },
                        { value: 'menina', label: 'Menina' },
                        { value: 'pai', label: 'Pai' },
                        { value: 'mãe', label: 'Mãe' },
                        { value: 'avô', label: 'Avô' },
                        { value: 'avó', label: 'Avó' },
                        { value: 'cachorro', label: 'Cachorro' },
                        { value: 'gato', label: 'Gato' },
                    ]}
                />
            </div>
            <div>
                <Checkbox
                    checked={character.isProtagonist}
                    onChange={changeIsProtagonist}
                >Protagonista</Checkbox>
            </div>
            <div>
                <Button onClick={() => onRemove(index)} danger shape='circle' icon={<DeleteFilled />} />
            </div>
        </div>

    </>);
}

export default CharacterRow;
