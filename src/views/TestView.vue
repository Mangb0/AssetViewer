<template>
  <div>
    <div v-for="sceneId in sceneIds" :key="sceneId" class="canvas-container">
      <div ref="canvasRef" class="canvas"></div>
      <div class="scene-title">Scene {{ sceneId }}</div>
      <button class="inquire-item-btn">Inquire Item</button>
    </div>
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
    // const sceneIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
    // const canvasRefs = ref([]);
    const makeScene = (elem) => {
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        45,
        elem.clientWidth / elem.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 2;
      camera.position.set(0, 1, 2);
      camera.lookAt(0, 0, 0);

      {
        const color = 0xffffff;
        const intensity = 1;
        const light = new THREE.DirectionalLight(color, intensity);
        light.position.set(-1, 2, 4);
        scene.add(light);
      }

      return { scene, camera, elem };
    };

    return {
      makeScene,
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
