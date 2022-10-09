import React, { useState } from "react";
import DemoGraph_1 from "./demoGraph_1";
import CodeDisplay_1 from "./codeDisplay_1";

function Example_1() {
  const [copiedOne, setCopiedOne] = useState(false);
  return (
    <div style={{ display: "flex", paddingLeft: "1vw" }}>
      <div>
        <h3>Example 1:</h3>
        <DemoGraph_1 />
      </div>
      <div>
        <div>
          <h3>Events:</h3>
          <ul>
            <li>Select a node or an edge - click on the node or edge.</li>
          </ul>
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
            <h3>Source code:</h3>
            {copiedOne && (
              <span style={{ color: "green" }}>Copied to clipboard!</span>
            )}
          </div>
          <CodeDisplay_1 setCopiedOne={setCopiedOne} />
        </div>
      </div>
    </div>
  );
}
export default Example_1;
