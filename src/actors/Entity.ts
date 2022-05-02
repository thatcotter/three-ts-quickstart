import * as CANNON from "cannon-es";
import * as THREE from "three";

export class Entity {

	body: CANNON.Body;
	mesh: THREE.Mesh;
	geometry: THREE.BufferGeometry;
	material: THREE.Material;

	constructor(geometry: THREE.BufferGeometry, material: THREE.Material, bodyOptions: any){
		this.body = new CANNON.Body(bodyOptions);
		this.geometry = geometry;
		this.material = material;
		this.mesh = new THREE.Mesh(this.geometry, this.material);
	}

	update() {
		this.mesh.position.copy(this.body.position as IVec3)
		this.mesh.quaternion.copy(this.body.quaternion as IQuaternion)
	}
	// other methods ...
}

type IVec3 = CANNON.Vec3 & THREE.Vector3;
type IQuaternion = CANNON.Quaternion & THREE.Quaternion;