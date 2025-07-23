import React, { useEffect } from 'react';
import { useChatStore } from '../../stores/chatStore'; // Import the Zustand store for chat

// ChatInput component: provides a textarea for user input and a send button.
const ChatInput: React.FC = () => {
  // Local state for the current value of the textarea
  const [inputValue, setInputValue] = React.useState('');

  // Get isLoading state and sendUserMessage action from the chat store
  // Using a selector to get specific parts of the store state.
  const { isLoading, sendUserMessage, prefilledMessage, setPrefilledMessage } = useChatStore((state) => ({
    isLoading: state.isLoading, // To disable input/button while AI is responding
    sendUserMessage: state.sendUserMessage, // Action to send the message
    prefilledMessage: state.prefilledMessage,
    setPrefilledMessage: state.setPrefilledMessage,
  }));

  useEffect(() => {
    if (prefilledMessage) {
      setInputValue(prefilledMessage);
      setPrefilledMessage(''); // Clear the prefilled message after using it
    }
  }, [prefilledMessage, setPrefilledMessage]);

  // Handler for textarea value changes
  const handleInputChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setInputValue(event.target.value);
  };

  // Handler for sending the message
  const handleSend = async () => { // Marked async as sendUserMessage is async
    if (inputValue.trim() && !isLoading) { // Only send if there's text and not loading
      const textToSend = inputValue.trim();
      setInputValue(''); // Clear the input field immediately after sending
      await sendUserMessage(textToSend); // Call the store action to process and send the message
    }
  };

  // Handler for keyboard events in the textarea
  const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
    // Send message on Enter key press, unless Shift is also pressed (for new lines)
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault(); // Prevent default Enter behavior (new line)
      handleSend();
    }
  };

  return (
    <div className="p-4 bg-gray-100 dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700"> {/* Container for the input area */}
      <div className="flex items-center space-x-2"> {/* Flex container for textarea and button */}
        <textarea
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={isLoading ? "Aguardando resposta..." : "Digite sua mensagem... (Shift+Enter para nova linha)"} // Dynamic placeholder
          disabled={isLoading} // Disable textarea when AI is loading
          className="flex-grow p-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-primary-start focus:border-transparent outline-none resize-none bg-white dark:bg-gray-700 text-gray-900 dark:text-gray-100"
          rows={1} // Start with one row, can auto-expand if CSS is set up for it (or via JS)
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !inputValue.trim()} // Disable button if loading or no input
          className="px-4 py-2 bg-gradient-to-r from-primary-start to-primary-end text-white rounded-lg hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-primary-start focus:ring-opacity-50 disabled:opacity-50 w-20 h-10 flex items-center justify-center"
        >
          {isLoading ? ( // Show loading spinner if isLoading is true
            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle> {/* Spinner base circle */}
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path> {/* Spinner rotating part */}
            </svg>
          ) : (
            'Enviar' // Show 'Enviar' text when not loading
          )}
        </button>
      </div>
    </div>
  );
};

export default ChatInput;
