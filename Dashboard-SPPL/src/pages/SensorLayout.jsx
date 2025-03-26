import React, { useRef } from "react";
import { Box, Heading, Button } from "@chakra-ui/react";
import { FiBox } from "react-icons/fi";
import ThreeDStructure from "../components/ThreeDStructure";

// Note: We destructure props here to get the handler and ref
const StructurePanel = ({ handleIsometric, threeDRef }) => (
    <Box
        flex="2"
        // bg="whiteAlpha.900"
        bg="rgb(235, 237, 251)"

        p={4}
        borderRadius="md"
        boxShadow="lg"
        w="100%"
        h="100%"
    >
        <Heading as="h2" size="md" mb={4}>
            Sensor Layout
        </Heading>

        {/* Parent container for row alignment */}
        <Box
            flex="1"
            display="flex"
            flexDirection="row"
            p={4}
            w="100%"
            h="95%"
        // borderRadius="md"
        // boxShadow="lg"
        >
            {/* Control Panel (left side) */}
            <Box
                w="25%"
                h="95%"
                position="relative"
                borderRadius="md"
                boxShadow="lg"
                bg="white"

                mr={4}
            >
                <Heading fontSize="xl" textAlign="center" mt="1em">
                    Control Panel
                </Heading>
                {/* Button to trigger isometric view */}
                <Button
                    position="absolute"
                    bottom="1em"
                    left="50%"
                    transform="translateX(-50%)"
                    colorScheme="blue"
                    p={4}
                    borderRadius="md"
                    onClick={handleIsometric}
                >
                    <FiBox size={20} />
                </Button>
            </Box>

            {/* 3D Structure (right side) */}
            <Box
                w="70%"
                h="95%"
                borderRadius="md"
                bg="white"
                boxShadow={"lg"}
                display="flex"
                alignItems="center"
                justifyContent="center"
            >
                {/* Pass the forwarded ref to ThreeDStructure */}
                <ThreeDStructure ref={threeDRef} />
            </Box>
        </Box>
    </Box>
);

const SensorLayout = () => {
    const threeDRef = useRef(null);

    const handleIsometric = () => {
        if (threeDRef.current) {
            threeDRef.current.setIsometricView();
        }
    };

    return (
        <StructurePanel
            handleIsometric={handleIsometric}
            threeDRef={threeDRef}
        />
    );
};

export default SensorLayout;
