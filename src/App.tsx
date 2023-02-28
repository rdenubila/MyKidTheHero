import { Card, Layout, Spin } from 'antd';
import React, { useState } from 'react';
import nl2br from 'react-nl2br';
import PlotForm from './page/PlotForm';
import OpenAIService from './services/openAIService';

function App() {
  const openAIService = new OpenAIService();
  const [history, setHistory] = useState<string | null>();
  const [loading, setLoading] = useState<boolean>(false);

  const generateHistory = async (characters: Character[], challenge: string, ambience: string, moral: string) => {

    localStorage.setItem("characters", JSON.stringify(characters));
    setLoading(true);

    const newHistory = await openAIService.generateHistory(
      characters,
      challenge || "",
      ambience || "",
      moral || ""
    );

    setLoading(false);
    setHistory(newHistory);
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-[80vh]">
        <Spin />
      </div>
    )
  }

  return (
    <Layout.Content>
      <h1 className="title">my kid, the hero</h1>
      {
        history
          ? <Card title="Sua história">
            {nl2br(history)}
          </Card>
          : <PlotForm key="plotForm" onSubmit={generateHistory} />
      }
    </Layout.Content>
  );
}

export default App;
