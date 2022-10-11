# react-vis-ts

[![NPM version][npm-image]][npm-url]
[![Build][github-build]][github-build-url]
![npm-typescript]
[![License][github-license]][github-license-url]

This repo is for react-vis-ts.
It is a React graph in typescript.

[**Live Demo**](https://GraceLR.github.io/react-vis-ts/)

## Installation:

```bash
npm install react-vis-ts --save-dev
```
## Usage :

Add `Graph` to your component:

Example 1:

```ts
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
```

Example 2:

```ts
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
```

[npm-url]: https://www.npmjs.com/package/react-vis-ts
[npm-image]: https://img.shields.io/npm/v/react-vis-ts
[github-license]: https://img.shields.io/github/license/gapon2401/my-react-typescript-package
[github-license-url]: https://github.com/GraceLR/react-vis-ts/blob/master/LICENSE
[github-build]: https://github.com/GraceLR/react-vis-ts/actions/workflows/publish.yml/badge.svg
[github-build-url]: https://github.com/GraceLR/react-vis-ts/actions/workflows/publish.yml
[npm-typescript]: https://img.shields.io/npm/types/react-vis-ts
