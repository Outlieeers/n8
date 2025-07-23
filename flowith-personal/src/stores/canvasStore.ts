import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

interface Node {
  id: string;
  x: number;
  y: number;
  content: string;
}

interface Connection {
  from: string;
  to: string;
}

interface Group {
  nodeIds: string[];
}

interface CanvasState {
  nodes: Node[];
  connections: Connection[];
  groups: Group[];
  addNode: (node: Node) => void;
  addConnection: (connection: Connection) => void;
  addGroup: (group: Group) => void;
  updateNode: (id: string, position: { x: number; y: number }) => void;
  saveCanvas: () => void;
  loadCanvas: () => void;
  clearCanvas: () => void;
}

export const useCanvasStore = create<CanvasState>()(
  persist(
    (set, get) => ({
      nodes: [],
      connections: [],
      groups: [],
      addNode: (node) => set((state) => ({ nodes: [...state.nodes, node] })),
      addConnection: (connection) => set((state) => ({ connections: [...state.connections, connection] })),
      addGroup: (group) => set((state) => ({ groups: [...state.groups, group] })),
      updateNode: (id, position) =>
        set((state) => ({
          nodes: state.nodes.map((node) =>
            node.id === id ? { ...node, ...position } : node
          ),
        })),
      saveCanvas: () => {
        const { nodes, connections, groups } = get();
        const canvasState = { nodes, connections, groups };
        localStorage.setItem('canvas-save', JSON.stringify(canvasState));
      },
      loadCanvas: () => {
        const savedState = localStorage.getItem('canvas-save');
        if (savedState) {
          const { nodes, connections, groups } = JSON.parse(savedState);
          set({ nodes, connections, groups });
        }
      },
      clearCanvas: () => set({ nodes: [], connections: [], groups: [] }),
    }),
    {
      name: 'flowith-personal-canvas-storage',
      storage: createJSONStorage(() => localStorage),
    }
  )
);
