import React, { useRef } from "react";
import { Box, Heading, Button } from "@chakra-ui/react";
import { FiBox } from "react-icons/fi";
import ThreeDStructure from "../components/ThreeDStructure";





const SensorMonitoring = () => {
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

export default SensorMonitoring;