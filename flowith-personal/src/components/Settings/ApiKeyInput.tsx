import React, { useState, useEffect } from 'react';
import { useSettingsStore } from '../../stores/settingsStore'; // Import the Zustand store for settings

// ApiKeyInput component: Allows users to input, save, and remove their OpenAI API key.
const ApiKeyInput: React.FC = () => {
  // Get openAIKey and setOpenAIKey action from the settings store
  const { openAIKey, setOpenAIKey } = useSettingsStore();

  // Local state for the input field, allowing users to type before saving
  const [currentKey, setCurrentKey] = useState(openAIKey || '');
  // Local state to toggle visibility of the API key in the input field
  const [showKey, setShowKey] = useState(false);
  // Local state to provide temporary feedback when the key is saved
  const [isSaved, setIsSaved] = useState(false);

  // useEffect to synchronize local 'currentKey' state if 'openAIKey' in the store changes.
  // This is important for when the component mounts and loads the key from localStorage via the store.
  useEffect(() => {
    setCurrentKey(openAIKey || ''); // Update local state if store state changes
  }, [openAIKey]); // Dependency: run effect when openAIKey from store changes

  // Handler to save the API key
  const handleSaveKey = () => {
    const trimmedKey = currentKey.trim();
    setOpenAIKey(trimmedKey ? trimmedKey : null); // Save trimmed key or null if empty
    setIsSaved(true); // Show "Salva!" feedback
    setTimeout(() => setIsSaved(false), 2000); // Hide feedback after 2 seconds

    // Alert user about local storage of the API key
    if (trimmedKey) {
        alert("Chave API da OpenAI salva. Lembre-se que ela fica armazenada localmente no seu navegador.");
    } else {
        alert("Chave API da OpenAI removida."); // If saved key was empty
    }
  };

  // Handler to remove the API key
  const handleRemoveKey = () => {
    setCurrentKey(''); // Clear local input state
    setOpenAIKey(null); // Remove key from the store
    alert("Chave API da OpenAI removida.");
  };

  return (
    <div className="p-2 border-t border-gray-700 mt-4"> {/* Container for API key settings */}
      <label htmlFor="apiKey" className="block text-sm font-medium text-gray-300 mb-1"> {/* Input label */}
        Chave API OpenAI: {/* Text for the label */}
      </label>
      <div className="flex items-center space-x-2 mb-2"> {/* Input field and show/hide button container */}
        <input
          type={showKey ? 'text' : 'password'} // Toggle input type based on showKey state
          id="apiKey" // ID for the label's htmlFor attribute
          value={currentKey} // Controlled component: value from local state
          onChange={(e) => setCurrentKey(e.target.value)} // Update local state on change
          placeholder="sk-..." // Placeholder text
          className="flex-grow p-1.5 border border-gray-600 rounded-md bg-gray-700 text-gray-200 text-xs focus:ring-1 focus:ring-primary-start focus:border-transparent outline-none"
        />
        <button
            onClick={() => setShowKey(!showKey)} // Toggle showKey state
            className="p-1.5 text-xs bg-gray-600 hover:bg-gray-500 rounded-md"
            title={showKey ? "Ocultar Chave" : "Mostrar Chave"} // Tooltip for button
        >
            {showKey ? '👁️' : '👁️‍🗨️'} {/* Emoji for show/hide state */}
        </button>
      </div>
      <div className="flex space-x-2"> {/* Save and Remove buttons container */}
        <button
          onClick={handleSaveKey}
          className="w-full px-3 py-1.5 text-xs bg-blue-600 hover:bg-blue-700 text-white rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
        >
          {isSaved ? 'Salva!' : 'Salvar Chave'} {/* Dynamic button text based on isSaved state */}
        </button>
        {/* Conditionally render Remove button only if an API key is currently saved in the store */}
        {openAIKey && (
            <button
                onClick={handleRemoveKey}
                className="w-full px-3 py-1.5 text-xs bg-red-600 hover:bg-red-700 text-white rounded-md focus:outline-none"
            >
                Remover {/* Text for Remove button */}
            </button>
        )}
      </div>
      <p className="text-xs text-gray-500 mt-2"> {/* Informational text about local storage */}
        Sua chave API é armazenada localmente no seu navegador.
      </p>
    </div>
  );
};

export default ApiKeyInput;
