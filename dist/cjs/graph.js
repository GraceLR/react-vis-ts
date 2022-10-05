"use strict";
exports.__esModule = true;
var tslib_1 = require("tslib");
var react_1 = tslib_1.__importStar(require("react"));
var vis_data_1 = require("vis-data");
var vis_network_1 = require("vis-network");
var defaultsDeep_1 = tslib_1.__importDefault(require("lodash/fp/defaultsDeep"));
var isEqual_1 = tslib_1.__importDefault(require("lodash/isEqual"));
var differenceWith_1 = tslib_1.__importDefault(require("lodash/differenceWith"));
var intersectionWith_1 = tslib_1.__importDefault(require("lodash/intersectionWith"));
var diff = function (current, next, field) {
    if (field === void 0) { field = 'id'; }
    // consider caching this value between updates
    var nextIds = new Set(next.map(function (item) { return item[field]; }));
    var removed = current.filter(function (item) { return !nextIds.has(item[field]); });
    var unchanged = (0, intersectionWith_1["default"])(next, current, isEqual_1["default"]);
    var updated = (0, differenceWith_1["default"])((0, intersectionWith_1["default"])(next, current, function (a, b) { return a[field] === b[field]; }), unchanged, isEqual_1["default"]);
    var added = (0, differenceWith_1["default"])((0, differenceWith_1["default"])(next, current, isEqual_1["default"]), updated, isEqual_1["default"]);
    return {
        removed: removed,
        unchanged: unchanged,
        updated: updated,
        added: added
    };
};
function Graph(props) {
    var container = react_1["default"].useRef(null);
    var nodes = (0, react_1.useState)(new vis_data_1.DataSet())[0];
    var edges = (0, react_1.useState)(new vis_data_1.DataSet())[0];
    var _a = (0, react_1.useState)(undefined), netWork = _a[0], setNetWork = _a[1];
    if (container.current) {
        if (netWork) {
            // netWork.off();
            var events = props.events || {};
            for (var _i = 0, _b = Object.keys(events); _i < _b.length; _i++) {
                var eventName = _b[_i];
                netWork.off(eventName);
                netWork.on(eventName, events[eventName]);
            }
        }
        var nodesChange = !(0, isEqual_1["default"])(nodes.get(), props.graph.nodes);
        if (nodesChange) {
            var idIsEqual = function (n1, n2) { return n1.id === n2.id; };
            var nodesRemoved = (0, differenceWith_1["default"])(nodes.get(), props.graph.nodes, idIsEqual);
            var nodesAdded = (0, differenceWith_1["default"])(props.graph.nodes, nodes.get(), idIsEqual);
            var nodesChanged = (0, differenceWith_1["default"])((0, differenceWith_1["default"])(props.graph.nodes, nodes.get(), isEqual_1["default"]), nodesAdded);
            nodes.remove(nodesRemoved);
            nodes.update(nodesChanged);
            nodes.add(nodesAdded);
        }
        var edgesChange = !(0, isEqual_1["default"])(edges.get(), props.graph.edges);
        if (edgesChange) {
            var _c = diff(edges.get(), props.graph.edges), edgesRemoved = _c.removed, edgesAdded = _c.added, edgesChanged = _c.updated;
            edges.remove(edgesRemoved);
            edges.update(edgesChanged);
            edges.add(edgesAdded);
        }
    }
    (0, react_1.useEffect)(function () {
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
            // merge user provied options with our default ones
            var options = (0, defaultsDeep_1["default"])(defaultOptions, props.options);
            var netWork_1 = new vis_network_1.Network(container.current, tslib_1.__assign(tslib_1.__assign({}, props.graph), { edges: edges, nodes: nodes }), options);
            setNetWork(function (_prev) { return netWork_1; });
        }
    }, [container.current]);
    var style = tslib_1.__assign({ width: '100%', height: '100%' }, props.style);
    return react_1["default"].createElement("div", { ref: container, style: style });
}
exports["default"] = Graph;
//# sourceMappingURL=graph.js.map