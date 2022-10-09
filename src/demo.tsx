import React, { useState } from "react";
import Example_1 from "./example_1";
import Example_2 from "./example_2";

function Demo() {
  const [copiedOne, setCopiedOne] = useState<boolean>(false);
  const [copiedTwo, setCopiedTwo] = useState<boolean>(false);
  return (
    <>
      <Example_1
        copiedOne={copiedOne}
        setCopiedOne={setCopiedOne}
        setCopiedTwo={setCopiedTwo}
      />
      <Example_2
        copiedTwo={copiedTwo}
        setCopiedTwo={setCopiedTwo}
        setCopiedOne={setCopiedOne}
      />
    </>
  );
}
export default Demo;
