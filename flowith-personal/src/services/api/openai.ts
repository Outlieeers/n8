import { Message } from '../../components/Chat/ChatMessage'; // Path to Message interface
import { useSettingsStore } from '../../stores/settingsStore'; // For API key

const OPENAI_CHAT_COMPLETIONS_URL = 'https://api.openai.com/v1/chat/completions';

export interface OpenAIStreamChunk {
  id: string;
  object: string;
  created: number;
  model: string;
  choices: {
    delta: {
      content?: string;
      role?: string;
    };
    index: number;
    finish_reason: string | null;
  }[];
}

// Define the types for the store actions that this service will call
// These actions are passed from the Zustand store to this service,
// allowing this service to update the application state without directly importing the store,
// thus preventing circular dependencies.
interface StreamUpdateActions {
  addMessage: (message: Message) => void;
  setLoading: (loading: boolean) => void;
  updateMessageText: (messageId: string, newText: string) => void;
}

/**
 * Streams chat completions from the OpenAI API.
 * @param messages A list of messages in the format expected by the OpenAI API (role and content).
 * @param actions An object containing store actions to update the chat state (add messages, set loading, update text).
 */
export const streamOpenAIResponse = async (
  messages: Pick<Message, 'role' | 'content'>[],
  actions: StreamUpdateActions
): Promise<void> => {
  const apiKey = useSettingsStore.getState().openAIKey; // Retrieve API key directly from settings store
  const { addMessage, setLoading, updateMessageText } = actions; // Destructure actions for use

  // Check if API key is configured
  if (!apiKey) {
    const errorMsg: Message = {
      id: `err-${Date.now()}`,
      text: 'Erro: Chave API da OpenAI não configurada. Por favor, adicione sua chave na aba de Configurações.',
      sender: 'ai',
      timestamp: new Date(),
    };
    addMessage(errorMsg);
    setLoading(false);
    return;
  }

  setLoading(true); // Indicate that a request is in progress

  try {
    // Make the POST request to OpenAI API
    const response = await fetch(OPENAI_CHAT_COMPLETIONS_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: messages,
        stream: true, // Crucial for enabling Server-Sent Events (SSE)
      }),
    });

    // Handle API errors (e.g., 401 Unauthorized, 429 Rate Limit)
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Erro desconhecido ao processar a resposta da API.' }));
      console.error('OpenAI API Error:', response.status, errorData);
      const errorMsg: Message = {
        id: `err-${Date.now()}`,
        text: `Erro da API OpenAI: ${response.status} - ${errorData.error?.message || response.statusText}`,
        sender: 'ai',
        timestamp: new Date(),
      };
      addMessage(errorMsg);
      setLoading(false);
      return;
    }

    // Ensure the response body is a ReadableStream
    if (!response.body) {
      throw new Error('ReadableStream não disponível na resposta.');
    }

    // Set up to read the stream
    const reader = response.body.getReader();
    const decoder = new TextDecoder('utf-8');
    let currentAiMessageId: string | null = null; // To store the ID of the current AI message being streamed
    let accumulatedText = ''; // To accumulate text chunks for the current AI message

    // Loop to continuously read from the stream
    // eslint-disable-next-line no-constant-condition
    while (true) {
      const { done, value } = await reader.read(); // Read a chunk from the stream
      if (done) { // Stream is finished
        break;
      }

      // Decode the chunk (Uint8Array) to a string
      const chunk = decoder.decode(value, { stream: true });
      // SSE sends data lines prefixed with "data: ", and multiple events can be in one chunk
      const lines = chunk.split('\n').filter(line => line.trim() !== '');

      for (const line of lines) {
        if (line.startsWith('data: ')) {
          const jsonData = line.substring('data: '.length);
          // OpenAI specific: when the stream is done, it sends a "[DONE]" message
          if (jsonData === '[DONE]') {
            setLoading(false); // Streaming is complete
            return; // Exit the loop and function
          }

          // Parse the JSON data from the chunk
          try {
            const parsedChunk: OpenAIStreamChunk = JSON.parse(jsonData);
            const contentDelta = parsedChunk.choices[0]?.delta?.content; // Get the actual text content

            if (contentDelta) {
              accumulatedText += contentDelta; // Append new text to accumulated text
              if (!currentAiMessageId) {
                // This is the first chunk for a new AI message
                const newAiMessage: Message = {
                  id: `ai-${Date.now()}-${Math.random().toString(36).substring(2,9)}`, // Generate a unique ID
                  text: accumulatedText, // Start with the first bit of text
                  sender: 'ai',
                  timestamp: new Date(),
                };
                currentAiMessageId = newAiMessage.id;
                addMessage(newAiMessage); // Add the new message to the store
              } else {
                // This is a subsequent chunk for an existing AI message
                // Update the existing message in the store with the new accumulated text
                updateMessageText(currentAiMessageId, accumulatedText);
              }
            }
          } catch (error) {
            // Handle errors in parsing JSON (e.g., if a chunk is malformed)
            console.error('Erro ao parsear chunk do stream:', jsonData, error);
          }
        }
      }
    }
  } catch (error: any) { // Catch network errors or other issues with fetch/stream
    console.error('Falha ao buscar stream da OpenAI:', error);
    const errorMsg: Message = {
      id: `err-${Date.now()}`,
      text: `Falha na comunicação com a API: ${error.message}`,
      sender: 'ai',
      timestamp: new Date(),
    };
    addMessage(errorMsg);
  } finally {
    // Ensure loading state is reset regardless of success or failure
    setLoading(false);
  }
};
