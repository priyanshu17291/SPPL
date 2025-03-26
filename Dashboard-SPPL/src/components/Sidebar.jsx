import { useState } from "react";
import { 
  Box, VStack, Button, Collapse, Text, Flex, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, useDisclosure, useBreakpointValue, Icon 
} from "@chakra-ui/react";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";
import { MdMenu } from "react-icons/md";
import { NavLink } from "react-router-dom";

const pallete = {
  hover_blue: "blue.500",
  btn_blue: "blue.600",
  hover_main_blue: "blue.700",
  main_blue: "blue.800",
  white: "white"
};

const menuItems = [
  { type: 'link', name: 'General', to: '/general' },
  { type: 'link', name: 'Admin', to: '/admin' },
  { type: 'link', name: 'Profile', to: '/profile' },
  { 
    type: 'dropdown', 
    name: 'Project', 
    children: [
      { name: 'Project A', to: '/project/project-a' },
      { name: 'Project B', to: '/project/project-b' }
    ]
  },
  { 
    type: 'dropdown', 
    name: 'Design Proof Check', 
    children: [
      { name: 'Compliance Report', to: '/project/compliance-report' },
      { name: 'Analysis Report', to: '/project/project-report' }
    ]
  },
  { 
    type: 'dropdown', 
    name: 'Non-Destructive Evaluation',
    children: [
      { 
        type: 'dropdown', 
        name: 'Done By Other Party', 
        children: [
          { name: 'Compliance Report', to: '/project/project-a' }
        ]
      },
      { 
        type: 'dropdown', 
        name: 'Done By SPPL India', 
        children: [
          { name: 'Test Methodology', to: '/project/project-a' },
          { name: 'Test Results', to: '/project/project-a' },
          { name: 'Compliance Report', to: '/project/project-a' }
        ]
      },
    ]
  },
  { 
    type: 'dropdown', 
    name: 'Load Testing', 
    children: [
      { name: 'Project A', to: '/project/project-a' },
      { name: 'Project B', to: '/project/project-b' }
    ]
  },
  { 
    type: 'dropdown', 
    name: 'Structural Health Monitoring (SHM)', 
    children: [
      { name: 'Sensor Layout', to: '/SensorLayout' },
      { name: 'Sensor Based Monitoring', to: '/SensorMonitoring' },
      { name: 'Frequency Analysis', to: '/FreqencyAnalysis' },
      { name: 'Deflection Profile', to: '/Deflection Profile'}
    ]
  },
  { 
    type: 'dropdown', 
    name: 'Advanced Features', 
    children: [
      { name: 'Project A', to: '/project/project-a' },
      { name: 'Project B', to: '/project/project-b' }
    ]
  },
  { type: 'link', name: 'Threshold Based Alerts', to: '/alerts' },
  { type: 'link', name: 'Report Generation', to: '/reports' },
  { type: 'link', name: 'Contact', to: '/contact' },
  { type: 'link', name: 'Settings', to: '/settings' }
];

const DirectLink = ({ name, to }) => (
  <NavLink to={to} style={{ width: "100%" }}>
    <Flex 
      align="center" 
      p="2" 
      _hover={{ bg: pallete.hover_main_blue, borderRadius: "md" }}
    >
      <Text>{name}</Text>
    </Flex>
  </NavLink>
);

const DropdownItem = ({ name, childrenItems, isCollapsed, openDropdowns, setOpenDropdowns }) => {
  const isOpen = openDropdowns.includes(name);
  const toggleDropdown = () => {
    if (isOpen) {
      setOpenDropdowns(openDropdowns.filter(n => n !== name));
    } else {
      setOpenDropdowns([...openDropdowns, name]);
    }
  };

  return (
    <Box w="100%">
      <Flex
        align="center"
        p="2"
        cursor="pointer"
        onClick={toggleDropdown}
        _hover={{ bg: pallete.hover_main_blue, borderRadius: "md" }}
      >
        <Text flex="1">{name}</Text>
        {!isCollapsed && (
          <Icon 
            as={isOpen ? FiChevronUp : FiChevronDown} 
            boxSize="4" 
          />
        )}
      </Flex>
      <Collapse in={isOpen} animateOpacity>
        <VStack align="start" pl="4" spacing="1">
          {childrenItems.map(child => renderMenuItem(child, isCollapsed, openDropdowns, setOpenDropdowns))}
        </VStack>
      </Collapse>
    </Box>
  );
};

const renderMenuItem = (item, isCollapsed, openDropdowns, setOpenDropdowns) => {
  if (item.type === "link" || !item.type) {
    return <DirectLink key={item.name} name={item.name} to={item.to} />;
  } else if (item.type === "dropdown") {
    return (
      <DropdownItem
        key={item.name}
        name={item.name}
        childrenItems={item.children}
        isCollapsed={isCollapsed}
        openDropdowns={openDropdowns}
        setOpenDropdowns={setOpenDropdowns}
      />
    );
  }
  return null;
};

const SidebarContent = ({ isCollapsed, openDropdowns, setOpenDropdowns }) => {
  const width = isCollapsed ? "0" : "16rem";
  return (
    <Box
      w={width}
      bg={pallete.main_blue}
      color={pallete.white}
      maxH="100vh"
      overflow="auto"
      p={isCollapsed ? "0" : "2"}
      boxShadow="lg"
      display="flex"
      flexDirection="column"
      transition="width 0.3s ease-in-out"
      css={{ "&::-webkit-scrollbar": { width: "4px" } }}
      position="relative"
      left="0"
      top="0"
      bottom="0"
      zIndex="1003"
      pt="16"
    >
      {!isCollapsed && (
        <VStack align="start" spacing="2" w="100%">
          {menuItems.map(item =>
            renderMenuItem(item, isCollapsed, openDropdowns, setOpenDropdowns)
          )}
        </VStack>
      )}
    </Box>
  );
};

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [openDropdowns, setOpenDropdowns] = useState([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const isMobile = useBreakpointValue({ base: true, md: false });

  // Handle toggle: open a Drawer for mobile, or collapse/expand for desktop.
  const handleToggle = () => {
    if (isMobile) {
      onOpen();
    } else {
      setIsCollapsed(!isCollapsed);
    }
  };

  return (
    <>
      {/* Fixed Toggle Button */}
      <Button
        onClick={handleToggle}
        position="absolute"
        top="4"
        left="4"
        bg={pallete.btn_blue}
        color={pallete.white}
        _hover={{ bg: pallete.hover_blue }}
        zIndex="1005"
      >
        <MdMenu size="1.5em" />
      </Button>

      {/* Sidebar for non-mobile devices */}
      {!isMobile && (
        <SidebarContent
          isCollapsed={isCollapsed}
          openDropdowns={openDropdowns}
          setOpenDropdowns={setOpenDropdowns}
        />
      )}

      {/* Sidebar inside a Drawer for mobile devices */}
      {isMobile && (
        <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
          <DrawerOverlay />
          <DrawerContent bg={pallete.btn_blue} color={pallete.white} p="4">
            <DrawerCloseButton />
            <SidebarContent
              isCollapsed={false}
              openDropdowns={openDropdowns}
              setOpenDropdowns={setOpenDropdowns}
            />
          </DrawerContent>
        </Drawer>
      )}
    </>
  );
};

export default Sidebar;
