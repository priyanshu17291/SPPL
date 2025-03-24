import { 
    Box, Flex, Text, Spacer, Button, Image, IconButton,
    useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody 
  } from "@chakra-ui/react";
  import { HamburgerIcon } from "@chakra-ui/icons";
  import LoginCard from "./LoginCard";
  
  const pallete = {
    hover_blue: "blue.500",
    btn_blue: "blue.600",
    hover_main_blue: "blue.700",
    main_blue: "blue.800",
    white: "white",
    red: "#FFA07A"
  };
  
  const NavbarContent = ({ onOpen, onLoginOpen }) => {
    return (
      <Box bg={pallete.btn_blue} color="white" px="6" py="3" boxShadow="md">
        <Flex align="center">
          {/* Hamburger Icon for Mobile */}
          <IconButton 
            display={{ base: "flex", md: "none" }} 
            icon={<HamburgerIcon />} 
            onClick={onOpen} 
            aria-label="Open Menu"
            mr="4"
          />
          
          {/* Company Logos */}
          <Image src="/images/sppl-logo.png" alt="Company Logo" boxSize="45px" ml="14" />
          <Image src="/images/iitd-logo.png" alt="Subcompany Logo" boxSize="45px" ml="5" />
          <Text fontSize="xl" fontWeight="bold" ml="4">Sanrachna Prahari</Text>
          <Text fontSize="xxxl" fontWeight="semibold" ml="4" color={pallete.red}>
            ... An IITD Company
          </Text>
          <Spacer />
  
          {/* Login Button triggers the LoginCard modal */}
          <Button colorScheme="teal" size="sm" onClick={onLoginOpen}>
            Login
          </Button>
        </Flex>
      </Box>
    );
  };
  
  const Navbar = () => {
    // Disclosure for the mobile drawer
    const { isOpen: isDrawerOpen, onOpen: onDrawerOpen, onClose: onDrawerClose } = useDisclosure();
    // Disclosure for the login modal
    const { isOpen: isLoginOpen, onOpen: onLoginOpen, onClose: onLoginClose } = useDisclosure();
  
    return (
      <>
        {/* Main Navbar */}
        <NavbarContent onOpen={onDrawerOpen} onLoginOpen={onLoginOpen} />
  
        {/* Render the LoginCard component and pass isOpen and onClose */}
        <LoginCard isOpen={isLoginOpen} onClose={onLoginClose} />
  
        {/* Optionally, you can render your Drawer component for the mobile menu here */}
        {/* <Drawer isOpen={isDrawerOpen} placement="left" onClose={onDrawerClose}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerBody>
                // ... your mobile menu content
              </DrawerBody>
            </DrawerContent>
          </Drawer> */}
      </>
    );
  };
  
  export default Navbar;
  