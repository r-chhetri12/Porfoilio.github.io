/* ==========================================================================
   Rudra Chhetri Portfolio - 3D Human Waving Boy Avatar (Three.js)
   Features: Realistic 3D Human Character Mesh, Continuous Hand Waving 👋, Cursor Eye Tracking
   ========================================================================== */

(function init3DHumanAvatar() {
  const container = document.getElementById('avatar-waving-canvas');
  if (!container) return;

  // 1. Scene, Camera & Renderer Setup
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(42, container.clientWidth / container.clientHeight, 0.1, 1000);
  camera.position.set(0, 0.25, 5.2);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setSize(container.clientWidth, container.clientHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  container.appendChild(renderer.domElement);

  // Main Character Root Group
  const humanGroup = new THREE.Group();
  scene.add(humanGroup);

  // 2. Realistic Human Materials
  const skinMat = new THREE.MeshPhongMaterial({ color: 0xf5cda7, shininess: 20, flatShading: false });
  const hairMat = new THREE.MeshPhongMaterial({ color: 0x1c1917, shininess: 35 });
  const shirtMat = new THREE.MeshPhongMaterial({ color: 0x3b82f6, shininess: 25 }); // Electric Blue Polo/Shirt
  const collarMat = new THREE.MeshPhongMaterial({ color: 0x1e293b, shininess: 20 });
  const eyeWhiteMat = new THREE.MeshBasicMaterial({ color: 0xffffff });
  const irisMat = new THREE.MeshBasicMaterial({ color: 0x1d4ed8 }); // Blue eyes
  const pupilMat = new THREE.MeshBasicMaterial({ color: 0x0f172a });
  const lipMat = new THREE.MeshBasicMaterial({ color: 0xe11d48 });

  // 3. Human Head & Face Group
  const headGroup = new THREE.Group();
  headGroup.position.set(0, 0.65, 0);
  humanGroup.add(headGroup);

  // Human Head Base
  const headGeo = new THREE.SphereGeometry(0.68, 32, 32);
  headGeo.scale(1, 1.15, 0.95);
  const headMesh = new THREE.Mesh(headGeo, skinMat);
  headGroup.add(headMesh);

  // Human Nose
  const noseGeo = new THREE.ConeGeometry(0.08, 0.22, 16);
  const noseMesh = new THREE.Mesh(noseGeo, skinMat);
  noseMesh.position.set(0, -0.05, 0.65);
  noseMesh.rotation.x = 0.1;
  headGroup.add(noseMesh);

  // Human Hair Style
  const hairGroup = new THREE.Group();
  const hairTopGeo = new THREE.SphereGeometry(0.72, 32, 16, 0, Math.PI * 2, 0, Math.PI * 0.52);
  const hairTopMesh = new THREE.Mesh(hairTopGeo, hairMat);
  hairTopMesh.position.set(0, 0.08, -0.02);
  hairGroup.add(hairTopMesh);

  // Front Hair Fringe / Tuft
  const fringeGeo = new THREE.SphereGeometry(0.28, 16, 16);
  fringeGeo.scale(1.4, 0.6, 0.8);
  const fringeMesh = new THREE.Mesh(fringeGeo, hairMat);
  fringeMesh.position.set(0, 0.62, 0.35);
  fringeMesh.rotation.x = 0.3;
  hairGroup.add(fringeMesh);

  headGroup.add(hairGroup);

  // Human Eyes (Left & Right)
  const createHumanEye = (x) => {
    const eyeContainer = new THREE.Group();
    eyeContainer.position.set(x, 0.08, 0.58);

    const sclera = new THREE.Mesh(new THREE.SphereGeometry(0.09, 16, 16), eyeWhiteMat);
    eyeContainer.add(sclera);

    const iris = new THREE.Mesh(new THREE.SphereGeometry(0.055, 16, 16), irisMat);
    iris.position.z = 0.045;
    eyeContainer.add(iris);

    const pupil = new THREE.Mesh(new THREE.SphereGeometry(0.03, 16, 16), pupilMat);
    pupil.position.z = 0.065;
    eyeContainer.add(pupil);

    return eyeContainer;
  };

  const leftEye = createHumanEye(-0.22);
  const rightEye = createHumanEye(0.22);
  headGroup.add(leftEye);
  headGroup.add(rightEye);

  // Eyebrows
  const eyebrowGeo = new THREE.BoxGeometry(0.18, 0.03, 0.04);
  const leftBrow = new THREE.Mesh(eyebrowGeo, hairMat);
  leftBrow.position.set(-0.22, 0.22, 0.62);
  leftBrow.rotation.z = -0.08;
  headGroup.add(leftBrow);

  const rightBrow = new THREE.Mesh(eyebrowGeo, hairMat);
  rightBrow.position.set(0.22, 0.22, 0.62);
  rightBrow.rotation.z = 0.08;
  headGroup.add(rightBrow);

  // Friendly Smile Curve
  const smileGeo = new THREE.TorusGeometry(0.15, 0.025, 16, 32, Math.PI * 0.85);
  const smileMesh = new THREE.Mesh(smileGeo, lipMat);
  smileMesh.position.set(0, -0.25, 0.62);
  smileMesh.rotation.x = Math.PI;
  headGroup.add(smileMesh);

  // 4. Human Body & Torso
  const neckGeo = new THREE.CylinderGeometry(0.22, 0.25, 0.3, 16);
  const neckMesh = new THREE.Mesh(neckGeo, skinMat);
  neckMesh.position.set(0, 0.12, 0);
  humanGroup.add(neckMesh);

  const torsoGeo = new THREE.CylinderGeometry(0.55, 0.72, 1.35, 32);
  const torsoMesh = new THREE.Mesh(torsoGeo, shirtMat);
  torsoMesh.position.set(0, -0.68, 0);
  humanGroup.add(torsoMesh);

  // Shirt Collar
  const collarGeo = new THREE.TorusGeometry(0.42, 0.06, 16, 32);
  const collarMesh = new THREE.Mesh(collarGeo, collarMat);
  collarMesh.position.set(0, -0.05, 0);
  collarMesh.rotation.x = Math.PI / 2.2;
  humanGroup.add(collarMesh);

  // 5. Left Arm (Rests naturally at side)
  const leftArmGeo = new THREE.CylinderGeometry(0.14, 0.11, 0.9, 16);
  const leftArmMesh = new THREE.Mesh(leftArmGeo, shirtMat);
  leftArmMesh.position.set(-0.8, -0.6, 0);
  leftArmMesh.rotation.z = 0.25;
  humanGroup.add(leftArmMesh);

  const leftHandGeo = new THREE.SphereGeometry(0.13, 16, 16);
  const leftHandMesh = new THREE.Mesh(leftHandGeo, skinMat);
  leftHandMesh.position.set(-0.95, -1.05, 0);
  humanGroup.add(leftHandMesh);

  // 6. Right Arm (Human Hand Waving 👋)
  const rightShoulder = new THREE.Group();
  rightShoulder.position.set(0.72, -0.15, 0);
  humanGroup.add(rightShoulder);

  const upperArmGeo = new THREE.CylinderGeometry(0.14, 0.12, 0.75, 16);
  const upperArmMesh = new THREE.Mesh(upperArmGeo, shirtMat);
  upperArmMesh.position.set(0.25, 0.28, 0);
  upperArmMesh.rotation.z = -1.25; // Raised shoulder
  rightShoulder.add(upperArmMesh);

  // Forearm & Hand Group
  const forearmGroup = new THREE.Group();
  forearmGroup.position.set(0.5, 0.55, 0);
  rightShoulder.add(forearmGroup);

  const forearmGeo = new THREE.CylinderGeometry(0.12, 0.1, 0.6, 16);
  const forearmMesh = new THREE.Mesh(forearmGeo, shirtMat);
  forearmMesh.position.set(0, 0.25, 0);
  forearmGroup.add(forearmMesh);

  // Human Waving Palm & Fingers
  const palmGeo = new THREE.BoxGeometry(0.24, 0.28, 0.08);
  const palmMesh = new THREE.Mesh(palmGeo, skinMat);
  palmMesh.position.set(0, 0.65, 0);
  forearmGroup.add(palmMesh);

  // Fingers
  const fingerGeo = new THREE.CylinderGeometry(0.03, 0.03, 0.2, 8);
  for (let i = -0.09; i <= 0.09; i += 0.06) {
    const finger = new THREE.Mesh(fingerGeo, skinMat);
    finger.position.set(i, 0.82, 0);
    forearmGroup.add(finger);
  }

  // 7. Background Floating Ambient Light Nodes
  const lightNodesCount = 40;
  const lightGeo = new THREE.BufferGeometry();
  const lightPositions = new Float32Array(lightNodesCount * 3);
  for (let i = 0; i < lightNodesCount; i++) {
    lightPositions[i * 3] = (Math.random() - 0.5) * 7;
    lightPositions[i * 3 + 1] = (Math.random() - 0.5) * 5;
    lightPositions[i * 3 + 2] = (Math.random() - 0.5) * 3;
  }
  lightGeo.setAttribute('position', new THREE.BufferAttribute(lightPositions, 3));
  const lightMat = new THREE.PointsMaterial({ color: 0x38bdf8, size: 0.06, transparent: true, opacity: 0.6 });
  const lightSystem = new THREE.Points(lightGeo, lightMat);
  scene.add(lightSystem);

  // 8. Lighting System
  const ambientLight = new THREE.AmbientLight(0xffffff, 0.9);
  scene.add(ambientLight);

  const mainLight = new THREE.DirectionalLight(0xffffff, 1.2);
  mainLight.position.set(3, 4, 5);
  scene.add(mainLight);

  const cyanRimLight = new THREE.PointLight(0x38bdf8, 1.8, 10);
  cyanRimLight.position.set(-3, 2, 2);
  scene.add(cyanRimLight);

  // 9. Interactive Mouse Cursor Tracking
  let mouseX = 0;
  let mouseY = 0;
  window.addEventListener('mousemove', (e) => {
    const halfX = window.innerWidth / 2;
    const halfY = window.innerHeight / 2;
    mouseX = (e.clientX - halfX) * 0.0008;
    mouseY = (e.clientY - halfY) * 0.0008;
  });

  // 10. Animation Loop (Continuous Hand Waving 👋)
  let clock = new THREE.Clock();

  function animate() {
    requestAnimationFrame(animate);
    const time = clock.getElapsedTime();

    // Natural Hand Waving Oscillation
    forearmGroup.rotation.z = Math.sin(time * 5.5) * 0.38 - 0.15;
    forearmGroup.rotation.x = Math.cos(time * 2.8) * 0.12;

    // Subtle Breathing Body Oscillation
    humanGroup.position.y = Math.sin(time * 1.6) * 0.06 - 0.2;

    // Smooth Cursor Head & Eye Tracking
    headGroup.rotation.y += (mouseX - headGroup.rotation.y) * 0.1;
    headGroup.rotation.x += (mouseY - headGroup.rotation.x) * 0.1;

    lightSystem.rotation.y = time * 0.04;

    renderer.render(scene, camera);
  }

  animate();

  // Responsive Resizing
  window.addEventListener('resize', () => {
    const width = container.clientWidth;
    const height = container.clientHeight;
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
    renderer.setSize(width, height);
  });
})();
