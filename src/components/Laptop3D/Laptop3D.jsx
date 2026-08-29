import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

export default function Laptop3D({ projectImage, scrollProgress = 0, activeArrowKey = null }) {
  const containerRef = useRef(null);
  const lidGroupRef = useRef(null);
  const laptopGroupRef = useRef(null);
  const screenMaterialRef = useRef(null);
  const leftKeyMeshRef = useRef(null);
  const rightKeyMeshRef = useRef(null);
  const arrowKeyNormalMatRef = useRef(null);
  const arrowKeyActiveMatRef = useRef(null);
  
  const mouseRef = useRef({ x: 0, y: 0, targetX: 0, targetY: 0 });
  const scrollProgressRef = useRef(scrollProgress);
  const activeArrowKeyRef = useRef(activeArrowKey);

  // Keep refs synced with props
  useEffect(() => {
    scrollProgressRef.current = scrollProgress;
  }, [scrollProgress]);

  useEffect(() => {
    activeArrowKeyRef.current = activeArrowKey;
  }, [activeArrowKey]);

  // Texture Cache
  const textureCacheRef = useRef({});

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // --- SCENE SETUP ---
    const scene = new THREE.Scene();
    const width = container.clientWidth || 600;
    const height = container.clientHeight || 450;

    const camera = new THREE.PerspectiveCamera(38, width / height, 0.1, 100);
    camera.position.set(0, 1.2, 5.5);
    camera.lookAt(0, 0, 0);

    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    renderer.setSize(width, height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.1;

    container.innerHTML = '';
    container.appendChild(renderer.domElement);

    // --- LIGHTING ---
    const ambientLight = new THREE.AmbientLight(0xffffff, 1.2);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(0xffffff, 2.5);
    keyLight.position.set(5, 8, 5);
    keyLight.castShadow = true;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0x22d3ee, 1.0);
    fillLight.position.set(-5, 3, 2);
    scene.add(fillLight);

    const rimLight = new THREE.DirectionalLight(0xa855f7, 1.5);
    rimLight.position.set(0, 5, -5);
    scene.add(rimLight);

    // --- MATERIALS ---
    const aluminumMaterial = new THREE.MeshStandardMaterial({
      color: 0x16161c,
      metalness: 0.85,
      roughness: 0.2,
      envMapIntensity: 1.0,
    });

    const baseBottomMaterial = new THREE.MeshStandardMaterial({
      color: 0x0f0f13,
      metalness: 0.9,
      roughness: 0.3,
    });

    const bezelMaterial = new THREE.MeshStandardMaterial({
      color: 0x08080a,
      metalness: 0.5,
      roughness: 0.5,
    });

    const keyboardTrayMaterial = new THREE.MeshStandardMaterial({
      color: 0x0d0d10,
      metalness: 0.3,
      roughness: 0.8,
    });

    const keyCapMaterial = new THREE.MeshStandardMaterial({
      color: 0x181820,
      metalness: 0.2,
      roughness: 0.6,
    });

    const trackpadMaterial = new THREE.MeshStandardMaterial({
      color: 0x1a1a22,
      metalness: 0.5,
      roughness: 0.4,
    });

    const arrowKeyNormalMat = new THREE.MeshStandardMaterial({
      color: 0x22d3ee,
      emissive: 0x0e7490,
      emissiveIntensity: 0.4,
      roughness: 0.3,
    });

    const arrowKeyActiveMat = new THREE.MeshStandardMaterial({
      color: 0x00ffff,
      emissive: 0x22d3ee,
      emissiveIntensity: 2.0,
      roughness: 0.1,
    });

    arrowKeyNormalMatRef.current = arrowKeyNormalMat;
    arrowKeyActiveMatRef.current = arrowKeyActiveMat;

    // --- LAPTOP 3D ROOT GROUP ---
    const laptopGroup = new THREE.Group();
    laptopGroup.position.set(0, -0.3, 0);
    laptopGroup.rotation.set(0.28, -0.22, 0);
    scene.add(laptopGroup);
    laptopGroupRef.current = laptopGroup;

    // --- LAPTOP BASE ---
    const baseGroup = new THREE.Group();
    laptopGroup.add(baseGroup);

    const baseGeo = new THREE.BoxGeometry(4.4, 0.12, 2.9);
    const baseMesh = new THREE.Mesh(baseGeo, aluminumMaterial);
    baseMesh.position.set(0, -0.06, 0);
    baseMesh.castShadow = true;
    baseMesh.receiveShadow = true;
    baseGroup.add(baseMesh);

    const baseBottomGeo = new THREE.BoxGeometry(4.38, 0.04, 2.88);
    const baseBottomMesh = new THREE.Mesh(baseBottomGeo, baseBottomMaterial);
    baseBottomMesh.position.set(0, -0.13, 0);
    baseGroup.add(baseBottomMesh);

    const notchGeo = new THREE.BoxGeometry(0.6, 0.04, 0.08);
    const notchMesh = new THREE.Mesh(notchGeo, baseBottomMaterial);
    notchMesh.position.set(0, -0.04, 1.44);
    baseGroup.add(notchMesh);

    const trackpadGeo = new THREE.BoxGeometry(1.5, 0.005, 1.0);
    const trackpadMesh = new THREE.Mesh(trackpadGeo, trackpadMaterial);
    trackpadMesh.position.set(0, 0.003, 0.75);
    baseGroup.add(trackpadMesh);

    const kbDeckGeo = new THREE.BoxGeometry(3.8, 0.008, 1.4);
    const kbDeckMesh = new THREE.Mesh(kbDeckGeo, keyboardTrayMaterial);
    kbDeckMesh.position.set(0, 0.003, -0.5);
    baseGroup.add(kbDeckMesh);

    const keyRows = 5;
    const keysPerRow = 14;
    const keyWidth = 0.24;
    const keyDepth = 0.22;
    const gapX = 0.03;
    const gapZ = 0.03;
    const startX = -((keysPerRow * (keyWidth + gapX)) / 2) + keyWidth / 2;
    const startZ = -1.1;

    for (let r = 0; r < keyRows; r++) {
      for (let c = 0; c < keysPerRow; c++) {
        if (r === keyRows - 1 && c >= keysPerRow - 2) continue;

        const kGeo = new THREE.BoxGeometry(keyWidth, 0.02, keyDepth);
        const kMesh = new THREE.Mesh(kGeo, keyCapMaterial);
        kMesh.position.set(startX + c * (keyWidth + gapX), 0.015, startZ + r * (keyDepth + gapZ));
        baseGroup.add(kMesh);
      }
    }

    const arrowKeyGeo = new THREE.BoxGeometry(0.24, 0.03, 0.22);

    const leftKeyMesh = new THREE.Mesh(arrowKeyGeo, arrowKeyNormalMat);
    leftKeyMesh.position.set(startX + (keysPerRow - 2) * (keyWidth + gapX), 0.02, startZ + (keyRows - 1) * (keyDepth + gapZ));
    baseGroup.add(leftKeyMesh);
    leftKeyMeshRef.current = leftKeyMesh;

    const rightKeyMesh = new THREE.Mesh(arrowKeyGeo, arrowKeyNormalMat);
    rightKeyMesh.position.set(startX + (keysPerRow - 1) * (keyWidth + gapX), 0.02, startZ + (keyRows - 1) * (keyDepth + gapZ));
    baseGroup.add(rightKeyMesh);
    rightKeyMeshRef.current = rightKeyMesh;

    // --- LAPTOP LID / SCREEN ---
    const lidGroup = new THREE.Group();
    lidGroup.position.set(0, 0.02, -1.42);
    laptopGroup.add(lidGroup);
    lidGroupRef.current = lidGroup;

    const lidShellGeo = new THREE.BoxGeometry(4.4, 2.8, 0.08);
    lidShellGeo.translate(0, 1.4, -0.04);
    const lidShellMesh = new THREE.Mesh(lidShellGeo, aluminumMaterial);
    lidShellMesh.castShadow = true;
    lidGroup.add(lidShellMesh);

    const bezelGeo = new THREE.PlaneGeometry(4.3, 2.7);
    bezelGeo.translate(0, 1.4, 0.001);
    const bezelMesh = new THREE.Mesh(bezelGeo, bezelMaterial);
    lidGroup.add(bezelMesh);

    const webcamGeo = new THREE.CircleGeometry(0.02, 16);
    webcamGeo.translate(0, 2.71, 0.003);
    const webcamMat = new THREE.MeshBasicMaterial({ color: 0x22222a });
    const webcamMesh = new THREE.Mesh(webcamGeo, webcamMat);
    lidGroup.add(webcamMesh);

    const screenGeo = new THREE.PlaneGeometry(4.15, 2.55);
    screenGeo.translate(0, 1.38, 0.004);

    const textureLoader = new THREE.TextureLoader();
    const defaultTexture = textureLoader.load(projectImage);
    defaultTexture.colorSpace = THREE.SRGBColorSpace;

    const screenMaterial = new THREE.MeshBasicMaterial({
      map: defaultTexture,
      side: THREE.FrontSide,
    });
    screenMaterialRef.current = screenMaterial;

    const screenMesh = new THREE.Mesh(screenGeo, screenMaterial);
    lidGroup.add(screenMesh);

    // Initial Lid Angle (Start at closed 1.25 rad)
    lidGroup.rotation.x = 1.25;

    // --- CONTACT SHADOW PLANE ---
    const shadowGeo = new THREE.PlaneGeometry(7, 5);
    const shadowCanvas = document.createElement('canvas');
    shadowCanvas.width = 128;
    shadowCanvas.height = 128;
    const ctx = shadowCanvas.getContext('2d');
    const grad = ctx.createRadialGradient(64, 64, 10, 64, 64, 60);
    grad.addColorStop(0, 'rgba(0,0,0,0.75)');
    grad.addColorStop(1, 'rgba(0,0,0,0)');
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, 128, 128);

    const shadowTex = new THREE.CanvasTexture(shadowCanvas);
    const shadowMat = new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, opacity: 0.85 });
    const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
    shadowMesh.rotation.x = -Math.PI / 2;
    shadowMesh.position.set(0, -0.22, 0);
    scene.add(shadowMesh);

    // --- MOUSE MOVEMENT LISTENER FOR 3D CURSOR HOVER TILT ---
    const handleMouseMove = (e) => {
      const rect = container.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      mouseRef.current.targetX = (e.clientX - centerX) / (rect.width / 2);
      mouseRef.current.targetY = (e.clientY - centerY) / (rect.height / 2);
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });

    const handleResize = () => {
      if (!container) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener('resize', handleResize);

    // --- ANIMATION RENDER LOOP ---
    let animationFrameId;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      // Smooth mouse lerp
      mouseRef.current.x += (mouseRef.current.targetX - mouseRef.current.x) * 0.08;
      mouseRef.current.y += (mouseRef.current.targetY - mouseRef.current.y) * 0.08;

      // 3D Mouse Hover Tilt
      if (laptopGroupRef.current) {
        const targetRx = 0.28 - mouseRef.current.y * 0.25;
        const targetRy = -0.22 + mouseRef.current.x * 0.18;
        laptopGroupRef.current.rotation.x += (targetRx - laptopGroupRef.current.rotation.x) * 0.08;
        laptopGroupRef.current.rotation.y += (targetRy - laptopGroupRef.current.rotation.y) * 0.08;
      }

      // Smooth Lid Opening Physics based on scrollProgressRef.current
      if (lidGroupRef.current) {
        const currentProgress = scrollProgressRef.current;
        // From 1.25 rad (closed) -> -0.1 rad (fully open facing user)
        const targetLidAngle = Math.max(-0.1, 1.25 - currentProgress * 1.35);
        lidGroupRef.current.rotation.x += (targetLidAngle - lidGroupRef.current.rotation.x) * 0.1;
      }

      // Arrow Key Glow Feedback
      if (leftKeyMeshRef.current && rightKeyMeshRef.current) {
        const activeKey = activeArrowKeyRef.current;
        leftKeyMeshRef.current.material = activeKey === 'left' ? arrowKeyActiveMatRef.current : arrowKeyNormalMatRef.current;
        rightKeyMeshRef.current.material = activeKey === 'right' ? arrowKeyActiveMatRef.current : arrowKeyNormalMatRef.current;
      }

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  // Update Texture when projectImage changes
  useEffect(() => {
    if (!projectImage || !screenMaterialRef.current) return;

    if (textureCacheRef.current[projectImage]) {
      screenMaterialRef.current.map = textureCacheRef.current[projectImage];
      screenMaterialRef.current.needsUpdate = true;
    } else {
      const loader = new THREE.TextureLoader();
      loader.load(projectImage, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        textureCacheRef.current[projectImage] = tex;
        if (screenMaterialRef.current) {
          screenMaterialRef.current.map = tex;
          screenMaterialRef.current.needsUpdate = true;
        }
      });
    }
  }, [projectImage]);

  return (
    <div 
      ref={containerRef} 
      className="w-full h-[320px] sm:h-[480px] md:h-[540px] lg:h-[580px] relative flex items-center justify-center cursor-grab active:cursor-grabbing"
    />
  );
}
