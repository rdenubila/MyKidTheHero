import { Form, Select } from 'antd';

type Props = {
    ambience?: string | null;
    onChange: (newAmbience: string) => void;
}

const list = ["floresta mágica", "medieval", "faroeste", "detetive", "super-herói"];

function AmbienceSelect({ ambience, onChange }: Props) {
    return (<>
        <div>
            <Form.Item
                label="Tema"
            >
                <Select
                    value={ambience}
                    onChange={(value) => onChange(value)}
                    className='w-full'
                    placeholder="Selecione uma ambientação/tema"
                    options={list.map(item => ({ value: item, label: item }))}
                />
            </Form.Item>
        </div>

    </>);
}

export default AmbienceSelect;
