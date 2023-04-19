<template>
  <title>detail</title>
  <div ref="container"></div>
</template>
<script>
import { ref, onMounted, onUnmounted } from "vue";
import * as THREE from "three";
// import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default {
  setup() {
    const container = ref(null);
    let WIDTH = window.innerWidth;
    let HEIGHT = window.innerHeight;

    let scene, camera, renderer;
    // let controls;

    const init = () => {
      scene = new THREE.Scene();
      scene.background = new THREE.Color("#eee");
      camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);
      camera.position.z = 5;

      renderer = new THREE.WebGLRenderer({ antialias: true });
      renderer.setSize(WIDTH, HEIGHT);
      renderer.shadowMap.enabled = true;

      container.value.appendChild(renderer.domElement);

      // controls = new OrbitControls(camera, renderer.domElement);

      const axes = new THREE.AxesHelper(150);
      scene.add(axes);

      // Create cube
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      const planeGeometry = new THREE.PlaneGeometry(100, 100, 10, 10);
      const planeMaterial = new THREE.MeshLambertMaterial({
        color: 0xeeeeee,
      });
      const mesh = new THREE.Mesh(planeGeometry, planeMaterial);
      mesh.position.set(0, -2, 0);
      mesh.receiveShadow = true;
      scene.add(mesh);

      var hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x080820, 1);
      hemisphereLight.position.set(100, 100, 100);
      scene.add(hemisphereLight);

      const pointLightColor = 0xffffff;
      const intensity = 0.6;
      const pointLight = new THREE.PointLight(pointLightColor, intensity);
      pointLight.castShadow = true;

      pointLight.position.set(40, 120, 40);

      pointLight.shadow.mapSize.width = 2048;
      pointLight.shadow.mapSize.height = 2048;
      pointLight.shadow.radius = 5;

      const sphereSize = 10;
      const pointLightHelper = new THREE.PointLightHelper(
        pointLight,
        sphereSize
      );
      scene.add(pointLightHelper);
      scene.add(pointLight);

      const near = 100;
      const far = 300;
      const fogColor = "#eeeeee";
      scene.fog = new THREE.Fog(fogColor, near, far);

      window.addEventListener("resize", stageResize);
    };
    const animate = () => {
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };

    const stageResize = () => {
      WIDTH = window.innerWidth;
      HEIGHT = window.innerHeight;
      console.log(WIDTH, HEIGHT);
      renderer.setSize(WIDTH, HEIGHT);
      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix();
    };

    onMounted(() => {
      init();
      animate();
    });

    onUnmounted(() => {
      // window.removeEventListener("resize", stageResize);
    });

    return { container };
  },
};
</script>

<style scoped>
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style>
