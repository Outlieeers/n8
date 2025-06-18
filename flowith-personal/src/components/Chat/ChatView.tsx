import React, { useEffect, useRef } from 'react';
import ChatMessage from './ChatMessage'; // Component to display a single message
import ChatInput from './ChatInput'; // Component for user input
import { useChatStore } from '../../stores/chatStore'; // Zustand store for chat state

// ChatView component: Displays the list of messages and the input area.
const ChatView: React.FC = () => {
  // Get the array of messages from the chat store
  const messages = useChatStore((state) => state.messages);
  // Create a ref for the chat messages container div
  const chatContainerRef = useRef<HTMLDivElement>(null);

  // useEffect hook to scroll to the bottom of the chat container when new messages are added.
  // This ensures the latest message is always visible.
  useEffect(() => {
    if (chatContainerRef.current) {
      // Set the scrollTop property to the scrollHeight to scroll to the bottom
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]); // Dependency array: effect runs when 'messages' array changes

  return (
    <div className="flex flex-col h-full"> {/* Main container, full height, column layout */}
      {/* Messages area: takes up available space, scrolls vertically */}
      <div ref={chatContainerRef} className="flex-1 overflow-y-auto p-4 space-y-4">
        {/* Map through the messages array and render a ChatMessage component for each one */}
        {messages.map((msg) => (
          <ChatMessage key={msg.id} message={msg} /> // Use message ID as key for React list rendering
        ))}
      </div>
      {/* Input area: fixed at the bottom */}
      <ChatInput />
    </div>
  );
};

export default ChatView;
