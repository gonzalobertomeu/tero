import { Box } from "ink";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout(props: MainLayoutProps) {
  return (
    <Box width={"100%"} height={"100%"} borderStyle={"double"}>
      {props.children}
    </Box>
  );
}
