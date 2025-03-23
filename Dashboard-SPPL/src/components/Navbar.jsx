import { 
    Box, Flex, Text, Spacer, Button, Image, IconButton, 
    useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerBody 
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

const Navbar = ({ onOpen }) => {
    return (
        <Box bg="blue.600" color="white" px="6" py="3" boxShadow="md">
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
                <Image src="/images/sppl-logo.png" alt="Company Logo" boxSize="40px" mr="2" />
                <Image src="/images/iitd-logo.png" alt="Subcompany Logo" boxSize="35px" />

                <Text fontSize="xl" fontWeight="bold" ml="4">My Website</Text>
                
                <Spacer />

                {/* Login Button */}
                <Button colorScheme="teal" size="sm">Login</Button>
            </Flex>
        </Box>
    );
};

const ResponsiveNavbar = () => {
    const { isOpen, onOpen, onClose } = useDisclosure();

    return (
        <>
            {/* Sidebar Drawer for Mobile */}
            <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerBody>
                        {/* Sidebar content goes here */}
                        <Text mt="6">Sidebar Menu Items</Text>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            {/* Main Navbar */}
            <Navbar onOpen={onOpen} />
        </>
    );
};

export default ResponsiveNavbar;
