import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "./Sidebar";
import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Flex h="100vh"> {/* Ensure the layout takes full screen height */}
      <Sidebar />
      <Box flex="1" display="flex" flexDirection="column">
        <Navbar />
        <Box flex="1" overflow="auto" p="6"> {/* Ensures content fits within the screen */}
          <Outlet /> {/* This will render the page content */}
        </Box>
      </Box>
    </Flex>
  );
};

export default Layout;
