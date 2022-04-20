import { BoxGeometry, BufferGeometry, Clock, CylinderGeometry, Material, Mesh, MeshBasicMaterial, PlaneGeometry, ShaderMaterial, SphereGeometry, WebGLRenderer } from "three";
import { BaseView } from "./BaseView";

import vertShader from '../../resources/shaders/shader.vert?raw'
import fragShader from '../../resources/shaders/shader.frag?raw'
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";


export class ViewThree extends BaseView {

	controller: OrbitControls;

	blobSphere: Mesh;
	blobCube: Mesh;
	blobPlane: Mesh;
	blobCylinder: Mesh;
	blobGeo: BufferGeometry;
	blobMat: ShaderMaterial;

	constructor(model: any, renderer: WebGLRenderer) {
		super(model, renderer)

		this.blobGeo = new SphereGeometry(1, 60, 60);
		// this.blobMat = new MeshBasicMaterial({color: 0xa323b5});
		this.blobMat = new ShaderMaterial({
			uniforms: {
				u_time: {value: 0}
			},
			vertexShader: vertShader,
			fragmentShader: fragShader
		})

		this.blobSphere = new Mesh(this.blobGeo, this.blobMat);
		this.blobCube = new Mesh(new BoxGeometry(1,1,1, 60, 60,60), this.blobMat);
		this.blobCube.position.set(-3, 0, 0);
		this.blobPlane = new Mesh(new PlaneGeometry(1,1,60,60), this.blobMat);
		this.blobPlane.position.set(3, 0, 0);
		this.blobCylinder = new Mesh(new CylinderGeometry(1,1,1, 60, 60), this.blobMat);
		this.blobCylinder.position.set(0, 3, 0);

		this.scene.add(this.blobSphere);
		this.scene.add(this.blobCube);
		this.scene.add(this.blobPlane);
		this.scene.add(this.blobCylinder);

		this.controller = new OrbitControls(this.camera, this.renderer.domElement)
	}

	update(clock: Clock): void {
		const time = clock.getElapsedTime()
		this.blobMat.uniforms.u_time.value = time;
	}
}