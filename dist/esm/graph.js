import { __assign } from "tslib";
import React, { useState, useEffect } from 'react';
import { DataSet } from 'vis-data';
import { Network } from 'vis-network';
import defaultsDeep from 'lodash/fp/defaultsDeep';
import isEqual from 'lodash/isEqual';
import differenceWith from 'lodash/differenceWith';
import intersectionWith from 'lodash/intersectionWith';
var diff = function (current, next, field) {
    if (field === void 0) { field = 'id'; }
    var nextIds = new Set(next.map(function (item) { return item[field]; }));
    var removed = current.filter(function (item) { return !nextIds.has(item[field]); });
    var unchanged = intersectionWith(next, current, isEqual);
    var updated = differenceWith(intersectionWith(next, current, function (a, b) { return a[field] === b[field]; }), unchanged, isEqual);
    var added = differenceWith(differenceWith(next, current, isEqual), updated, isEqual);
    return {
        removed: removed,
        unchanged: unchanged,
        updated: updated,
        added: added
    };
};
function Graph(props) {
    var container = React.useRef(null);
    var nodes = useState(new DataSet())[0];
    var edges = useState(new DataSet())[0];
    var _a = useState(undefined), netWork = _a[0], setNetWork = _a[1];
    if (container.current) {
        if (netWork) {
            var events = props.events || {};
            for (var _i = 0, _b = Object.keys(events); _i < _b.length; _i++) {
                var eventName = _b[_i];
                netWork.off(eventName);
                netWork.on(eventName, events[eventName]);
            }
        }
        var nodesChange = !isEqual(nodes.get(), props.graph.nodes);
        if (nodesChange) {
            var idIsEqual = function (n1, n2) { return n1.id === n2.id; };
            var nodesRemoved = differenceWith(nodes.get(), props.graph.nodes, idIsEqual);
            var nodesAdded = differenceWith(props.graph.nodes, nodes.get(), idIsEqual);
            var nodesChanged = differenceWith(differenceWith(props.graph.nodes, nodes.get(), isEqual), nodesAdded);
            nodes.remove(nodesRemoved);
            nodes.update(nodesChanged);
            nodes.add(nodesAdded);
        }
        var edgesChange = !isEqual(edges.get(), props.graph.edges);
        if (edgesChange) {
            var _c = diff(edges.get(), props.graph.edges), edgesRemoved = _c.removed, edgesAdded = _c.added, edgesChanged = _c.updated;
            edges.remove(edgesRemoved);
            edges.update(edgesChanged);
            edges.add(edgesAdded);
        }
    }
    useEffect(function () {
        if (container.current) {
            var defaultOptions = {
                physics: {
                    stabilization: false
                },
                autoResize: false,
                edges: {
                    smooth: false,
                    color: '#000000',
                    width: 0.5,
                    arrows: {
                        to: {
                            enabled: true,
                            scaleFactor: 0.5
                        }
                    }
                }
            };
            var options = defaultsDeep(defaultOptions, props.options);
            var netWork_1 = new Network(container.current, __assign(__assign({}, props.graph), { edges: edges, nodes: nodes }), options);
            setNetWork(function (_prev) { return netWork_1; });
        }
    }, [container.current]);
    var style = __assign({ width: '100%', height: '100%' }, props.style);
    return React.createElement("div", { ref: container, style: style });
}
export default Graph;
//# sourceMappingURL=graph.js.map