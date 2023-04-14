<template>
  <div>
    <canvas
      v-for="canvas in state.items"
      :key="canvas.index"
      :id="canvas.id"
    ></canvas>
    <!-- <div v-for="sceneId in sceneIds" :key="sceneId" class="canvas-container">
      <div ref="canvasRef" class="canvas"></div>
      <div class="scene-title">Scene {{ sceneId }}</div>
      <button class="inquire-item-btn">Inquire Item</button>
    </div> -->
  </div>
</template>

<script>
// eslint-disable-next-line
import { ref, onMounted } from "vue";
// eslint-disable-next-line
import * as THREE from "three";
// eslint-disable-next-line
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default {
  setup() {
    const state = {
      items: [
        { index: 1, id: "defaultCanvas0" },
        { index: 2, id: "defaultCanvas1" },
      ],
    };

    onMounted(() => {
      initThreeJs("defaultCanvas0", "cube");
      initThreeJs("defaultCanvas1", "cone");
    });

    const initThreeJs = (canvasContainer, shape) => {
      // Create the scene, camera, and renderer
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        // canvasContainer.clientWidth / canvasContainer.clientHeight,
        2,
        0.1,
        1000
      );
      camera.position.z = 3;

      const canvas = document.getElementById(canvasContainer);
      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
      });
      renderer.setSize(
        // canvasContainer.clientWidth,
        // canvasContainer.clientHeight
        200,
        200
      );
      // canvasContainer.appendChild(renderer.domElement);

      // Add a cube or cone to the scene
      let geometry, material;
      if (shape === "cube") {
        geometry = new THREE.BoxGeometry();
        material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      } else if (shape === "cone") {
        geometry = new THREE.ConeGeometry(1, 2, 32);
        material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
      }
      const mesh = new THREE.Mesh(geometry, material);
      scene.add(mesh);
      // Create OrbitControls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableZoom = false;
      controls.enableDamping = true;

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
      };

      animate();
    };

    return {
      // canvasContainer1,
      // canvasContainer2,
      state,
    };
  },
};
</script>

<style scoped>
#c {
  position: fixed;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  display: block;
  z-index: -1;
}
.diagram {
  display: inline-block;
  width: 5em;
  height: 3em;
  border: 1px solid black;
}
.left {
  float: left;
  margin-right: 0.25em;
}
.right {
  float: right;
  margin-left: 0.25em;
}
</style>
