import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import { dracula } from "react-syntax-highlighter/dist/esm/styles/hljs";
import { CopyToClipboard } from "react-copy-to-clipboard";
import { FaRegCopy } from "react-icons/fa";
import "./codeCopy.css";

function CodeDisplay_2(props: {
  setCopiedTwo: React.Dispatch<React.SetStateAction<any>>;
  setCopiedOne: React.Dispatch<React.SetStateAction<any>>;
}) {
  const code = `import React, { useState } from "react";
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
      const node = { id, label: \`Node \${id}\`, x, y };
      const edge = { from, to: id, label: "added" };
      return {
        counter: id,
        nodes: [...nodes, node],
        edges: [...edges, edge],
      };
    });
  };
  const events = {
    // The underlined Network library doesn't provide types for events so
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
      style={{ height: "740px" }}
    />
  );
}
export default DemoGraph_2;
  `;
  return (
    <div className="parentDiv">
      <div className="buttonDiv">
        <CopyToClipboard
          text={code}
          onCopy={() => {
            props.setCopiedTwo(true);
            props.setCopiedOne(false);
          }}
        >
          <FaRegCopy />
        </CopyToClipboard>
      </div>
      <SyntaxHighlighter
        children={code}
        language="javascript"
        style={dracula}
      />
    </div>
  );
}
export default CodeDisplay_2;
