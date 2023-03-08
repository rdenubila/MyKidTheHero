import { Button, Card, Layout, Spin } from 'antd';
import React, { useState } from 'react';
import nl2br from 'react-nl2br';
import PlotForm from './page/PlotForm';
import OpenAIService from './services/openAIService';

function App() {
  const openAIService = new OpenAIService();
  const [history, setHistory] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const generateHistory = async (characters: Character[], theme: string) => {

    localStorage.setItem("characters", JSON.stringify(characters));
    setLoading(true);

    const newHistory = await openAIService.generateHistory(
      characters,
      theme || "",
    );

    setLoading(false);
    setHistory(newHistory);
  }

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[80vh]">
        <Spin />
        <p>Aguarde, isso pode levar alguns minutos</p>
      </div>
    )
  }

  return (
    <Layout.Content className='px-4'>
      <h1 className="title">Gerador de histórias</h1>
      {
        history
          ? <>
            <Card title="Sua história">
              {nl2br(history)}
            </Card>
            <div className="my-8">
              <Button onClick={() => setHistory(null)} className='w-full' type='primary'>Gerar outra história</Button>
            </div>
          </>
          : <PlotForm key="plotForm" onSubmit={generateHistory} />
      }
    </Layout.Content>
  );
}

export default App;
