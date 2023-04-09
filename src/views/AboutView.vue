<template>
  <div class="about">
    <div ref="canvasContainer"></div>
  </div>
</template>

<script>
// eslint-disable-next-line
import { ref, onMounted } from 'vue';
// eslint-disable-next-line
import * as THREE from 'three';

export default {
  setup() {
    const canvasContainer = ref(null);

    onMounted(() => {
      // Three.js scene 설정
      const scene = new THREE.Scene();
      const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
      );
      camera.position.z = 5;
      const renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      canvasContainer.value.appendChild(renderer.domElement);

      // Three.js cube 생성
      const geometry = new THREE.BoxGeometry();
      const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      const cube = new THREE.Mesh(geometry, material);
      scene.add(cube);

      // Three.js 애니메이션 설정
      const animate = () => {
        requestAnimationFrame(animate);

        // cube 회전 애니메이션
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;

        renderer.render(scene, camera);
      };

      animate();
    });

    return { canvasContainer };
  },
};
</script>

<style scoped>
canvas {
  display: block;
}
</style>
