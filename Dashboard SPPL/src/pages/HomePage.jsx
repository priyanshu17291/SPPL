import React from 'react';
import { Box, Flex, Heading, Select, Text, Button, useColorModeValue } from '@chakra-ui/react';

const HomePage = () => {
  const bg = useColorModeValue('gray.50', 'gray.800');

  return (
    <Flex flex="1" direction="column" bg={bg}> {/* Ensure it fills available space */}
      <Flex
        flex="1"
        direction={{ base: 'column', lg: 'row' }}
        p={4}
        bgImage="url('https://images.unsplash.com/photo-1600784023365-90c46ef6cba1?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')"
        bgSize="cover"
        bgPosition="center"
      >
        <SensorPanel />
        <StructurePanel />
      </Flex>
    </Flex>
  );
};

const SensorPanel = () => (
  <Box flex="1" mr={{ lg: 4 }} bg="whiteAlpha.900" p={4} borderRadius="md" boxShadow="md">
    <Heading as="h2" size="md" mb={4}>Choose Sensor</Heading>
    <Select placeholder="Select Sensor" mb={2} />
    <Button colorScheme="teal" mb={4}>Show</Button>
    <Heading as="h3" size="sm" mb={2}>Project</Heading>
    <Select placeholder="Select Project" mb={2} />
    <Heading as="h3" size="sm" mb={2}>Project Location</Heading>
    <Select placeholder="Project Location" mb={4} />
    <Text fontWeight="semibold">Temperature: <Text as="span">21.05°C</Text></Text>
    <Text fontWeight="semibold" mb={2}>Humidity: <Text as="span">64%</Text></Text>
  </Box>
);

const StructurePanel = () => (
  <Box flex="2" bg="whiteAlpha.900" p={4} borderRadius="md" boxShadow="md">
    <Heading as="h2" size="md" mb={4}>Skeletal Structure</Heading>
    <Box w="100%" h="400px" border="1px solid" borderColor="gray.300" borderRadius="md" display="flex" alignItems="center" justifyContent="center">
      <Text color="gray.500">3D Model Placeholder</Text>
    </Box>
  </Box>
);

export default HomePage;
