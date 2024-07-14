import React from "react";
import { Box, Flex, Text } from "gestalt";

type DebugAreaProps = {
  [key: string]: any;
};

const formatValue = (value: any) => {
  if (Array.isArray(value)) {
    return value.map((v) => JSON.stringify(v)).join("\n\n");
  }
  return JSON.stringify(value, null, 2);
};

const DebugArea = (props: DebugAreaProps) => {
  return (
    <Box
      position="fixed"
      bottom
      left
      padding={2}
      margin={2}
      rounding={2}
      overflow="auto"
      maxHeight="50vh"
      maxWidth="100vw"
      borderStyle="sm"
    >
      <Text weight="bold">🐞 Debug Area 🐞</Text>
      <pre style={{ whiteSpace: "pre-wrap", wordBreak: "break-all" }}>
        {Object.entries(props).map(([key, value]) => (
          <div key={key}>
            <Text weight="bold">{key}:</Text>
            <pre>{formatValue(value)}</pre>
          </div>
        ))}
      </pre>
    </Box>
  );
};

export default DebugArea;
