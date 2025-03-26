import React from "react";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Box } from "@chakra-ui/react";

class ThreeDStructure extends React.Component {
  constructor(props) {
    super(props);
    this.containerRef = React.createRef();
    // We'll store the camera, controls, renderer, scene, and structure as instance variables.
    this.camera = null;
    this.controls = null;
    this.renderer = null;
    this.scene = null;
    this.structure = null;
    this.animationId = null;
    this.raycaster = new THREE.Raycaster();
    this.mouse = new THREE.Vector2();

    // Bind methods
    this.setIsometricView = this.setIsometricView.bind(this);
    this.onClick = this.onClick.bind(this);
    this.animate = this.animate.bind(this);
  }

  componentDidMount() {
    const container = this.containerRef.current;
    if (!container) return;

    // Get container dimensions
    const width = container.clientWidth * 0.8;
    const height = container.clientHeight * 0.8;

    // Create scene and structure group
    this.scene = new THREE.Scene();
    this.structure = new THREE.Group();

    // Set up the camera
    this.camera = new THREE.PerspectiveCamera(10, width / height, 0.1, 1000);
    this.camera.position.set(2, 1, 3);

    // Set up the renderer with antialiasing and pixel ratio adjustment
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setPixelRatio(window.devicePixelRatio);
    this.renderer.setSize(width, height);
    this.renderer.setClearColor("white");
    container.appendChild(this.renderer.domElement);

    // Set up OrbitControls
    this.controls = new OrbitControls(this.camera, this.renderer.domElement);

    // -------------------------------------------------------------------------------------
    // Build Your 3D Structure
    // -------------------------------------------------------------------------------------
    // Materials
    const blackMaterial = new THREE.MeshBasicMaterial({ color: "grey" });
    const originMaterial = new THREE.MeshBasicMaterial({ color: "white" });
    const silverMaterial = new THREE.MeshBasicMaterial({ color: "silver" });
    const greenMaterial = new THREE.MeshBasicMaterial({ color: "yellow" });
    // Axes Helper
    const axesHelper = new THREE.AxesHelper(1);
    this.structure.add(axesHelper);

    // Origin marker (small sphere at (0,0,0))
    const originGeometry = new THREE.SphereGeometry(0.02);
    const originSphere = new THREE.Mesh(originGeometry, originMaterial);
    originSphere.position.set(0, 0, 0);
    this.structure.add(originSphere);

    // Columns
    const rodRadius = 0.015;
    const columnGeometry = new THREE.CylinderGeometry(rodRadius, rodRadius, 1.6);
    const columnPositions = [
      [0.0, 0, 0.0],
      [0.4, 0, 0.0],
      [0.0, 0, 0.4],
      [0.4, 0, 0.4],
    ];
    columnPositions.forEach(pos => {
      const column = new THREE.Mesh(columnGeometry, blackMaterial);
      // Offset by 0.8 in Y so the bottom is at y=0
      column.position.set(pos[0], 0.8, pos[2]);
      this.structure.add(column);
    });

    // Beams
    const beamGeometry = new THREE.CylinderGeometry(rodRadius, rodRadius, 0.4);
    const beamPositions = [
      [0.2, 0.4, 0.4, "z"], [0.2, 0.8, 0.4, "z"], [0.2, 1.2, 0.4, "z"], [0.2, 1.6, 0.4, "z"],
      [0.2, 0.4, 0.0, "z"], [0.2, 0.8, 0.0, "z"], [0.2, 1.2, 0.0, "z"], [0.2, 1.6, 0.0, "z"],
      [0.4, 0.4, 0.2, "x"], [0.4, 0.8, 0.2, "x"], [0.4, 1.2, 0.2, "x"], [0.4, 1.6, 0.2, "x"],
      [0.0, 0.4, 0.2, "x"], [0.0, 0.8, 0.2, "x"], [0.0, 1.2, 0.2, "x"], [0.0, 1.6, 0.2, "x"],
    ];

    beamPositions.forEach(pos => {
      const beam = new THREE.Mesh(beamGeometry, silverMaterial);
      beam.position.set(pos[0], pos[1], pos[2]);
      const axis = pos[3];
      const angle = Math.PI / 2;
      if (axis === "x") beam.rotation.x = angle;
      else if (axis === "y") beam.rotation.y = angle;
      else if (axis === "z") beam.rotation.z = angle;
      this.structure.add(beam);
    });

    // -------------------------------------------------------------------------------------
    // Structure: Support Bases
    // -------------------------------------------------------------------------------------
    const baseGeometry = new THREE.BoxGeometry(0.1, 0.01, 0.1);
    columnPositions.forEach(pos => {
      const base = new THREE.Mesh(baseGeometry, greenMaterial);
      base.position.set(pos[0], -0.01, pos[2]);
      this.structure.add(base);
    });

    // -------------------------------------------------------------------------------------
    // Structure: Nodes and Text Sprites
    // -------------------------------------------------------------------------------------
    const sensorSphereGeometry = new THREE.SphereGeometry(rodRadius * 1.5);
    // Example sensor positions array (Satpura) - you can add more arrays or modify them
    const Satpura = [
      [0, 0.6, 0], [0.4, 0.2, 0], [0.4, 0.4, 0.4], [0, 0.4, 0.4],
      [0, 0.8, 0], [0.4, 0.8, 0], [0.4, 0.8, 0.4], [0, 0.8, 0.4],
      [0, 1.4, 0], [0.4, 1.2, 0], [0.4, 1.2, 0.4], [0.2, 1.2, 0.4],
      [0, 1.6, 0], [0.4, 1.6, 0], [0.4, 1.4, 0.4], [0, 1.6, 0.4],
    ];
    this.createSensors(Satpura, sensorSphereGeometry);

    // -------------------------------------------------------------------------------------
    // Add the structure to the scene, center it, and adjust the camera
    // -------------------------------------------------------------------------------------
    this.scene.add(this.structure);

    // Center the structure
    const box = new THREE.Box3().setFromObject(this.structure);
    const center = new THREE.Vector3();
    box.getCenter(center);
    this.structure.position.sub(center);

    // Adjust the camera to frame the structure
    const newBox = new THREE.Box3().setFromObject(this.structure);
    const boundingSphere = new THREE.Sphere();
    newBox.getBoundingSphere(boundingSphere);
    const newRadius = boundingSphere.radius;
    const fov = this.camera.fov * (Math.PI / 180);
    const distance = (newRadius / Math.sin(fov / 2)) * 1.2;
    const camDir = new THREE.Vector3().copy(this.camera.position).normalize();
    this.camera.position.copy(camDir.multiplyScalar(distance));
    this.camera.lookAt(0, 0, 0);
    this.camera.zoom = 1.3;
    this.camera.updateProjectionMatrix();
    this.controls.target.set(0, 0, 0);

    // Add event listener for click interactions
    window.addEventListener("click", this.onClick, false);

    // Start the animation loop
    this.animate();
  }

  createSensors(allPositions, sphereGeometry) {
    allPositions.forEach((pos, index) => {
      // Create sensor sphere
      const sphereMat = new THREE.MeshBasicMaterial({ color: "green" });
      const sphere = new THREE.Mesh(sphereGeometry, sphereMat);
      sphere.userData.isSensor = true; // Tag as sensor
      sphere.position.set(pos[0], pos[1], pos[2]);
      this.structure.add(sphere);

      // Create sensor text sprite and tag it as a sensor label
      const sprite = this.createTextSprite((index + 1).toString());
      sprite.userData.isSensorLabel = true;
      sprite.position.set(pos[0] + 0.1, pos[1], pos[2] + 0.1);
      this.structure.add(sprite);
    });
  }

  createTextSprite(text) {
    const container = this.containerRef.current;
    const canvas = document.createElement("canvas");
    canvas.style.display = "none";
    container.appendChild(canvas);

    const context = canvas.getContext("2d");
    const size = 128;
    canvas.width = size;
    canvas.height = size;

    // Clear the canvas and render the text
    context.clearRect(0, 0, size, size);
    context.fillStyle = "black";
    context.font = "bold 48px Arial";
    context.textAlign = "center";
    context.textBaseline = "middle";
    context.fillText(text, size / 2, size / 2);

    const texture = new THREE.CanvasTexture(canvas);
    texture.needsUpdate = true;
    const spriteMaterial = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(spriteMaterial);
    sprite.scale.set(0.1, 0.1, 0.1); // Adjust sprite size as needed
    return sprite;
  }

  onClick(event) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    this.mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
    this.mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

    this.raycaster.setFromCamera(this.mouse, this.camera);

    // Filter for objects created with a SphereGeometry
    const sphereObjects = this.structure.children.filter(
      obj => obj.geometry && obj.geometry.type === "SphereGeometry"
    );
    const intersects = this.raycaster.intersectObjects(sphereObjects);
    if (intersects.length > 0) {
      const clickedObject = intersects[0].object;
      // Toggle between green and red colors based on the hex values
      if (clickedObject.material.color.getHex() === 0x008000) {
        clickedObject.material.color.set("red");
      } else if (clickedObject.material.color.getHex() === 0xff0000) {
        clickedObject.material.color.set("green");
      }
    }
  }

  animate() {
    this.animationId = requestAnimationFrame(this.animate);
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  }

  // Method to set the camera to an isometric view
  setIsometricView() {
    if (this.camera && this.controls) {
      const targetPos = new THREE.Vector3(13, 9, 9);
      const duration = 1000; // in milliseconds
      const startTime = performance.now();
      const startPos = this.camera.position.clone();

      const animateCamera = (time) => {
        const elapsed = time - startTime;
        const t = Math.min(elapsed / duration, 1); // Clamp to 1
        this.camera.position.lerpVectors(startPos, targetPos, t);
        this.camera.lookAt(0, 0, 0);
        this.controls.target.set(0, 0, 0);
        this.controls.update();
        if (t < 1) {
          requestAnimationFrame(animateCamera);
        }
      };
      requestAnimationFrame(animateCamera);
    }
  }

  componentWillUnmount() {
    window.removeEventListener("click", this.onClick, false);
    if (this.containerRef.current && this.renderer) {
      this.containerRef.current.removeChild(this.renderer.domElement);
    }
    if (this.renderer) {
      this.renderer.dispose();
    }
    if (this.animationId) {
      cancelAnimationFrame(this.animationId);
    }
  }

  render() {
    return <Box ref={this.containerRef} w="100%" h="100%" />;
  }
}

export default ThreeDStructure;
