import React from 'react';
import Header from './Header';
import SidebarLeft from './SidebarLeft';
import ChatArea from './ChatArea';

const Layout: React.FC = () => {
  return (
    <div className="flex flex-col h-screen bg-gray-100 dark:bg-dark-gray text-gray-900 dark:text-gray-100">
      <Header />
      <div className="flex flex-1 overflow-hidden">
        <SidebarLeft />
        <ChatArea />
        {/* Sidebar Direita (configurações do modelo, etc.) pode ser adicionada aqui no futuro */}
      </div>
    </div>
  );
};

export default Layout;
