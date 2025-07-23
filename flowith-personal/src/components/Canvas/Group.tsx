import React from 'react';

interface GroupProps {
  nodes: { x: number; y: number }[];
}

const Group: React.FC<GroupProps> = ({ nodes }) => {
  if (nodes.length === 0) {
    return null;
  }

  const minX = Math.min(...nodes.map((n) => n.x));
  const minY = Math.min(...nodes.map((n) => n.y));
  const maxX = Math.max(...nodes.map((n) => n.x));
  const maxY = Math.max(...nodes.map((n) => n.y));

  const padding = 20;

  return (
    <div
      style={{
        position: 'absolute',
        left: minX - padding,
        top: minY - padding,
        width: maxX - minX + padding * 2,
        height: maxY - minY + padding * 2,
        border: '2px dashed gray',
        borderRadius: '10px',
        pointerEvents: 'none',
      }}
    />
  );
};

export default Group;
