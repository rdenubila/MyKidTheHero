import { Form, Select } from 'antd';
import themes from '../data/themes.json';

type Props = {
    value?: string | null;
    onChange: (newValue: string) => void;
}

const list = themes.map(item => item.theme);

function ThemeSelect({ value, onChange }: Props) {
    return (<>
        <div>
            <Form.Item
                label="Tema"
            >
                <Select
                    value={value}
                    onChange={(value) => onChange(value)}
                    className='w-full'
                    placeholder="Selecione um desafio"
                    options={list.map(item => ({ value: item, label: item }))}
                />
            </Form.Item>
        </div>

    </>);
}

export default ThemeSelect;
