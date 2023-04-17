<template>
  <ul class="cards">
    <li class="cards__item">
      <div class="card">
        <canvas id="defaultCanvas0" class="card__image"> </canvas>
        <div class="card__content">
          <div class="card__title">Flex</div>
          <p class="card__text">
            This is the shorthand for flex-grow, flex-shrink and flex-basis
            combined. The second and third parameters (flex-shrink and
            flex-basis) are optional. Default is 0 1 auto.
          </p>
          <button class="btn btn--block card__btn">Button</button>
        </div>
      </div>
    </li>
    <li class="cards__item">
      <div class="card">
        <canvas id="defaultCanvas1" class="card__image"> </canvas>
        <div class="card__content">
          <div class="card__title">Flex Grow</div>
          <p class="card__text">
            This defines the ability for a flex item to grow if necessary. It
            accepts a unitless value that serves as a proportion. It dictates
            what amount of the available space inside the flex container the
            item should take up.
          </p>
          <button class="btn btn--block card__btn">Button</button>
        </div>
      </div>
    </li>
    <li class="cards__item">
      <div class="card">
        <div class="card__image card__image--record"></div>
        <div class="card__content">
          <div class="card__title">Flex Shrink</div>
          <p class="card__text">
            This defines the ability for a flex item to shrink if necessary.
            Negative numbers are invalid.
          </p>
          <button class="btn btn--block card__btn">Button</button>
        </div>
      </div>
    </li>
    <li class="cards__item">
      <div class="card">
        <div class="card__image card__image--flowers"></div>
        <div class="card__content">
          <div class="card__title">Flex Basis</div>
          <p class="card__text">
            This defines the default size of an element before the remaining
            space is distributed. It can be a length (e.g. 20%, 5rem, etc.) or a
            keyword. The auto keyword means "look at my width or height
            property."
          </p>
          <button class="btn btn--block card__btn">Button</button>
        </div>
      </div>
    </li>
  </ul>
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

      const setSize = () => {
        const rect = document
          .getElementById("defaultCanvas0")
          .getBoundingClientRect();
        renderer.setSize(canvas.clientWidth, canvas.clientHeight);
        console.log("rect", rect.width, rect.height);
        console.log("resize", canvas.clientWidth, canvas.clientHeight);
      };

      // 이벤트
      window.addEventListener("resize", setSize);
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

*,
*::before,
*::after {
  box-sizing: border-box;
}
html {
  background-color: #f0f0f0;
}
body {
  color: #999999;
  font-family: "Roboto", "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-style: normal;
  font-weight: 400;
  letter-spacing: 0;
  padding: 1rem;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  -moz-font-feature-settings: "liga" on;
}
img {
  height: auto;
  max-width: 100%;
  vertical-align: middle;
}
.btn {
  background-color: white;
  border: 1px solid #cccccc;
  color: #696969;
  padding: 0.5rem;
  text-transform: lowercase;
}
.btn--block {
  display: block;
  width: 100%;
}
.cards {
  display: flex;
  flex-wrap: wrap;
  list-style: none;
  margin: 0;
  padding: 0;
}
.cards__item {
  display: flex;
  padding: 1rem;
  width: 33.3333%;
}
.card {
  background-color: white;
  border-radius: 0.25rem;
  box-shadow: 0 20px 40px -14px rgba(0, 0, 0, 0.25);
  display: flex;
  flex-direction: column;
  overflow: hidden;
}
.card:hover .card__image {
  filter: contrast(100%);
}
.card__content {
  display: flex;
  flex: 1 1 auto;
  flex-direction: column;
  padding: 1rem;
}
.card__image {
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  border-top-left-radius: 0.25rem;
  border-top-right-radius: 0.25rem;
  filter: contrast(70%);
  overflow: hidden;
  position: relative;
  transition: filter 0.5s cubic-bezier(0.43, 0.41, 0.22, 0.91);
}
.card__image::before {
  content: "";
  display: block;
  padding-top: 66.6%;
}
.card__title {
  color: #696969;
  font-size: 1.25rem;
  font-weight: 300;
  letter-spacing: 2px;
  text-transform: uppercase;
}
.card__text {
  flex: 1 1 auto;
  font-size: 0.875rem;
  line-height: 1.5;
  margin-bottom: 1.25rem;
}
</style>
