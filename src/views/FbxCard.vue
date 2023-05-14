<template>
  <ul class="cards">
    <li class="cards__item" v-for="(canvas, index) in state.items" :key="index">
      <div class="card">
        <canvas :id="canvas.id" class="card__image"> </canvas>
        <v-btn :id="index" class="btnToggle" flat icon color="transparent">
          <v-icon>mdi-camera</v-icon>
        </v-btn>
        <div class="card__content">
          <div class="card__title">{{ canvas.name }}</div>
          <p class="card__text">
            This is the shorthand for flex-grow, flex-shrink and flex-basis
            combined. The second and third parameters (flex-shrink and
            flex-basis) are optional. Default is 0 1 auto.
          </p>
          <button class="btn btn--block card__btn" @click="loadFbx(index)">
            VIEW FBX DETAIL
          </button>
        </div>
      </div>
    </li>
  </ul>
</template>

<script>
import { onMounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
import tauntFbx from "../assets/model/Taunt.fbx";
import sneakerFbx from "../assets/model/SNEAKER.FBX";
import standingFbx from "../assets/model/standing.fbx";
import doughnutFbx from "../assets/model/DoughNut_FBX.fbx";
import { modelPack } from "../assets/model/modelPack.js";
import router from "@/router";

export default {
  setup() {
    const state = {
      items: [
        { id: "defaultCanvas0", name: "taunt", model: tauntFbx },
        { id: "defaultCanvas1", name: "sneaker", model: sneakerFbx },
        {
          id: "defaultCanvas2",
          name: "standing",
          model: standingFbx,
        },
        { id: "defaultCanvas3", name: "dughnut", model: doughnutFbx },
      ],
    };

    onMounted(() => {
      state.items.forEach((canvas, index) => {
        initThreeJs(canvas.id, canvas.model, index);
      });
    });

    // init threejs canvas function
    const initThreeJs = (canvasContainer, modelName, buttonId) => {
      const scene = new THREE.Scene();
      scene.background = new THREE.Color("#eee");
      const canvas = document.getElementById(canvasContainer);
      const camera = new THREE.PerspectiveCamera(
        75,
        canvas.clientWidth / canvas.clientHeight,
        0.1,
        1000
      );
      camera.position.set(25, 25, 50);

      const renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true,
      });
      renderer.setSize(canvas.clientWidth, canvas.clientHeight);

      // add Light
      {
        var light = new THREE.HemisphereLight(0xffffff, 0x080820, 1);
        light.position.set(100, 100, 100);
        scene.add(light);
      }
      {
        const color = 0xffffff;
        const intensity = 0.6;
        const light = new THREE.PointLight(color, intensity);
        light.castShadow = true;

        light.position.set(40, 120, 40);

        light.shadow.mapSize.width = 2048;
        light.shadow.mapSize.height = 2048;
        light.shadow.radius = 5;

        const sphereSize = 10;
        const pointLightHelper = new THREE.PointLightHelper(light, sphereSize);
        scene.add(pointLightHelper);
        scene.add(light);
      }

      // add OrbitControls
      const controls = new OrbitControls(camera, renderer.domElement);
      controls.enableDamping = true;
      controls.enablePan = false;

      // add fbx model
      let fbx;
      const fbxLoader = new FBXLoader();
      fbxLoader.load(
        modelName,
        (object) => {
          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              // child.receiveShadow = true;
            }
          });

          let scaleNum = 0.3;
          object.scale.set(scaleNum, scaleNum, scaleNum);
          object.position.y = -30;
          fbx = object;
          scene.add(fbx);
        },
        (error) => {
          console.log(error);
        }
      );

      // Animation loop
      const animate = () => {
        camera.aspect = canvas.clientWidth / canvas.clientHeight;
        camera.updateProjectionMatrix();
        controls.update();
        renderer.render(scene, camera);
        requestAnimationFrame(animate);
      };

      // mouseover event
      canvas.addEventListener("mouseover", () => {
        controls.autoRotate = true;
      });
      //button click toggle wireframe
      let wireframeToggle = false;
      const button = document.getElementById(buttonId);
      button.addEventListener("click", () => {
        console.log(buttonId);

        wireframeToggle = !wireframeToggle;
        fbx.traverse((child) => {
          if (child.isMesh) {
            child.material.wireframe = wireframeToggle;
          }
        });
      });

      // resize event
      window.addEventListener("resize", () => {
        const width = 1920;
        const height = 937;
        const widthPercent = width / window.innerWidth;
        const heightPercent = height / window.innerHeight;
        canvas.style.width = canvas.width / widthPercent + "px";
        canvas.style.height = canvas.height / heightPercent + "px";
      });
      // mouseout event
      canvas.addEventListener("mouseout", () => {
        controls.autoRotate = false;
      });
      animate();
      modelPack();
    };

    const loadFbx = (no) => {
      router.push({ name: "fbx", params: { no: no } });
    };

    return {
      state,
      loadFbx,
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
  text-transform: uppercase;
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
.btnToggle {
  position: absolute;
  margin: 1rem;
}
</style>
