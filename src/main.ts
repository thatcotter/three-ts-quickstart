import './style.scss';
import * as THREE from 'three';
import * as PIXI from 'pixi.js'
import { Mesh, Raycaster, ShaderMaterial, Shading, Vector2 } from 'three';
import Stats from 'three/examples/jsm/libs/stats.module';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { DragControls } from 'three/examples/jsm/controls/DragControls.js'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import * as DAT from 'dat.gui';

import { BaseView } from "./view/BaseView";
import { BaseView2D } from './view/BaseView2D';
import { BaseView3D } from './view/BaseView3D';
import { ViewOne } from './view/ViewOne';
import { ViewTwo } from './view/ViewTwo';
import { ViewThree } from './view/ViewThree';
import { ViewFour } from './view/ViewFour';
import { ViewFive } from './view/ViewFive';

let model = {
	groupX: 0,
	groupY: 0,
	groupAngle: 0,
	activeView: 1,
	pointerPosition: new THREE.Vector2(0,0),
	gravity: new THREE.Vector3(0,-9.8,0)
}

let renderer: THREE.WebGLRenderer;
let clock = new THREE.Clock();

let controls: DragControls;
let stats: any;

let raycaster: THREE.Raycaster;
// let pointerPosition: THREE.Vector2;

let viewOne: ViewOne;
let viewTwo: ViewTwo;
let viewThree: ViewThree;
let viewFour: ViewFour;
let viewFive: ViewFive;

let views: BaseView[] = [];

let gui: DAT.GUI;

let pixiApp: PIXI.Application = new PIXI.Application();


// let shaderMat: ShaderMaterial;

function main() {
	initScene();
	initStats();
	initGUI();
	initListeners();
}

function initStats() {
	stats = new (Stats as any)();
	document.body.appendChild(stats.dom);
}

function initGUI() {
	gui = new DAT.GUI();
	updateGUI()
}

function updateGUI() {

	console.log(gui.__folders);
	if (gui.__folders.group) {
		gui.removeFolder(gui.__folders.group);
	}

	if (gui.__folders.timeline) {
		gui.removeFolder(gui.__folders.timeline);
	}

	if (gui.__folders.cannon) {
		gui.removeFolder(gui.__folders.cannon);
	}

	switch (model.activeView) {
		case 0:
			const groupControls = gui.addFolder('group');
			groupControls.open();
			groupControls.add(model, 'groupX', -4, 4, 0.1);
			groupControls.add(model, 'groupY', -3, 3, 0.1);
			groupControls.add(model, 'groupAngle', 0, Math.PI * 2.0, 0.1);
			break;

		case 1:
			let tlSettings = {
				position: 0,
				play: () => {
					viewTwo.tl.play();
				},
				pause: () => {
					viewTwo.tl.pause();
				},
				restart: () => {
					viewTwo.tl.pause();
					viewTwo.tl.seek(0);
					viewTwo.tl.play();
				},
			};
			const tlControls = gui.addFolder('timeline');
			tlControls.open();
			tlControls.add(tlSettings, 'position', 0, 8, 0.01).onChange((value) => {
				viewTwo.tl.pause();
				viewTwo.tl.seek(value);
			});
			tlControls.add(tlSettings, 'play');
			tlControls.add(tlSettings, 'pause');
			tlControls.add(tlSettings, 'restart');
			break;

		case 3:
			const cannonControls = gui.addFolder('cannon');
			cannonControls.open();
			cannonControls.add(model.gravity, 'x', -10, 10, 0.01);
			cannonControls.add(model.gravity, 'y', -10, 10, 0.01);
			cannonControls.add(model.gravity, 'z', -10, 10, 0.01);
			break;
	
		default:
			break;
	}
}

function initScene() {
	renderer = new THREE.WebGLRenderer();
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(window.innerWidth, window.innerHeight);

	pixiApp.renderer.view.style.position = 'absolute';
	pixiApp.renderer.view.style.display = 'none';
	pixiApp.renderer.backgroundColor = 0xe9ffc2;
	pixiApp.renderer.resize(window.innerWidth, window.innerHeight);

	document.body.appendChild(renderer.domElement);
	document.body.appendChild(pixiApp.view);

	viewOne = new ViewOne(model, renderer);
	views.push(viewOne);

	viewTwo = new ViewTwo(model, renderer);
	views.push(viewTwo);

	viewThree = new ViewThree(model, renderer);
	views.push(viewThree);

	viewFour = new ViewFour(model, renderer);
	views.push(viewFour);

	viewFive = new ViewFive(model, pixiApp);
	views.push(viewFive);

	// controls = new OrbitControls(camera, renderer.domElement);

	raycaster = new THREE.Raycaster();
	// model.pointerPosition = new THREE.Vector2(0,0);

	const uniforms = {
		u_time: { type: 'f', value: 1.0 },
		u_resolution: { type: 'v2', value: new THREE.Vector2(800, 800) },
		// u_mouse: { type: 'v2', value: new THREE.Vector2() },
	};

	// shaderMat = new THREE.ShaderMaterial({
	// 	uniforms: uniforms,
	// 	vertexShader: vertexShader,
	// 	fragmentShader: fragmentShader,
	// 	side: THREE.DoubleSide,
	// });

	// add event listener to highlight dragged objects

	// controls = new DragControls([plane], camera, renderer.domElement);

	// controls.addEventListener('dragstart', function(event) {
	// 	event.object.material.emissive.set(0xaaaaaa);
	// })

	// controls.addEventListener('dragend', function (event) {
	// 	event.object.material.emissive.set(0x000000);
	// })

	// // Init animation
	animate();
}

function initListeners() {
	window.addEventListener('resize', onWindowResize, false);

	window.addEventListener('pointermove', onPointerMove);

	window.addEventListener('keydown', (event) => {
		const { key } = event;
		// console.log(key);

		switch (key) {
			case 'e':
				const win = window.open('', 'Canvas Image');

				const { domElement } = renderer;

				// Makse sure scene is rendered.
				// renderer.render(scene, camera);

				const src = domElement.toDataURL();

				if (!win) return;

				win.document.write(`<img src='${src}' width='${domElement.width}' height='${domElement.height}'>`);
				break;

			case 'ArrowRight':
				model.activeView = (model.activeView + 1) % views.length
				updateGUI();
				break;

			case 'ArrowLeft':
				model.activeView = (model.activeView - 1)
				if (model.activeView < 0) {
					model.activeView = views.length - 1;
				}
				updateGUI();
				break;

			default:
				break;
		}
	});
}

function onWindowResize() {
	viewOne.onWindowResize();
	viewTwo.onWindowResize();
}

function onPointerMove(event: any) {
	model.pointerPosition.x = (event.clientX / window.innerWidth) * 2 - 1;
	model.pointerPosition.y = -(event.clientY / window.innerHeight) * 2 + 1;

	viewTwo.onMouseMove()
}

const myVariable  = {
	zpos: 10
}


function animate() {
	requestAnimationFrame(() => {
		animate();
	});

	let delta = clock.getDelta();

	// shaderMat.uniforms.u_time.value += delta;

	switch (model.activeView) {
		case 0:
			viewOne.update(clock);
			break;

		case 1:
			viewTwo.update(clock);
			break;

		case 2:
			viewThree.update(clock);
			break;

		case 3:
			viewFour.update(clock);
			break;

		case 4:
			viewFive.update();
			break;

		default:
			break;
	}
	


	// raycaster.setFromCamera(pointerPosition, camera)
	// const intersects = raycaster.intersectObjects(scene.children)

	// for (let i = 0; i < scene.children.length; i++) {
	// 	if (scene.children[i].type === "Mesh") {
	// 		(scene.children[i] as MeshObj).material.color.set(0x888888);
	// 	}
	// }

	// for (let i = 0; i < intersects.length; i++) {
	// 	if (intersects[i].object.type === 'Mesh') {
	// 		(intersects[i].object as MeshObj).material.color.set(0xff0000);
	// 	}
	// }


	if (stats) stats.update();

	// if (controls) controls.update();

	if(views[model.activeView] instanceof BaseView3D) {
		renderer.domElement.style.display = 'block'
		pixiApp.renderer.view.style.display = 'none'

		renderer.render((views[model.activeView] as BaseView3D).scene, (views[model.activeView] as BaseView3D).camera);
	}

	if (views[model.activeView] instanceof BaseView2D) {
		renderer.domElement.style.display = 'none'
		pixiApp.renderer.view.style.display = 'block'

		// 
	}
}

main();


interface MeshObj extends THREE.Object3D<THREE.Event> {
	material: THREE.MeshPhongMaterial;
}

interface gltfMesh extends THREE.Object3D<THREE.Event> {
	material: THREE.Material;
}

interface ColorMaterial extends THREE.Material {
	color: THREE.Color;
}
