<template>
  <title>fbx loader</title>
  <div>
    <p>{{ no }}</p>
  </div>
  <div ref="containerTest"></div>
</template>

<script>
import { ref, onMounted } from "vue";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { FBXLoader } from "three/examples/jsm/loaders/FBXLoader";
// import carFbx from "../assets/model/car.fbx";
// import { tauntFbx } from "../assets/model/modelPack.js";

export default {
  props: ["no"],
  setup(props) {
    console.log(props.no);
    const containerTest = ref(null);
    let WIDTH = window.innerWidth;
    let HEIGHT = window.innerHeight;

    let scene, camera, renderer;
    let controls;

    let mixers = [];
    let action;

    const importFbx = async () => {
      let fbx;
      if (props.no === "1") {
        const { tauntFbx } = await import("../assets/model/modelPack.js");
        fbx = tauntFbx;
      } else if (props.no === "2") {
        const { standingFbx } = await import("../assets/model/modelPack.js");
        fbx = standingFbx;
      }
      // const { tauntFbx } = await import("../assets/model/modelPack.js");
      // let fbx = tauntFbx;
      return fbx;
    };

    const init = async () => {
      // const { tauntFbx } = await import("../assets/model/modelPack.js");
      // const fbx = tauntFbx;

      const fbx = await importFbx();
      scene = new THREE.Scene();
      scene.background = new THREE.Color("#eee"); //배경 컬러
      camera = new THREE.PerspectiveCamera(70, WIDTH / HEIGHT, 0.1, 2000);
      camera.position.set(50, 50, 100);
      // camera.lookAt(0, 0, 0);

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(WIDTH, HEIGHT);
      renderer.shadowMap.enabled = true;

      containerTest.value.appendChild(renderer.domElement);

      //카메라 컨트롤
      controls = new OrbitControls(camera, renderer.domElement);
      // controls.autoRotate = true;

      const axes = new THREE.AxesHelper(150);
      scene.add(axes);

      // const gridHelper = new THREE.GridHelper(240, 20);
      // scene.add(gridHelper);

      //바닥
      const geometry = new THREE.CylinderGeometry(400, 400, 5, 100);
      const material = new THREE.MeshPhongMaterial({
        color: 0xeeeeee,
      });
      const mesh = new THREE.Mesh(geometry, material);
      mesh.position.set(0, -2, 0);
      mesh.receiveShadow = true;
      scene.add(mesh);

      // const boxGeometry = new THREE.BoxGeometry();
      // const boxMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      // const cube = new THREE.Mesh(boxGeometry, boxMaterial);
      // cube.position.set(0, 10, 0);
      // scene.add(cube);

      {
        //조명 넣기
        var light = new THREE.HemisphereLight(0xffffff, 0x080820, 1);
        light.position.set(100, 100, 100);
        scene.add(light);
      }
      {
        //조명
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

      {
        //안개
        const near = 100;
        const far = 300;
        const color = "#eeeeee";
        scene.fog = new THREE.Fog(color, near, far);
      }
      // const fbxpath = require("../assets/model/car.fbx");
      const fbxLoader = new FBXLoader();

      fbxLoader.load(
        // carFbx,
        fbx,
        (object) => {
          console.log(object);

          object.traverse(function (child) {
            if (child.isMesh) {
              child.castShadow = true;
              // child.receiveShadow = true;
            }
          });

          //애니메이션
          object.mixer = new THREE.AnimationMixer(object);
          // console.log(object.mixer);

          mixers.push(object.mixer);
          // console.log(mixers.length);
          if (mixers.length > 0) {
            action = object.mixer.clipAction(object.animations[0]);
          }

          object.scale.set(0.3, 0.3, 0.3);
          object.position.y = 0;
          // object.position.x = -25;
          // object.position.z = 55;
          scene.add(object);
        },
        (xhr) => {
          console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
        },
        (error) => {
          console.log(error);
        }
      );

      animate();
      document.addEventListener("keydown", onDocumentKeyDown);
    };

    let keyCode = 0;
    const onDocumentKeyDown = (event) => {
      keyCode = event.key || event.keyCode;
      //console.log(event.key, event.keyCode);

      if (keyCode == "Control" || keyCode == 17) {
        action.play();
        // action.setLoop(0, 1);
      } else {
        action.stop();
      }
    };

    const clock = new THREE.Clock();
    const animate = () => {
      const delta = clock.getDelta();

      for (let i = 0; i < mixers.length; i++) {
        mixers[i].update(delta);
      }
      controls.update();
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    onMounted(() => {
      init();
    });
    return { containerTest };
  },
};
</script>

<style scoped>
/* body {
  margin: 0;
  padding: 0;
  overflow: hidden;
} */
</style>
