import React from 'react';
import Layout from './components/Layout/Layout';

function App() {
  // Adicionar 'dark' à classe do HTML para ativar o tema escuro por padrão
  // Isso pode ser movido para um hook de tema mais sofisticado depois
  React.useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <Layout />
  );
}

export default App;
