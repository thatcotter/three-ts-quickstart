import {
	Mesh,
	Renderer,
	BoxGeometry,
	MeshPhongMaterial,
	AmbientLight,
	PointLight,
	Group,
	Material,
	TextureLoader,
	RepeatWrapping,
	Texture,
	MeshBasicMaterial,
	WebGLRenderer,
	PlaneBufferGeometry,
	DoubleSide,
	Clock
} from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { BaseView } from "./BaseView";

export class ViewOne extends BaseView{

	group: Group;
	cube: Mesh;
	plane: Mesh;
	exampleModel: Group;
	exampleTexture: Texture;

	lightAmbient: AmbientLight;
	lightPoint: PointLight;

	constructor(model: any, renderer: WebGLRenderer){
		super(model, renderer);

		this.exampleModel = new Group();
		this.exampleTexture = new Texture();
		this.group = new Group();
		this.scene.add(this.group);

		const cubeGeometry = new BoxGeometry();
		const cubeMaterial = new MeshPhongMaterial({ color: 0xf0bbbb });
		// cubeMaterial.wireframe = true;
		this.cube = new Mesh(cubeGeometry, cubeMaterial);
		this.cube.castShadow = true;

		this.group.add(this.cube);


		const geometryPlane = new PlaneBufferGeometry(6, 6, 10, 10);
		const materialPlane = new MeshPhongMaterial({
			color: 0x666666,
			side: DoubleSide,
			flatShading: true,
		});

		this.plane = new Mesh(geometryPlane, materialPlane);
		this.plane.position.z = -2;
		this.plane.receiveShadow = true;
		this.scene.add(this.plane);

		this.lightAmbient = new AmbientLight(0x333333);
		this.scene.add(this.lightAmbient);

		this.lightPoint = new PointLight(0xffffff);
		this.lightPoint.position.set(-0.5, 0.5, 4);
		this.lightPoint.castShadow = true;
		this.lightPoint.intensity = 0.25;
		this.scene.add(this.lightPoint);

		const mapSize = 1024; // Default 512
		const cameraNear = 0.5; // Default 0.5
		const cameraFar = 500; // Default 500
		this.lightPoint.shadow.mapSize.width = mapSize;
		this.lightPoint.shadow.mapSize.height = mapSize;
		this.lightPoint.shadow.camera.near = cameraNear;
		this.lightPoint.shadow.camera.far = cameraFar;


		let textureMaterial: Material;
		let textureLoader = new TextureLoader().setPath('../resources/textures/');
		textureLoader.load('uv_grid_opengl.jpg', (texture) => {
			texture.wrapS = texture.wrapT = RepeatWrapping;
			texture.anisotropy = this.renderer.capabilities.getMaxAnisotropy();

			this.exampleTexture = texture;

			textureMaterial = new MeshBasicMaterial({ map: texture });

			this.cube.material = textureMaterial;

			const modelLoader = new GLTFLoader().setPath('../resources/models/');
			modelLoader.load('teapot.gltf', (gltf) => {
				
				this.exampleModel = gltf.scene;
				console.log(this.exampleModel);

				this.exampleModel.scale.set(0.01, 0.01, 0.01);
				this.exampleModel.position.x = 2;

				const teapotMat = new MeshPhongMaterial({ color: 0x22ff22 });

				this.exampleModel.traverse((child: THREE.Object3D<THREE.Event>) => {
					console.log(child);
					console.log(child.type === 'Mesh');
					if (child.type === 'Mesh') {
						(child as gltfMesh).material = textureMaterial;
					}
				});

				// scene.add(exampleModel)
				this.group.add(this.exampleModel);
			});
		});
	}

	update(clock: Clock): void {

		this.cube.rotation.x += 0.01;
		this.cube.rotation.y += 0.01;

		// group.rotateZ(delta);
		this.group.rotation.set(0, 0, this.model.groupAngle);
		this.group.position.set(this.model.groupX, this.model.groupY, 0);

		const vertArray = this.plane.geometry.attributes.position;
		for (let i = 0; i < vertArray.count; i++) {
			vertArray.setZ(i, Math.sin(clock.getElapsedTime() + i - vertArray.count / 2) * 0.5 + Math.cos(clock.getElapsedTime() - i) * 0.5);
		}
		this.plane.geometry.attributes.position.needsUpdate = true;


		if (this.exampleModel != undefined) {
			this.exampleModel.rotateX(0.01);
			this.exampleModel.rotateY(0.01);
		}

		if (this.exampleTexture) {
			this.exampleTexture.center.set(0.5, 0.5);
			this.exampleTexture.rotation += clock.getDelta();
		}
		
	}
}

interface gltfMesh extends THREE.Object3D<THREE.Event> {
	material: THREE.Material;
}