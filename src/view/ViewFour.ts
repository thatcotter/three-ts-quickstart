import { Clock, Mesh, MeshBasicMaterial, MeshLambertMaterial, MeshNormalMaterial, MeshPhongMaterial, PlaneGeometry, PointLight, Quaternion, SphereGeometry, Vector3, WebGLRenderer } from "three";
import * as CANNON from "cannon-es";
import { BaseView } from "./BaseView";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Entity } from "../actors/Entity";


export class ViewFour extends BaseView{

	world: CANNON.World;

	balls: Entity[];
	ground: Entity;

	light: PointLight;

	controller: OrbitControls;


	constructor(model: any, renderer: WebGLRenderer) {
		super(model, renderer)

		this.controller = new OrbitControls(this.camera, renderer.domElement);

		this.world = new CANNON.World({
			gravity: new CANNON.Vec3(0,-9.8,0)
		});

		this.balls = [];

		for (let i = 0; i < 100; i++) {
			const radius = Math.random()

			const tempBall = new Entity(
				new SphereGeometry(radius),
				new MeshPhongMaterial({
					flatShading: true,
					color: Math.random() * 0xffffff,
				}),
				{
					mass: radius,
					shape: new CANNON.Sphere(radius),
				}
			);

			tempBall.body.position.set(
				(Math.random() - 0.5) * 10, 
				(Math.random() - 0.5) * 10, 
				(Math.random() - 0.5) * 10);
			tempBall.body.applyTorque(new CANNON.Vec3(
				Math.random() * 5, 
				Math.random() * 5, 
				Math.random() * 5));
			tempBall.body.applyForce(new CANNON.Vec3(
				Math.random() * 50, 
				Math.random() * 50, 
				Math.random() * 50));

			tempBall.body.position.y += 5;
			
			this.balls.push(tempBall)
		}

		this.balls.forEach((ball: Entity) => {
			this.scene.add(ball.mesh)
			this.world.addBody(ball.body)
		})

		this.ground = new Entity(
			new PlaneGeometry(100,100),
			new MeshNormalMaterial(),
			{
				type: CANNON.Body.STATIC,
				shape: new CANNON.Plane()
			})
		this.ground.body.quaternion.setFromEuler(-Math.PI/2,0,0)
		this.ground.body.position.y = -2;
		this.scene.add(this.ground.mesh);
		this.world.addBody(this.ground.body);

		this.light = new PointLight(0xdddddd)
		this.light.position.set(6,4,5)
		this.scene.add(this.light)
	}

	update(clock: Clock): void {
		const time = clock.getElapsedTime();

		this.world.gravity.copy(this.model.gravity)

		this.world.fixedStep();
		this.controller.update();

		// this.ball.update();
		this.balls.forEach((ball: Entity) => ball.update())
		this.ground.update();
	}
}

type IVec3 = Vector3 & CANNON.Vec3;
type IQuaternion = Quaternion & CANNON.Quaternion;