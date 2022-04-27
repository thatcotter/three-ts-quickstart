import { Clock, Mesh, MeshBasicMaterial, MeshLambertMaterial, MeshNormalMaterial, MeshPhongMaterial, PlaneGeometry, PointLight, Quaternion, SphereGeometry, Vector3, WebGLRenderer } from "three";
import * as CANNON from "cannon-es";
import { BaseView } from "./BaseView";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Vec3 } from "cannon-es";


export class ViewFour extends BaseView{

	world: CANNON.World;

	ballBody: CANNON.Body;
	ballMesh: Mesh;

	groundBody: CANNON.Body;
	groundMesh: Mesh;

	light: PointLight;

	controller: OrbitControls;


	constructor(model: any, renderer: WebGLRenderer) {
		super(model, renderer)

		this.controller = new OrbitControls(this.camera, renderer.domElement);

		this.world = new CANNON.World({
			gravity: new CANNON.Vec3(0,-9.8,0)
		});

		this.ballBody = new CANNON.Body({
			mass: 1,
			shape: new CANNON.Sphere(1)
		});
		this.ballBody.position.y = 10;
		// this.ballBody.applyForce(new CANNON.Vec3(10, 0, 0));
		// this.ballBody.applyTorque(new CANNON.Vec3(0,0,-100))


		this.world.addBody(this.ballBody);

		this.ballMesh = new Mesh(new SphereGeometry(), new MeshPhongMaterial({
			color: 0xcc438f,
			flatShading: true
		}));
		this.scene.add(this.ballMesh);

		this.groundBody = new CANNON.Body({
			type: CANNON.Body.STATIC,
			shape: new CANNON.Plane()
		});
		this.groundBody.quaternion.setFromEuler(-Math.PI/2, 0, 0);
		this.groundBody.position.set(0, -2, 0);
		this.world.addBody(this.groundBody);

		this.groundMesh = new Mesh( new PlaneGeometry(10,10), new MeshNormalMaterial());
		this.scene.add(this.groundMesh);


		this.light = new PointLight(0xdddddd)
		this.light.position.set(6,4,5)
		this.scene.add(this.light)
	}

	update(clock: Clock): void {
		const time = clock.getElapsedTime();

		this.world.gravity.copy(this.model.gravity)

		this.world.fixedStep();
		this.controller.update();

		
		this.ballMesh.position.copy(this.ballBody.position as IVec3);
		this.ballMesh.quaternion.copy(this.ballBody.quaternion as IQuaternion);

		this.groundMesh.position.copy(this.groundBody.position as IVec3);
		this.groundMesh.quaternion.copy(this.groundBody.quaternion as IQuaternion);


		// console.log(this.ballBody.position);
	}
}

type IVec3 = Vector3 & CANNON.Vec3;
type IQuaternion = Quaternion & CANNON.Quaternion;