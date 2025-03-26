import React from 'react';
import { Box, Flex, Heading, Text, Button, useColorModeValue, VStack } from '@chakra-ui/react';

const HomePage = () => {
  const bg = useColorModeValue('gray.50', 'gray.800');

  return (
    <Flex flex="1" direction="column" bg={bg}>
      {/* Hero Section */}
      <Flex
        flex="1"
        direction={{ base: 'column', lg: 'row' }}
        p={6}
        bgPosition="center"
        align="center"
        justify="center"
        textAlign="center"
        color="white"
      >
        <Box maxW="90%" height="600px" p={6} bg="rgba(255, 255, 255, 0.6)" borderRadius="md" shadow="md" color="black">
          <Heading size="xl" mb={4}>Ensuring Structural Integrity, Safety & Longevity</Heading>
          <Text fontSize="lg">
            Empowering infrastructure with real-time health monitoring solutions.  
            Our cutting-edge SHM technology provides actionable insights to prevent structural failures.
          </Text>
          {/* <Button mt={4} colorScheme="green" size="lg">
            Get Started
          </Button> */}
        </Box>
      </Flex>

      {/* Section: How It Works */}
      <Box py={10} textAlign="center">
        <Heading size="lg" mb={6}>How Structural Health Monitoring Works</Heading>
        <Flex wrap="wrap" justify="center" maxW="1200px" mx="auto" gap={6}>
          <Box p={6} borderRadius="md" bg="white" shadow="md" textAlign="center" w="300px">
            <Heading size="md" mb={2}>📡 Sensors & Data Collection</Heading>
            <Text>Our high-precision sensors continuously track vibrations, stress, and temperature changes.</Text>
          </Box>
          <Box p={6} borderRadius="md" bg="white" shadow="md" textAlign="center" w="300px">
            <Heading size="md" mb={2}>📊 AI-Powered Insights</Heading>
            <Text>Advanced machine learning models analyze data in real-time to detect anomalies.</Text>
          </Box>
          <Box p={6} borderRadius="md" bg="white" shadow="md" textAlign="center" w="300px">
            <Heading size="md" mb={2}>🛠 Predictive Maintenance</Heading>
            <Text>Proactive monitoring helps schedule maintenance before major failures occur.</Text>
          </Box>
        </Flex>
      </Box>

      {/* Section: Why Choose Us */}
      <Box py={10} bg="gray.100" textAlign="center">
        <Heading size="lg" mb={6}>Why Choose Our SHM Solutions?</Heading>
        <Flex wrap="wrap" justify="center" maxW="1200px" mx="auto" gap={6}>
          <Box p={6} borderRadius="md" bg="white" shadow="md" w="300px">
            <Heading size="md" mb={2}>🚀 Real-Time Alerts</Heading>
            <Text>Instant notifications about critical changes in structure integrity.</Text>
          </Box>
          <Box p={6} borderRadius="md" bg="white" shadow="md" w="300px">
            <Heading size="md" mb={2}>📈 Data-Driven Decisions</Heading>
            <Text>Make informed decisions based on AI-powered reports.</Text>
          </Box>
          <Box p={6} borderRadius="md" bg="white" shadow="md" w="300px">
            <Heading size="md" mb={2}>🔧 Cost-Effective Solutions</Heading>
            <Text>Reduce repair costs by detecting potential failures early.</Text>
          </Box>
        </Flex>
      </Box>

      {/* Section: Case Studies */}
      <Box py={10} textAlign="center">
        <Heading size="lg" mb={6}>Real-World Impact</Heading>
        <Flex wrap="wrap" justify="center" maxW="1200px" mx="auto" gap={6}>
          <Box p={6} borderRadius="md" bg="white" shadow="md" w="300px">
            <Heading size="md" mb={2}>🏗 Bridges</Heading>
            <Text>Our SHM system detected early corrosion signs, preventing a major collapse.</Text>
          </Box>
          <Box p={6} borderRadius="md" bg="white" shadow="md" w="300px">
            <Heading size="md" mb={2}>🏢 High-Rise Buildings</Heading>
            <Text>Monitored structural stress during an earthquake, ensuring safety.</Text>
          </Box>
          <Box p={6} borderRadius="md" bg="white" shadow="md" w="300px">
            <Heading size="md" mb={2}>🚄 Railways</Heading>
            <Text>Detected cracks in railway tracks before they led to accidents.</Text>
          </Box>
        </Flex>
      </Box>

      {/* Section: Call to Action */}
      <Box py={10} bg="green.300" color="white" textAlign="center" borderRadius="md">
        <Heading size="lg" mb={4}>Secure Your Infrastructure Today</Heading>
        <Text fontSize="lg" mb={4}>
          Get in touch to deploy our advanced SHM technology and protect your assets.
        </Text>
        <Button size="lg" colorScheme="whiteAlpha">Contact Us</Button>
      </Box>
    </Flex>
  );
};

export default HomePage;
