import * as THREE from "three";
import { Mesh, Object3D } from "three";

import { colors } from "../constants";

class Airplane {
  constructor() {
    this.mesh = new THREE.Object3D();

    this.createCockpit();
    this.createEngine();
    this.createTail();
    this.createWing();
    this.createBlade();
    this.createPropeller();
  }

  blade!: Mesh;
  cockpit!: Mesh;
  engine!: Mesh;
  mesh!: Object3D;
  propeller!: Mesh;
  tail!: Mesh;
  wing!: Mesh;

  createBlade(): void {
    const geometry = new THREE.BoxGeometry(1, 100, 20, 1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
      color: colors.brownDark,
      flatShading: true,
    });
    const blade = new THREE.Mesh(geometry, material);
    blade.position.set(8, 0, 0);
    blade.castShadow = true;
    blade.receiveShadow = true;
    this.blade = blade;
  }

  createCockpit(): void {
    const geometry = new THREE.BoxGeometry(60, 50, 50, 1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
      color: colors.red,
      flatShading: true,
    });
    const cockpit = new THREE.Mesh(geometry, material);
    cockpit.castShadow = true;
    cockpit.receiveShadow = true;
    this.cockpit = cockpit;
    this.mesh.add(cockpit);
  }

  createEngine(): void {
    const geometry = new THREE.BoxGeometry(20, 50, 50, 1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
      color: colors.white,
      flatShading: true,
    });
    const engine = new THREE.Mesh(geometry, material);
    engine.position.setX(40);
    engine.castShadow = true;
    engine.receiveShadow = true;
    this.engine = engine;
    this.mesh.add(this.engine);
  }

  createPropeller(): void {
    const geometry = new THREE.BoxGeometry(20, 10, 10, 1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
      color: colors.brown,
      flatShading: true,
    });
    const propeller = new THREE.Mesh(geometry, material);
    propeller.castShadow = true;
    propeller.receiveShadow = true;
    propeller.position.set(50, 0, 0);
    this.propeller = propeller;
    this.propeller.add(this.blade);
    this.mesh.add(this.propeller);
  }

  createTail(): void {
    const geometry = new THREE.BoxGeometry(15, 20, 5, 1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
      color: colors.red,
      flatShading: true,
    });
    const tail = new THREE.Mesh(geometry, material);
    tail.position.set(-35, 24, 0);
    tail.castShadow = true;
    tail.receiveShadow = true;
    this.tail = tail;
    this.mesh.add(this.tail);
  }

  createWing(): void {
    const geometry = new THREE.BoxGeometry(40, 8, 150, 1, 1, 1);
    const material = new THREE.MeshPhongMaterial({
      color: colors.red,
      flatShading: true,
    });
    const wing = new THREE.Mesh(geometry, material);
    wing.castShadow = true;
    wing.receiveShadow = true;
    this.wing = wing;
    this.mesh.add(this.wing);
  }
}

export default Airplane;
