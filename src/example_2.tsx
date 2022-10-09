import React from "react";
import DemoGraph_2 from "./demoGraph_2";
import CodeDisplay_2 from "./codeDisplay_2";

function Example_2(props: {
  copiedTwo: boolean;
  setCopiedTwo: React.Dispatch<React.SetStateAction<any>>;
  setCopiedOne: React.Dispatch<React.SetStateAction<any>>;
}) {
  return (
    <div style={{ display: "flex", paddingLeft: "1vw" }}>
      <div>
        <h3>Example 2:</h3>
        <DemoGraph_2 />
      </div>
      <div>
        <div>
          <h3>Events:</h3>
          <ul>
            <li>Select a node or an edge - click on the node or edge.</li>
            <li>
              Add a node and an edge - press 'shift' and click after selecting a
              node.
            </li>
          </ul>
        </div>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: "1vw" }}>
            <h3>Source code:</h3>
            {props.copiedTwo && (
              <span style={{ color: "green" }}>Copied to clipboard!</span>
            )}
          </div>
          <CodeDisplay_2
            setCopiedTwo={props.setCopiedTwo}
            setCopiedOne={props.setCopiedOne}
          />
        </div>
      </div>
    </div>
  );
}
export default Example_2;
