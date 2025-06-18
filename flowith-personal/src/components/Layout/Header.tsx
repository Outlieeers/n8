import React from 'react';

const Header: React.FC = () => {
  return (
    <header className="bg-dark-gray shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary-start to-primary-end">
          Flowith Pessoal
        </h1>
        {/* Outros elementos do header, como seletor de agente e configurações, virão aqui no futuro */}
      </div>
    </header>
  );
};

export default Header;
