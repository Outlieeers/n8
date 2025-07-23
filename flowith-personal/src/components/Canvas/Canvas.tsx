import React from 'react';
import Node from './Node';
import Connection from './Connection';
import Group from './Group';
import { useCanvasStore } from '../../stores/canvasStore';
import '../../App.css';

const Canvas = () => {
  const { nodes, connections, groups } = useCanvasStore();

  const getNodePosition = (id: string) => {
    const node = nodes.find((n) => n.id === id);
    return node ? { x: node.x, y: node.y } : { x: 0, y: 0 };
  };

  return (
    <div className="canvas">
      {groups.map((group, index) => (
        <Group
          key={index}
          nodes={group.nodeIds.map((id) => getNodePosition(id))}
        />
      ))}
      {nodes.map((node) => (
        <Node key={node.id} {...node} />
      ))}
      {connections.map((connection, index) => (
        <Connection
          key={index}
          from={getNodePosition(connection.from)}
          to={getNodePosition(connection.to)}
        />
      ))}
    </div>
  );
};

export default Canvas;
