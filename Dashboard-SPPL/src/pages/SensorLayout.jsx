import React from 'react';
import { Box, Flex, Heading, Select, Text, Button, useColorModeValue } from '@chakra-ui/react';
const StructurePanel = () => (
    <Box flex="2" bg="whiteAlpha.900" p={4} borderRadius="md" boxShadow="md">
        <Heading as="h2" size="md" mb={4}>Skeletal Structure</Heading>
        <Box w="100%" h="400px" border="1px solid green" borderColor="green" borderRadius="md" display="flex" alignItems="center" justifyContent="center">
            <Text color="gray.500">3D Model Placeholder</Text>
        </Box>
    </Box>
);
const SensorLayout = () => {
    return (
        <StructurePanel />
    );
};

export default SensorLayout;