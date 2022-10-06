# react-vis-ts

[![NPM version][npm-image]][npm-url]
[![Build][github-build]][github-build-url]
![npm-typescript]
[![License][github-license]][github-license-url]

This repo is the example of the article ["How to create and publish React Typescript npm package with demo and automated build"](https://medium.com/@igaponov/how-to-create-and-publish-react-typescript-npm-package-with-demo-and-automated-build-80c40ec28aca).

You can clone it and step by step create your own NPM package and publish it.

It is simple React counter.

[**Live Demo**](https://gapon2401.github.io/my-react-typescript-package/)

## Installation:

```bash
npm install react-vis-ts --save-dev
```

or

```bash
yarn add -D react-vis-ts
```

## Usage :

Add `Graph` to your component:

```js
import React from 'react'
import ReactDOM from 'react-dom/client'
import Graph from 'react-vis-ts'

const graph = {
  nodes: [
    { id: 1, label: 'Node 1', title: 'node 1 tootip text' },
    { id: 2, label: 'Node 2', title: 'node 2 tootip text' },
    { id: 3, label: 'Node 3', title: 'node 3 tootip text' },
    { id: 4, label: 'Node 4', title: 'node 4 tootip text' },
    { id: 5, label: 'Node 5', title: 'node 5 tootip text' },
  ],
  edges: [
    { from: 1, to: 2 },
    { from: 1, to: 3 },
    { from: 2, to: 4 },
    { from: 2, to: 5 },
  ],
};
const events = {
  // select: function (event: any) {
  //   // var { nodes, edges } = event;
  // },
};
const options = {
  layout: {
    hierarchical: false,
  },
  nodes: {
    widthConstraint: { minimum: 50 },
  },
  edges: {
    color: '#000000',
    length: '200',
    smooth: { enabled: true, type: 'dynamic' },
  },
};

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement)
root.render(
    <React.StrictMode>
      <div>
        <Graph graph={graph} options={options} events={events} style={{ height: '640px' }} />
      </div>
    </React.StrictMode>,
)

```

[npm-url]: https://www.npmjs.com/package/react-vis-ts
[npm-image]: https://img.shields.io/npm/v/react-vis-ts
[github-license]: https://img.shields.io/github/license/gapon2401/my-react-typescript-package
[github-license-url]: https://github.com/GraceLR/react-vis-ts/blob/master/LICENSE
[github-build]: https://github.com/GraceLR/react-vis-ts/actions/workflows/publish.yml/badge.svg
[github-build-url]: https://github.com/GraceLR/react-vis-ts/actions/workflows/publish.yml
[npm-typescript]: https://img.shields.io/npm/types/react-vis-ts