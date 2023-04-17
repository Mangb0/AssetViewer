<template>
  <div ref="canvasWrapper"></div>
</template>

<script>
import * as THREE from "three";

export default {
  mounted() {
    // Create a scene
    const scene = new THREE.Scene();

    // Create a camera
    const camera = new THREE.PerspectiveCamera(
      75,
      this.$refs.canvasWrapper.clientWidth /
        this.$refs.canvasWrapper.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    // Create a renderer
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(
      this.$refs.canvasWrapper.clientWidth,
      this.$refs.canvasWrapper.clientHeight
    );

    // Append the renderer's DOM element to the Vue component's root element
    this.$el.appendChild(renderer.domElement);

    // Create a cube geometry
    const geometry = new THREE.BoxGeometry();
    // Create a basic material with a color
    const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
    // Create a mesh by combining the geometry and material
    const cube = new THREE.Mesh(geometry, material);

    // Add the cube to the scene
    scene.add(cube);

    // Animation loop using arrow function
    const animate = () => {
      // Rotate the cube
      cube.rotation.x += 0.01;
      cube.rotation.y += 0.01;

      // Render the scene with the camera
      renderer.render(scene, camera);

      // Call the animate function recursively for smooth animation
      requestAnimationFrame(animate);
    };

    // Start the animation loop
    animate();
  },
};
</script>

<style scoped>
canvas {
  width: 100%;
  height: 100%;
}
</style>
