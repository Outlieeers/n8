import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { Message } from '../components/Chat/ChatMessage'; // Data structure for a chat message
import { streamOpenAIResponse } from '../services/api/openai'; // Function to call OpenAI API

// Defines the structure of the chat state managed by Zustand
interface ChatState {
  messages: Message[]; // Array to hold all chat messages
  isLoading: boolean; // Flag to indicate if AI is currently responding
  addMessage: (message: Message) => void; // Action to add a new message to the list
  setLoading: (loading: boolean) => void; // Action to set the loading state
  updateMessageText: (messageId: string, newText: string) => void; // Action to update text of an existing message (for streaming)
  sendUserMessage: (text: string) => Promise<void>; // Action to handle sending a user's message
}

// Create the Zustand store for chat
export const useChatStore = create<ChatState>()(
  // Use persist middleware to save chat state to localStorage
  persist(
    (set, get) => ({ // 'set' is for updating state, 'get' for accessing current state within actions
      messages: [ // Initial messages when the store is created
        {
          id: 'initial-ai-greeting', // Unique ID for the message
          text: 'Olá! Como posso ajudar você hoje?', // Content of the message
          sender: 'ai', // Sender ('ai' or 'user')
          timestamp: new Date(), // Timestamp of the message
        },
      ],
      isLoading: false, // Initially, AI is not loading/responding
      // Action to add a new message to the 'messages' array
      addMessage: (message) =>
        set((state) => ({ messages: [...state.messages, message] })),
      // Action to set the 'isLoading' state
      setLoading: (loading) => set({ isLoading: loading }),
      // Action to update the text of an existing message, identified by messageId.
      // This is crucial for streaming, where an AI message is first added with partial text,
      // and then its text is progressively updated. Timestamp is also updated.
      updateMessageText: (messageId, newText) =>
        set((state) => ({
          messages: state.messages.map(msg =>
            msg.id === messageId ? { ...msg, text: newText, timestamp: new Date() } : msg
          ),
        })),
      // Action to handle sending a user's message
      sendUserMessage: async (text: string) => {
        // Get current state and actions using get()
        const { addMessage, setLoading, updateMessageText, messages: currentMessages } = get();

        // Create the user's message object
        const userMessage: Message = {
          id: `user-${Date.now()}`, // Simple unique ID using timestamp
          text, // User's message text
          sender: 'user', // Set sender as 'user'
          timestamp: new Date(), // Current timestamp
        };
        addMessage(userMessage); // Add user's message to the store immediately

        // Prepare the message history for the OpenAI API.
        // It needs to include the new user message.
        // OpenAI expects roles 'user', 'assistant', or 'system'.
        const apiMessages = [...currentMessages, userMessage] // Combine existing messages with the new one
          .filter(msg => msg.sender === 'user' || msg.sender === 'ai') // Filter relevant messages
          .map(msg => ({ // Transform to the API's expected format
            role: msg.sender === 'user' ? 'user' : 'assistant', // Map 'ai' to 'assistant'
            content: msg.text,
          }));

        // Call the OpenAI streaming service, passing the prepared messages
        // and the store actions needed for real-time updates.
        await streamOpenAIResponse(apiMessages, {
          addMessage,       // Action to add new (AI) messages
          setLoading,       // Action to control loading indicator
          updateMessageText, // Action to update AI message text during streaming
        });
      },
    }),
    {
      name: 'flowith-personal-chat-storage', // Key for localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
      // We could use 'partialize' here to only persist certain parts of the state,
      // e.g., partialize: (state) => ({ messages: state.messages }), if isLoading shouldn't persist.
      // For now, the entire state (messages, isLoading) is persisted.
    }
  )
);
