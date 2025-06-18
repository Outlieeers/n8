import React from 'react';
import ChatView from '../Chat/ChatView';

const ChatArea: React.FC = () => {
  return (
    <main className="flex-1 flex flex-col overflow-hidden"> {/* Alterado para flex-col e overflow-hidden */}
      {/* Título pode ser removido ou movido para outro lugar se ChatView ocupar tudo */}
      {/* <h2 className="text-lg font-semibold mb-4 p-4 border-b border-gray-200 dark:border-gray-700">Área de Chat</h2> */}
      <ChatView />
    </main>
  );
};

export default ChatArea;
