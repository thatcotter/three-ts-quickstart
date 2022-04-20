import { BufferGeometry, Clock, Material, Mesh, MeshBasicMaterial, ShaderMaterial, SphereGeometry, WebGLRenderer } from "three";
import { BaseView } from "./BaseView";

import vertShader from '../../resources/shaders/shader.vert?raw'
import fragShader from '../../resources/shaders/shader.frag?raw'


export class ViewThree extends BaseView {

	blob: Mesh;
	blobGeo: BufferGeometry;
	blobMat: ShaderMaterial;

	constructor(model: any, renderer: WebGLRenderer) {
		super(model, renderer)

		this.blobGeo = new SphereGeometry(2, 60, 60);
		// this.blobMat = new MeshBasicMaterial({color: 0xa323b5});
		this.blobMat = new ShaderMaterial({
			uniforms: {
				u_time: {value: 0}
			},
			vertexShader: vertShader,
			fragmentShader: fragShader
		})

		this.blob = new Mesh(this.blobGeo, this.blobMat);

		this.scene.add(this.blob);
	}

	update(clock: Clock): void {
		const time = clock.getElapsedTime()
		this.blobMat.uniforms.u_time.value = time;
	}
}