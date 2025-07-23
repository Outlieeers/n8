import React from 'react';
import { useCanvasStore } from '../../stores/canvasStore';
import { useChatStore } from '../../stores/chatStore';

const Header: React.FC = () => {
  const { saveCanvas, loadCanvas, clearCanvas, addNode } = useCanvasStore();
  const { startBrainstorming, surpriseMe } = useChatStore();

  const handleBrainstormClick = () => {
    const centralIdea = 'Central Idea';
    const newNodeId = `node-${Date.now()}`;
    addNode({
      id: newNodeId,
      x: 300,
      y: 300,
      content: centralIdea,
    });
    startBrainstorming(centralIdea);
  };

  return (
    <header className="bg-dark-gray shadow-md p-4">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-xl font-semibold bg-clip-text text-transparent bg-gradient-to-r from-primary-start to-primary-end">
          Flowith Pessoal
        </h1>
        <div>
          <button
            onClick={handleBrainstormClick}
            className="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Brainstorm
          </button>
          <button
            onClick={surpriseMe}
            className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Surprise Me
          </button>
          <button
            onClick={saveCanvas}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Save
          </button>
          <button
            onClick={loadCanvas}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mr-2"
          >
            Load
          </button>
          <button
            onClick={clearCanvas}
            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
          >
            Clear
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
