import { Clock, PerspectiveCamera, Renderer, Scene, WebGLRenderer } from "three"
import { BaseView } from "./BaseView";

export class BaseView3D extends BaseView {

	scene: Scene;
	camera: PerspectiveCamera;
	renderer: WebGLRenderer;

	constructor(model: any, renderer: WebGLRenderer) {
		super(model)
		this.scene = new Scene();
		this.camera = new PerspectiveCamera(75, window.innerWidth / window.innerHeight,0.1, 1000);
		this.camera.position.z = 5;
		this.renderer = renderer;
	}

	//@ts-ignore
	update(clock: Clock): void {}

	onWindowResize() {
		this.camera.aspect = window.innerWidth / window.innerHeight;
		this.camera.updateProjectionMatrix();
		this.renderer.setSize(window.innerWidth, window.innerHeight);
	}

	onMouseMove() {}
}