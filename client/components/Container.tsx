import { Flex } from "gestalt";

export function Container({ children }: { children: React.ReactNode }) {
  return (
    <Flex justifyContent="center" minHeight="100vh" alignItems="center">
      {children}
    </Flex>
  );
}
