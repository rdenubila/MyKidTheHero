import { Form, Select } from 'antd';

type Props = {
    value?: string | null;
    onChange: (newValue: string) => void;
}

const list = [
    "ladrão",
    "dragão",
    "ciclope",
    "lobo mau",
    "monstro",
    "extra-terrestre",
];

function ChallengeSelect({ value, onChange }: Props) {
    return (<>
        <div>
            <Form.Item
                label="Desafio"
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

export default ChallengeSelect;
