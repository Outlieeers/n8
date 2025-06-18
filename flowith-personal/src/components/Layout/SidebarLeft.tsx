import React from 'react';
import ApiKeyInput from '../Settings/ApiKeyInput'; // Ajuste o caminho

const SidebarLeft: React.FC = () => {
  return (
    <aside className="w-64 bg-dark-gray p-4 hidden md:block border-r border-gray-700 flex-shrink-0"> {/* Adicionado flex-shrink-0 */}
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-2 text-gray-200">Navegação</h2>
        <ul className="space-y-1">
          <li><a href="#" className="block px-3 py-1.5 text-sm text-gray-400 hover:bg-gray-700 rounded-md">Início (Chat)</a></li>
          {/* Mais links aqui no futuro */}
        </ul>
      </div>

      {/* Seção de Configuração da API Key */}
      <ApiKeyInput />

      <div className="mt-auto pt-4 border-t border-gray-700">
        <p className="text-xs text-gray-500">Flowith Pessoal v0.1.0</p>
      </div>
    </aside>
  );
};

export default SidebarLeft;
