<template>
  <v-container fluid>
    <v-row dense>
      <v-col v-for="canvas in state.items" :key="canvas.id" :cols="6">
        <v-card>
          <v-card-item>
            <canvas :id="canvas.id" class="canvas"> </canvas>
          </v-card-item>

          <v-card-title>test</v-card-title>
          <v-card-actions>
            <v-btn flat color="orange" class="body-1">Inquire Item</v-btn>
            <v-spacer></v-spacer>

            <v-btn
              size="small"
              color="surface-variant"
              variant="text"
              icon="mdi-heart"
            ></v-btn>

            <v-btn
              size="small"
              color="surface-variant"
              variant="text"
              icon="mdi-bookmark"
            ></v-btn>

            <v-btn
              size="small"
              color="surface-variant"
              variant="text"
              icon="mdi-share-variant"
            ></v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
  <div>
    <!-- <canvas
      v-for="canvas in state.items"
      :key="canvas.index"
      :id="canvas.id"
    ></canvas> -->
  </div>
</template>

<script>
import { onMounted } from "vue";
import * as THREE from "three";
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
        canvas.clientWidth,
        canvas.clientHeight
        // 200,
        // 200
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
.canvas {
  width: 100%;
  height: 100%;
  z-index: -1;
}
</style>
