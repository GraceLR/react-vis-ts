import React from "react";
import Graph from "react-vis-ts";

function DemoGraph_1() {
  const graph = {
    nodes: [
      { id: 1, label: "Node 1", title: "node 1 tootip text" },
      { id: 2, label: "Node 2", title: "node 2 tootip text" },
      { id: 3, label: "Node 3", title: "node 3 tootip text" },
      { id: 4, label: "Node 4", title: "node 4 tootip text" },
      { id: 5, label: "Node 5", title: "node 5 tootip text" },
    ],
    edges: [
      { from: 1, to: 2 },
      { from: 1, to: 3 },
      { from: 2, to: 4 },
      { from: 2, to: 5 },
    ],
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
      // length: "200",
      smooth: { enabled: true, type: "dynamic" },
    },
  };
  return <Graph graph={graph} options={options} style={{ height: "640px" }} />;
}
export default DemoGraph_1;
