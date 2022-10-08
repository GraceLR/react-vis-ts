import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";

function CodeDisplay_2() {
  const code = `import React, { useState } from "react";
import Graph from "react-vis-ts";

function DemoGraph_2() {
  const [graph, setGraph] = useState({
    counter: 0,
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
    setGraph(({ counter, nodes, edges }) => {
      const id = counter - 1;
      const from = nodeId;
      const node = { id, label: \`\${id}\`, x, y };
      const edge = { from, to: id, label: "added" };
      return {
        counter: id,
        nodes: [...nodes, node],
        edges: [...edges, edge],
      };
    });
  };
  const events = {
    select: (selected: any) => {
      // type fix
      if (!selected.event.srcEvent.shiftKey) {
        setSelectedNode((_prev) => selected.nodes[0]);
      }
    },
    click: (properties: any) => {
      // type fix
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
    <>
      <Graph
        graph={graph}
        options={options}
        events={events}
        style={{ height: "440px" }}
      />
    </>
  );
}
export default DemoGraph_2;`;
  return (
    <SyntaxHighlighter children={code} language="javascript" style={dracula} />
  );
}
export default CodeDisplay_2;
