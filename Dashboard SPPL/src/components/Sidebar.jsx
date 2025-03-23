import { useState } from "react";
import { 
  Box, VStack, Link, Icon, Button, Collapse, Text, Flex, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, useBreakpointValue 
} from "@chakra-ui/react";
import { FiHome, FiChevronDown, FiChevronUp, FiMenu, FiInfo, FiMail } from "react-icons/fi";
import { NavLink } from "react-router-dom";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [isHomeOpen, setIsHomeOpen] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  return (
    <>
      {/* Mobile Menu Button */}
      {isMobile && (
        <Button 
          onClick={onOpen} 
          position="absolute" 
          top="4" left="4"
          bg="blue.600"
          color="white"
          _hover={{ bg: "blue.500" }}
          zIndex="1000"
        >
          <Icon as={FiMenu} />
        </Button>
      )}

      {/* Sidebar for Desktop */}
      {!isMobile && (
        <SidebarContent 
          isCollapsed={isCollapsed} 
          setIsCollapsed={setIsCollapsed} 
          isHomeOpen={isHomeOpen} 
          setIsHomeOpen={setIsHomeOpen} 
        />
      )}

      {/* Sidebar for Mobile (Drawer) */}
      {isMobile && (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg="blue.800" color="white" p="4">
            <DrawerCloseButton />
            <SidebarContent isMobile isHomeOpen={isHomeOpen} setIsHomeOpen={setIsHomeOpen} />
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

// Sidebar Content (Used in Both Desktop and Mobile)
const SidebarContent = ({ isCollapsed, setIsCollapsed, isHomeOpen, setIsHomeOpen, isMobile }) => {
  return (
    <Box
      w={isCollapsed ? "80px" : "250px"}
      bg="blue.800"
      color="white"
      minH="100vh"
      p="4"
      boxShadow="lg"
      transition="width 0.3s"
      display="flex"
      flexDirection="column"
    >
      {/* Toggle Button (Only for Desktop) */}
      {!isMobile && (
        <Button
          onClick={() => setIsCollapsed(!isCollapsed)}
          bg="blue.600"
          color="white"
          _hover={{ bg: "blue.500" }}
          mb={4}
        >
          <Icon as={FiMenu} />
        </Button>
      )}

      {/* Navigation Items */}
      <VStack align="start" spacing={4} w="100%">
        {/* Home with Dropdown */}
        <Box w="100%">
          <Flex
            align="center"
            p="3"
            w="100%"
            cursor="pointer"
            _hover={{ bg: "blue.700" }}
            borderRadius="md"
            onClick={() => setIsHomeOpen(!isHomeOpen)}
          >
            <Icon as={FiHome} mr={isCollapsed ? "0" : "3"} />
            {!isCollapsed && <Text flex="1">Home</Text>}
            {!isCollapsed && <Icon as={isHomeOpen ? FiChevronUp : FiChevronDown} />}
          </Flex>

          {/* Dropdown Sub-Menu */}
          <Collapse in={isHomeOpen} animateOpacity>
            <VStack align="start" pl={isCollapsed ? "0" : "8"} spacing={2}>
              <NavItem to="/home/dashboard" label="Dashboard" isCollapsed={isCollapsed} />
              <NavItem to="/home/settings" label="Settings" isCollapsed={isCollapsed} />
            </VStack>
          </Collapse>
        </Box>

        {/* Other Links */}
        <NavItem to="/about" icon={FiInfo} label="About" isCollapsed={isCollapsed} />
        <NavItem to="/contact" icon={FiMail} label="Contact" isCollapsed={isCollapsed} />
      </VStack>
    </Box>
  );
};

// Reusable Nav Item Component
const NavItem = ({ to, icon, label, isCollapsed }) => {
  return (
    <Link
      as={NavLink}
      to={to}
      display="flex"
      alignItems="center"
      p="3"
      w="100%"
      _hover={{ bg: "blue.700" }}
      _activeLink={{ bg: "blue.600" }}
      borderRadius="md"
    >
      {icon && <Icon as={icon} mr={isCollapsed ? "0" : "3"} />}
      {!isCollapsed && label}
    </Link>
  );
};

export default Sidebar;
