import React, { useState } from "react";
import Graph from "react-vis-ts";

function DemoGraph_2() {
  const [graph, setGraph] = useState({
    nodes: [
      { id: 1, label: "Node 1" },
      { id: 2, label: "Node 2" },
      { id: 3, label: "Node 3" },
      { id: 4, label: "Node 4" },
      { id: 5, label: "Node 5" },
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
    ],
  });
  const [selectedNode, setSelectedNode] = useState<number | undefined>(
    undefined
  );
  const createNode = (x: number, y: number, nodeId: number | undefined) => {
    if (nodeId === undefined) {
      alert("Please select a node.");
      return;
    }
    setGraph(({ nodes, edges }) => {
      const id = nodes.length + 1;
      const from = nodeId;
      const node = { id, label: `Node ${id}`, x, y };
      const edge = { from, to: id, label: "added" };
      return {
        counter: id,
        nodes: [...nodes, node],
        edges: [...edges, edge],
      };
    });
  };
  const events = {
    // The underline Network library doesn't provide types for events so
    // we are forced to use any here.
    select: (selected: any) => {
      if (!selected.event.srcEvent.shiftKey) {
        setSelectedNode((_prev) => selected.nodes[0]);
      }
    },
    click: (properties: any) => {
      if (properties.event.srcEvent.shiftKey) {
        createNode(
          properties.pointer.canvas.x,
          properties.pointer.canvas.y,
          selectedNode
        );
      }
    },
  };
  const options = {
    layout: {
      hierarchical: false,
    },
    nodes: {
      widthConstraint: { minimum: 50 },
    },
    edges: {
      color: "#000000",
      smooth: { enabled: true, type: "dynamic" },
    },
  };
  return (
    <Graph
      graph={graph}
      options={options}
      events={events}
      style={{ height: "440px" }}
    />
  );
}
export default DemoGraph_2;
