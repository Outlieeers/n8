import React from 'react';
import Draggable from 'react-draggable';
import '../../App.css';
import { useChatStore } from '../../stores/chatStore';

interface NodeProps {
  id: string;
  x: number;
  y: number;
  content: string;
}

const Node: React.FC<NodeProps> = ({ id, x, y, content }) => {
  const { setPrefilledMessage } = useChatStore();

  const handleDoubleClick = () => {
    setPrefilledMessage(`Continue the story from this node: "${content}"`);
  };

  return (
    <Draggable>
      <div
        className="node"
        style={{ left: x, top: y }}
        onDoubleClick={handleDoubleClick}
      >
        {content}
      </div>
    </Draggable>
  );
};

export default Node;
