import * as THREE from "three";
import { GridHelper, PerspectiveCamera, Scene, WebGLRenderer } from "three";
import Light from "./light/Light";
import Sea from "./mesh/Sea";

import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import Stats from "three/examples/jsm/libs/stats.module";
import Sky from "./mesh/Sky";
import Airplane from "./mesh/Airplane";
import { normalize } from "./uti";

class App {
  constructor() {
    // * Base
    this.createScene();
    this.createCamera();
    this.createRenderer();
    this.appendToContainer();

    // * Objects
    this.createLight();
    this.createSea();
    this.createSky();
    this.createAirplane();

    // * Helpers
    this.orbitControls = null;
    // this.createOrbitControls();
    this.createStats();
    this.createHelper();

    // * Other
    this.addObjectsToScene();
    this.setupListeners();

    this.tick = this.tick.bind(this);
    this.tick();
  }

  airplane!: Airplane;
  camera!: PerspectiveCamera;
  helper!: GridHelper;
  light!: Light;
  mousePosition!: { x: number; y: number };
  orbitControls: OrbitControls | null;
  renderer!: WebGLRenderer;
  sea!: Sea;
  scene!: Scene;
  sky!: Sky;
  stats!: Stats;

  addObjectsToScene(): void {
    this.scene.add(this.light.hemisphereLight);
    this.scene.add(this.light.shadowLight);
    this.scene.add(this.sea.mesh);
    this.scene.add(this.sky.mesh);
    this.scene.add(this.airplane.mesh);

    this.scene.add(this.helper);
  }

  appendToContainer(): void {
    const container = document.getElementById("world");
    container?.appendChild(this.renderer.domElement);
  }

  createAirplane(): void {
    this.airplane = new Airplane();
    this.airplane.mesh.scale.set(0.25, 0.25, 0.25);
    this.airplane.mesh.position.y = 100;
  }

  createCamera(): void {
    const height = window.innerHeight;
    const width = window.innerWidth;
    const aspectRatio = width / height;
    const fieldOfView = 60;
    const nearPlane = 1;
    const farPlane = 10000;
    this.camera = new THREE.PerspectiveCamera(
      fieldOfView,
      aspectRatio,
      nearPlane,
      farPlane
    );
    this.camera.position.set(0, 100, 200);
  }

  createSky(): void {
    this.sky = new Sky();
  }

  createHelper(): void {
    this.helper = new THREE.GridHelper(2000, 100);
    this.helper.position.y = -199;
  }

  createLight(): void {
    this.light = new Light();
  }

  createOrbitControls(): void {
    this.orbitControls = new OrbitControls(
      this.camera,
      this.renderer.domElement
    );
  }

  createRenderer(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    this.renderer.setSize(width, height);
    this.renderer.shadowMap.enabled = true;
  }

  createSea(): void {
    this.sea = new Sea();
  }

  createScene(): void {
    this.scene = new THREE.Scene();
    this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950);
    this.mousePosition = { x: 0, y: 0 };
  }

  createStats(): void {
    const container = document.getElementById("world");
    this.stats = Stats();
    container?.appendChild(this.stats.dom);
  }

  setupListeners(): void {
    window.addEventListener(
      "resize",
      () => {
        const height = window.innerHeight;
        const width = window.innerWidth;
        this.renderer.setSize(width, height);
        this.camera.aspect = width / height;
        this.camera.updateProjectionMatrix();
      },
      false
    );
    document.addEventListener(
      "mousemove",
      (event) => {
        const tx = -1 + (event.clientX / window.innerWidth) * 2;
        const ty = 1 - (event.clientY / window.innerHeight) * 2;
        this.mousePosition = { x: tx, y: ty };
      },
      false
    );
  }

  render(): void {
    this.renderer.render(this.scene, this.camera);
  }

  tick(): void {
    this.stats.update();

    this.render();
    this.update();

    requestAnimationFrame(this.tick);
  }

  update(): void {
    // * Update plane
    const targetX = normalize(this.mousePosition.x, -1, 1, -100, 100);
    const targetY = normalize(this.mousePosition.y, -1, 1, 25, 175);
    this.airplane.mesh.position.setY(targetY);
    this.airplane.mesh.position.setX(targetX);

    // * Update propeller
    this.airplane.propeller.rotation.x += 0.3;

    // * Update Sea
    this.sea.mesh.rotation.z += 0.005;

    // * Update Sky
    this.sky.mesh.rotation.z += 0.01;
  }
}

export default App;
