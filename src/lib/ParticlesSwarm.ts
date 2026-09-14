import * as THREE from "three";

type SwarmParams = {
  radiusOuter: number;
  radiusInner: number;
  neuroActivity: number;
  chaosFactor: number;
  pulseSpeed: number;
};

const DEFAULT_PARAMS: SwarmParams = {
  radiusOuter: 37.6,
  radiusInner: 5,
  neuroActivity: 0.38,
  chaosFactor: 0,
  pulseSpeed: 0,
};

export class ParticlesSwarm {
  count: number;
  container: HTMLElement;
  speedMult = 1;
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  mesh: THREE.InstancedMesh;
  geometry: THREE.PlaneGeometry;
  material: THREE.ShaderMaterial;
  positions: THREE.Vector3[];
  dummy = new THREE.Object3D();
  target = new THREE.Vector3();
  pColor = new THREE.Color();
  clock = new THREE.Clock();
  private animationId = 0;
  private disposed = false;
  private params: SwarmParams;

  constructor(
    container: HTMLElement,
    count = 8000,
    params: Partial<SwarmParams> = {},
  ) {
    this.count = count;
    this.container = container;
    this.params = { ...DEFAULT_PARAMS, ...params };

    const width = container.clientWidth || window.innerWidth;
    const height = container.clientHeight || window.innerHeight;

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(60, width / height, 0.1, 2000);
    this.camera.position.set(0, 0, 100);

    this.renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      premultipliedAlpha: false,
      powerPreference: "high-performance",
    });
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.setSize(width, height);
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.domElement.style.cssText =
      "position:absolute;inset:0;width:100%;height:100%;pointer-events:none;background:transparent;";
    this.container.appendChild(this.renderer.domElement);

    this.geometry = new THREE.PlaneGeometry(0.8, 0.8);
    this.material = new THREE.ShaderMaterial({
      uniforms: { uTime: { value: 0 } },
      vertexShader: `
        varying vec2 vUv;
        varying vec3 vColor;
        void main() {
          vUv = uv;
          vColor = instanceColor;
          gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        varying vec2 vUv;
        varying vec3 vColor;
        uniform float uTime;
        float rand(vec2 n) {
          return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
        }
        float noise(vec2 p) {
          vec2 ip = floor(p);
          vec2 u = fract(p);
          u = u * u * (3.0 - 2.0 * u);
          float res = mix(
            mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
            mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x),
            u.y
          );
          return res * res;
        }
        void main() {
          float dist = distance(vUv, vec2(0.5));
          float n = noise(vUv * 5.0 + uTime * 0.5);
          float alpha = (1.0 - smoothstep(0.2, 0.5, dist)) * (0.5 + 0.5 * n);
          if (alpha < 0.1) discard;
          gl_FragColor = vec4(vColor + 0.15, alpha * 0.85);
        }
      `,
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      blending: THREE.NormalBlending,
    });

    this.mesh = new THREE.InstancedMesh(this.geometry, this.material, this.count);
    this.mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    this.scene.add(this.mesh);

    this.positions = [];
    const startColor = new THREE.Color("#8A9E84");
    for (let i = 0; i < this.count; i++) {
      this.positions.push(
        new THREE.Vector3(
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
          (Math.random() - 0.5) * 100,
        ),
      );
      this.mesh.setColorAt(i, startColor);
    }

    this.animate = this.animate.bind(this);
    this.onResize = this.onResize.bind(this);
    window.addEventListener("resize", this.onResize);
    this.animate();
  }

  onResize() {
    if (this.disposed) return;
    const width = this.container.clientWidth || window.innerWidth;
    const height = this.container.clientHeight || window.innerHeight;
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }

  animate() {
    if (this.disposed) return;
    this.animationId = requestAnimationFrame(this.animate);
    const time = this.clock.getElapsedTime() * this.speedMult;

    if (this.material.uniforms?.uTime) {
      this.material.uniforms.uTime.value = time;
    }

    const {
      radiusOuter,
      radiusInner,
      neuroActivity,
      chaosFactor,
      pulseSpeed,
    } = this.params;
    const count = this.count;
    const t = time * (pulseSpeed || 0.35);

    for (let i = 0; i < count; i++) {
      const iNorm = i / count;
      const layer = iNorm < 0.5 ? 0 : 1;
      const localI = layer === 0 ? i : i - count / 2;
      const totalLocal = count / 2;

      const phi = Math.acos(1 - (2 * (localI + 0.5)) / totalLocal);
      const theta = Math.sqrt(totalLocal * Math.PI) * (localI + 0.5);

      const r = layer === 0 ? radiusOuter : radiusInner;
      let x = r * Math.sin(phi) * Math.cos(theta);
      let y = r * Math.sin(phi) * Math.sin(theta);
      let z = r * Math.cos(phi);

      const noiseX = Math.sin(t * 0.5 + phi * 3) * Math.cos(t * 0.3 + theta * 2);
      const noiseY = Math.cos(t * 0.4 + phi * 2) * Math.sin(t * 0.6 + theta * 3);
      const noiseZ = Math.sin(t * 0.7 + phi + theta);

      const moveAmt = layer === 0 ? chaosFactor * 1.5 : chaosFactor * 0.5;
      x += noiseX * moveAmt;
      y += noiseY * moveAmt;
      z += noiseZ * moveAmt;

      const pulse = Math.sin(t * 2 + i * 0.01) * 0.05 + 1;
      x *= pulse;
      y *= pulse;
      z *= pulse;

      this.target.set(x, y, z);

      // Site sage greens only
      const hFinal = 0.28 + layer * 0.04 + Math.sin(i * 0.07) * 0.02;
      const lVar = layer === 0 ? 0.52 : 0.38 + neuroActivity * 0.2;
      const sVar = layer === 0 ? 0.38 : 0.42 + neuroActivity * 0.15;

      this.pColor.setHSL(hFinal, sVar, lVar);

      this.positions[i].lerp(this.target, 0.1);
      this.dummy.position.copy(this.positions[i]);
      this.dummy.updateMatrix();
      this.mesh.setMatrixAt(i, this.dummy.matrix);
      this.mesh.setColorAt(i, this.pColor);
    }

    this.mesh.instanceMatrix.needsUpdate = true;
    if (this.mesh.instanceColor) this.mesh.instanceColor.needsUpdate = true;
    this.renderer.render(this.scene, this.camera);
  }

  dispose() {
    this.disposed = true;
    cancelAnimationFrame(this.animationId);
    window.removeEventListener("resize", this.onResize);
    this.geometry.dispose();
    this.material.dispose();
    this.scene.remove(this.mesh);
    this.mesh.dispose();
    this.renderer.dispose();
    if (this.renderer.domElement.parentElement === this.container) {
      this.container.removeChild(this.renderer.domElement);
    }
  }
}
