import { AmbientLight, Clock, Mesh, MeshPhongMaterial, PointLight, SphereGeometry, Vector3, WebGLRenderer } from "three";
import { lerp3D } from "../utils";
import { BaseView } from "./BaseView";
import { gsap } from "gsap";

export class ViewTwo extends BaseView {

	// sphere: Mesh;
	spheres: Array<Mesh>;
	tl: any;
	lightPoint: PointLight;
	lightAmbient: AmbientLight;

	constructor(model: any, renderer: WebGLRenderer) {
		super(model, renderer)

		this.spheres = []

		this.tl = gsap.timeline()

		const sphereGeometry = new SphereGeometry(0.5);
		const sphereMaterial = new MeshPhongMaterial({ color: 0x32cd43 });
		for (let i = 0; i < 10; i++) {
			const tempSphere = new Mesh(sphereGeometry, sphereMaterial);
			this.tl.to(tempSphere.position, 
				{ 
					x: Math.cos((i / 10) * Math.PI * 2) * 3,
				 	y: Math.sin((i / 10) * Math.PI * 2) * 3,
				 	duration: 2,
				 	ease: "bounce.out"
				}, `${i/4}`);
			this.tl.fromTo(tempSphere.scale,
				{x: 0, y: 0},
				{x: 1, y: 1, duration: 2, ease: "expo.out"}, "<")
			// tempSphere.position.x = i - 5
			this.spheres.push( tempSphere )
			this.scene.add( tempSphere )
		}

		// const sphereGeometry = new SphereGeometry(0.5);
		// const sphereMaterial = new MeshPhongMaterial({color: 0x32cd43})
		// this.sphere = new Mesh(sphereGeometry, sphereMaterial)

		// this.scene.add(this.sphere)

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

		// gsap.fromTo(this.sphere.position, {x: -3}, {x: 3, duration: 3})
	}

	//@ts-ignore
	update(clock: Clock): void {

		// const time = clock.getElapsedTime();

		// this.sphere.position.x = Math.cos(time) * 2
		// this.sphere.position.y = Math.sin(time / 4) * 2
		// this.sphere.position.z = Math.sin(time) * 2;

		// (this.sphere.material as MeshPhongMaterial).color.set(Math.sin(time)*0xffffff)

		
		// const targetPos = lerp3D(this.sphere.position, new Vector3(this.model.pointerPosition.x*3, this.model.pointerPosition.y*3, 0), 0.01);
		// // console.log(targetPos)
		// this.sphere.position.set(targetPos.x, targetPos.y, targetPos.z)
		
	}
}