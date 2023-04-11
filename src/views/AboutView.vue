<!-- <template>
  <div class="about">
    <div class="card">
      <div ref="canvasContainer1" class="canvas"></div>
      <h3 class="card-title">Card 1</h3>
      <p>This is the description for Card 1</p>
    </div>
    <div class="card">
      <div ref="canvasContainer2" class="canvas"></div>
      <h3 class="card-title">Card 2</h3>
      <p>This is the description for Card 2</p>
    </div>
  </div>
</template> -->
<template>
  <!-- <div class="card">
    <div ref="canvasContainer1" class="canvas"></div>
    <h3 class="card-title">Card 1</h3>
    <p>This is the description for Card 1</p>
  </div> -->
  <v-container fluid grid-list-md>
    <v-layout row wrap>
      <v-flex xs12 md6 lg3>
        <v-card width="400" height="400">
          <v-card-item>
            <div ref="canvasContainer1" class="canvas">test</div>
          </v-card-item>
          <v-card-title> test </v-card-title>
          <v-card-subtitle> test </v-card-subtitle>

          <v-card-text> This is content </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 md6 lg3>
        <v-card width="400">
          <v-card-item>
            <div ref="canvasContainer2" class="canvas">test</div>
          </v-card-item>
          <v-card-title> test </v-card-title>
          <v-card-subtitle> test </v-card-subtitle>

          <v-card-text> This is content </v-card-text>
        </v-card>
      </v-flex>

      <v-flex xs12 md6 lg3>
        <v-card width="400">
          <v-card-item>
            <div class="canvas">test</div>
          </v-card-item>
          <v-card-title> test </v-card-title>
          <v-card-subtitle> test </v-card-subtitle>

          <v-card-text> This is content </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  <!-- <v-content>
    <v-container fluid grid-list-md>
      <v-layout row wrap>
        <v-flex v-for="item in state.items" :key="item.id" xs12 md6 lg3>
          <v-card width="95%">
            <v-card-item>
              <div ref="canvasContainer1" class="canvas"></div>
            </v-card-item>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0" v-text="item.itemName"></h3>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="orange" class="body-1">Inquire Item</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </v-content> -->
</template>

<script>
// eslint-disable-next-line
import { ref, onMounted } from "vue";
// eslint-disable-next-line
import * as THREE from "three";

export default {
  setup() {
    const state = {
      items: [{ id: 1, itemName: "asdsa" }],
    };

    const canvasContainer1 = ref(null);
    const canvasContainer2 = ref(null);

    onMounted(() => {
      initThreeJs(canvasContainer1.value, "cube");
      initThreeJs(canvasContainer2.value, "cone");
    });

    const initThreeJs = (canvasContainer, shape) => {
      // Create the scene, camera, and renderer
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        canvasContainer.clientWidth / canvasContainer.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 5;
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(
        canvasContainer.clientWidth,
        canvasContainer.clientHeight
      );
      canvasContainer.appendChild(renderer.domElement);

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

      // Animation loop
      const animate = () => {
        requestAnimationFrame(animate);

        mesh.rotation.y += 0.01;

        renderer.render(scene, camera);
      };

      animate();
    };

    return {
      canvasContainer1,
      canvasContainer2,
      state,
    };
  },
};
</script>

<style scoped>
.card {
  background-color: white;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 4px;
  margin-top: 2rem;
  height: 400px; /* Set height of canvas container */
  width: 400px; /* Set width of canvas container */
  position: relative;
}

.canvas {
  height: 200px; /* Set height of canvas container */
  width: 200px; /* Set width of canvas container */
}

.card-title {
  margin: 0;
  font-size: 1.2rem;
}
</style>
