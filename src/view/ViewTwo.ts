import { AmbientLight, Clock, Mesh, MeshPhongMaterial, PointLight, SphereGeometry, WebGLRenderer } from "three";
import { BaseView } from "./BaseView";

export class ViewTwo extends BaseView {

	sphere: Mesh;
	lightPoint: PointLight;
	lightAmbient: AmbientLight;

	constructor(model: any, renderer: WebGLRenderer) {
		super(model, renderer)

		const sphereGeometry = new SphereGeometry();
		const sphereMaterial = new MeshPhongMaterial({color: 0x32cd43})
		this.sphere = new Mesh(sphereGeometry, sphereMaterial)

		this.scene.add(this.sphere)

		this.lightPoint = new PointLight(0xcccccc);
		this.lightPoint.intensity = 0.66;
		this.lightPoint.position.set(-5, 3, 4);

		const mapSize = 1024; // Default 512
		const cameraNear = 0.5; // Default 0.5
		const cameraFar = 500; // Default 500
		this.lightPoint.shadow.mapSize.width = mapSize;
		this.lightPoint.shadow.mapSize.height = mapSize;
		this.lightPoint.shadow.camera.near = cameraNear;
		this.lightPoint.shadow.camera.far = cameraFar;

		this.scene.add(this.lightPoint);

		this.lightAmbient = new AmbientLight(0xffffff);
		this.lightAmbient.intensity = 0.2;

		this.scene.add(this.lightAmbient);
	}

	//@ts-ignore
	update(clock: Clock): void {
		
	}
}