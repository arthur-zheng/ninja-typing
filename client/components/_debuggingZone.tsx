import React from "react";
import { Box, Text } from "gestalt";

type DebugAreaProps = {
  [key: string]: any;
};

const DebugArea = (props: DebugAreaProps) => {
  return (
    <Box
      position="fixed"
      bottom
      right
      padding={4}
      margin={4}
      rounding={2}
      overflow="auto"
      maxHeight="50vh"
      maxWidth="100vw"
      borderStyle="sm"
    >
      <Text weight="bold">Debug Area</Text>
      <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
        {Object.entries(props).map(([key, value]) => (
          <div key={key}>
            <Text weight="bold">{key}:</Text>
            <pre>{JSON.stringify(value, null, 2)}</pre>
          </div>
        ))}
      </pre>
    </Box>
  );
};

export default DebugArea;
