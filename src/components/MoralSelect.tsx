import { Form, Select } from 'antd';

type Props = {
    value?: string | null;
    onChange: (newValue: string) => void;
}

const list = [
    "indefinido",
    "juntos somos mais fortes",
    "não devemos julgar pela aparência",
    "violência nunca é a solução",
    "é sempre bom compartilhar",
    "devagar se vai longe",
    "não fale com estranhos",
    "seja sempre gentil e bondoso com os outros"
];

function MoralSelect({ value, onChange }: Props) {
    return (<>
        <div>
            <Form.Item
                label="Moral de história"
            >
                <Select
                    value={value}
                    onChange={(value) => onChange(value)}
                    className='w-full'
                    placeholder="Selecione uma moral"
                    options={list.map(item => ({ value: item, label: item }))}
                />
            </Form.Item>
        </div>

    </>);
}

export default MoralSelect;
