import React, { useState, useEffect } from 'react';
import { DataSet } from 'vis-data';
import { Network, NetworkEvents } from 'vis-network';
import defaultsDeep from 'lodash/fp/defaultsDeep';
import isEqual from 'lodash/isEqual';
import differenceWith from 'lodash/differenceWith';
import intersectionWith from 'lodash/intersectionWith';

const diff = (current: any, next: any, field = 'id') => {
  const nextIds = new Set(next.map((item: any) => item[field]));
  const removed = current.filter((item: any) => !nextIds.has(item[field]));
  const unchanged = intersectionWith(next, current, isEqual);
  const updated = differenceWith(
    intersectionWith(next, current, (a: any, b: any) => a[field] === b[field]),
    unchanged,
    isEqual,
  );
  const added = differenceWith(differenceWith(next, current, isEqual), updated, isEqual);

  return {
    removed,
    unchanged,
    updated,
    added,
  };
};

function Graph(props: any) {
  // type fix
  const container = React.useRef<HTMLDivElement>(null);
  const [nodes] = useState(new DataSet());
  const [edges] = useState(new DataSet());
  const [netWork, setNetWork] = useState<Network | undefined>(undefined);

  if (container.current) {
    if (netWork) {
      const events = props.events || {};
      for (const eventName of Object.keys(events)) {
        netWork.off(eventName as NetworkEvents);
        netWork.on(eventName as NetworkEvents, events[eventName]);
      }
    }

    const nodesChange = !isEqual(nodes.get(), props.graph.nodes);
    if (nodesChange) {
      const idIsEqual = (n1: any, n2: any) => n1.id === n2.id;
      const nodesRemoved = differenceWith(nodes.get(), props.graph.nodes, idIsEqual);
      const nodesAdded = differenceWith(props.graph.nodes, nodes.get(), idIsEqual);
      const nodesChanged = differenceWith(differenceWith(props.graph.nodes, nodes.get(), isEqual), nodesAdded);
      nodes.remove(nodesRemoved);
      nodes.update(nodesChanged);
      nodes.add(nodesAdded);
    }
    const edgesChange = !isEqual(edges.get(), props.graph.edges);
    if (edgesChange) {
      const { removed: edgesRemoved, added: edgesAdded, updated: edgesChanged } = diff(edges.get(), props.graph.edges);

      edges.remove(edgesRemoved);
      edges.update(edgesChanged);
      edges.add(edgesAdded);
    }
  }

  useEffect(() => {
    if (container.current) {
      const defaultOptions = {
        physics: {
          stabilization: false,
        },
        autoResize: false,
        edges: {
          smooth: false,
          color: '#000000',
          width: 0.5,
          arrows: {
            to: {
              enabled: true,
              scaleFactor: 0.5,
            },
          },
        },
      };

      // merge user provied options with our default ones
      const options = defaultsDeep(defaultOptions, props.options);
      const netWork = new Network(
        container.current,
        {
          ...props.graph,
          edges: edges,
          nodes: nodes,
        },
        options,
      );
      setNetWork((_prev) => netWork);
    }
  }, [container.current]);

  const style = { width: '100%', height: '100%', ...props.style };

  return <div ref={container} style={style} />;
}

export default Graph;
