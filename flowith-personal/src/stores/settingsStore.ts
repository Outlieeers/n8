import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface SettingsState {
  openAIKey: string | null;
  setOpenAIKey: (key: string | null) => void;
  // Outras configurações futuras: tema, modelo padrão, etc.
}

// Create the Zustand store for settings
export const useSettingsStore = create<SettingsState>()(
  // Use persist middleware to save settings state to localStorage
  persist(
    (set) => ({
      openAIKey: null, // Initially, no API key is set
      // Action to set the OpenAI API key
      setOpenAIKey: (key) => set({ openAIKey: key }),
    }),
    {
      name: 'flowith-personal-settings-storage', // Key for localStorage
      storage: createJSONStorage(() => localStorage), // Use localStorage for persistence
      // Note: API keys stored in localStorage are accessible via JavaScript in the browser.
      // This is generally acceptable for user-provided keys in a client-side application
      // but be mindful of XSS vulnerabilities if the application handles untrusted input.
      // For this personal MVP, direct localStorage storage is deemed acceptable.
    }
  )
);

// Example utility function to directly get the OpenAI key from the store's state.
// Typically, you would use the hook `useSettingsStore(state => state.openAIKey)` in components.
export const getOpenAIKey = (): string | null => {
  return useSettingsStore.getState().openAIKey; // Retrieves the key directly from the current state
};
