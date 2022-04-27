var N=Object.defineProperty;var B=(s,e,t)=>e in s?N(s,e,{enumerable:!0,configurable:!0,writable:!0,value:t}):s[e]=t;var i=(s,e,t)=>(B(s,typeof e!="symbol"?e+"":e,t),t);import{S as O,P as q,G as k,T as $,B as E,M as v,a as p,b as S,D as j,A as F,c as V,d as H,R as X,e as Y,f as K,g as Z,h as C,i as J,C as Q,O as G,j as U,W as ee,V as L,k as te,l as ie,m as oe,n as ne,o as se,p as ae,q as re,r as le,s as W,t as he,u as de}from"./vendor.eb95f334.js";const ce=function(){const e=document.createElement("link").relList;if(e&&e.supports&&e.supports("modulepreload"))return;for(const n of document.querySelectorAll('link[rel="modulepreload"]'))o(n);new MutationObserver(n=>{for(const r of n)if(r.type==="childList")for(const m of r.addedNodes)m.tagName==="LINK"&&m.rel==="modulepreload"&&o(m)}).observe(document,{childList:!0,subtree:!0});function t(n){const r={};return n.integrity&&(r.integrity=n.integrity),n.referrerpolicy&&(r.referrerPolicy=n.referrerpolicy),n.crossorigin==="use-credentials"?r.credentials="include":n.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(n){if(n.ep)return;n.ep=!0;const r=t(n);fetch(n.href,r)}};ce();class M{constructor(e,t){i(this,"scene");i(this,"camera");i(this,"renderer");i(this,"model");this.scene=new O,this.camera=new q(75,window.innerWidth/window.innerHeight,.1,1e3),this.camera.position.z=5,this.renderer=t,this.model=e}update(e){}onWindowResize(){this.camera.aspect=window.innerWidth/window.innerHeight,this.camera.updateProjectionMatrix(),this.renderer.setSize(window.innerWidth,window.innerHeight)}}class pe extends M{constructor(e,t){super(e,t);i(this,"group");i(this,"cube");i(this,"plane");i(this,"exampleModel");i(this,"exampleTexture");i(this,"lightAmbient");i(this,"lightPoint");this.exampleModel=new k,this.exampleTexture=new $,this.group=new k,this.scene.add(this.group);const o=new E,n=new v({color:15776699});this.cube=new p(o,n),this.cube.castShadow=!0,this.group.add(this.cube);const r=new S(6,6,10,10),m=new v({color:6710886,side:j,flatShading:!0});this.plane=new p(r,m),this.plane.position.z=-2,this.plane.receiveShadow=!0,this.scene.add(this.plane),this.lightAmbient=new F(3355443),this.scene.add(this.lightAmbient),this.lightPoint=new V(16777215),this.lightPoint.position.set(-.5,.5,4),this.lightPoint.castShadow=!0,this.lightPoint.intensity=.25,this.scene.add(this.lightPoint);const l=1024,w=.5,g=500;this.lightPoint.shadow.mapSize.width=l,this.lightPoint.shadow.mapSize.height=l,this.lightPoint.shadow.camera.near=w,this.lightPoint.shadow.camera.far=g;let _;new H().setPath("../resources/textures/").load("uv_grid_opengl.jpg",b=>{b.wrapS=b.wrapT=X,b.anisotropy=this.renderer.capabilities.getMaxAnisotropy(),this.exampleTexture=b,_=new Y({map:b}),this.cube.material=_,new K().setPath("../resources/models/").load("teapot.gltf",D=>{this.exampleModel=D.scene,console.log(this.exampleModel),this.exampleModel.scale.set(.01,.01,.01),this.exampleModel.position.x=2,new v({color:2293538}),this.exampleModel.traverse(f=>{console.log(f),console.log(f.type==="Mesh"),f.type==="Mesh"&&(f.material=_)}),this.group.add(this.exampleModel)})})}update(e){this.cube.rotation.x+=.01,this.cube.rotation.y+=.01,this.group.rotation.set(0,0,this.model.groupAngle),this.group.position.set(this.model.groupX,this.model.groupY,0);const t=this.plane.geometry.attributes.position;for(let o=0;o<t.count;o++)t.setZ(o,Math.sin(e.getElapsedTime()+o-t.count/2)*.5+Math.cos(e.getElapsedTime()-o)*.5);this.plane.geometry.attributes.position.needsUpdate=!0,this.exampleModel!=null&&(this.exampleModel.rotateX(.01),this.exampleModel.rotateY(.01)),this.exampleTexture&&(this.exampleTexture.center.set(.5,.5),this.exampleTexture.rotation+=e.getDelta())}}class ue extends M{constructor(e,t){super(e,t);i(this,"spheres");i(this,"tl");i(this,"lightPoint");i(this,"lightAmbient");this.spheres=[],this.tl=Z.timeline();const o=new C(.5);for(let l=0;l<10;l++){const w=new v({color:16777215}),g=new p(o,w);this.tl.to(g.position,{x:Math.cos(l/10*Math.PI*2)*3,y:Math.sin(l/10*Math.PI*2)*3,duration:2,ease:"bounce.out"},`${l/4}`),this.tl.fromTo(g.scale,{x:0,y:0},{x:1,y:1,duration:2,ease:"expo.out"},"<"),this.tl.to(g.material.color,{r:Math.random(),g:Math.random(),b:Math.random(),duration:2},"<"),this.spheres.push(g),this.scene.add(g)}this.tl.addLabel("returnLabel","<"),this.spheres.forEach((l,w)=>{this.tl.to(l.scale,{x:0,y:0,z:0,duration:4},`returnLabel +=${w/4}`),this.tl.to(l.material.color,{r:1,g:1,b:1,duration:4},"<"),this.tl.to(l.position,{x:Math.cos(w/10*Math.PI*2-Math.PI)*3,duration:1,ease:"expo.out"},"<"),this.tl.to(l.position,{y:Math.sin(w/10*-Math.PI*2)*3,duration:2,ease:"sine.out"},"<"),this.tl.to(l.position,{z:Math.sin(l.position.x/3)*3,duration:1,ease:"sine.out"},"<"),this.tl.to(l.position,{z:0,duration:1,ease:"sine.out"})}),this.lightPoint=new V(13421772),this.lightPoint.intensity=.66,this.lightPoint.position.set(-5,3,4);const n=1024,r=.5,m=500;this.lightPoint.shadow.mapSize.width=n,this.lightPoint.shadow.mapSize.height=n,this.lightPoint.shadow.camera.near=r,this.lightPoint.shadow.camera.far=m,this.scene.add(this.lightPoint),this.lightAmbient=new F(16777215),this.lightAmbient.intensity=.2,this.scene.add(this.lightAmbient)}update(e){}}var me=`precision mediump float;

uniform float u_time;

varying vec2 v_UV;
varying float v_Displacement;
varying vec3 v_Normal;

void main(){
	//cos(v_UV.x * 40. + sin(v_UV.y * 20.) * 10. + u_time)
	v_UV = uv;
	v_Normal = normal;
	// float diplacement = cos(v_UV.x * 40. + sin(v_UV.y * 20.) * 10. + u_time) * 0.051;
	float diplacement = cos((1.-length(position) * 16.) + u_time) * 0.1;
	diplacement *= 1.-length(position);
	v_Displacement = diplacement;
	vec3 newPosition = position;// + normal * diplacement;
	vec4 mvPosition = modelViewMatrix*vec4(newPosition,1.);
	// mvPosition.y += sin(u_time / 2. + uv.x) * 2.0;
	// mvPosition.x += cos(u_time / 1.3 + uv.y) * 2.0;
	gl_Position = projectionMatrix*mvPosition;
}`,we=`precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

varying vec2 v_UV;
varying float v_Displacement;
varying vec3 v_Normal;

void main(void){
	vec2 position = v_UV * 2. - 1.;
	
	// float red = abs( 
	// 	sin(position.x * position.y + u_time / 5.) * v_Displacement
	// );
	// float green = abs( 
	// 	sin(position.x * position.y + u_time / 4.) * v_Displacement
	// );
	// float blue = abs( 
	// 	sin(position.x * position.y + u_time / 3.) * v_Displacement
	// );

	// float hue = cos(v_UV.x * 40. + sin(v_UV.y * 20.) * 10. + u_time);
	
	vec3 hue = vec3(0.1);

	for(float i = 0.; i < 10.; i++) {

		vec2 translate = vec2(
			cos(u_time + i/3.14 * 2.) * 0.35,
			sin(u_time + i/3.14 * 2.) * 0.35
		);
		
		position += translate;

		vec3 circle = step(0.95, vec3(1.- length(abs(position))));

		hue += circle;

		position -= translate;
	}

	gl_FragColor=vec4(hue, 1.0);
}`;class ge extends M{constructor(e,t){super(e,t);i(this,"controller");i(this,"blobSphere");i(this,"blobCube");i(this,"blobPlane");i(this,"blobCylinder");i(this,"blobGeo");i(this,"blobMat");this.blobGeo=new C(1,60,60),this.blobMat=new J({uniforms:{u_time:{value:0}},vertexShader:me,fragmentShader:we}),this.blobSphere=new p(this.blobGeo,this.blobMat),this.blobCube=new p(new E(1,1,1,60,60,60),this.blobMat),this.blobCube.position.set(-3,0,0),this.blobPlane=new p(new S(1,1,60,60),this.blobMat),this.blobPlane.position.set(3,0,0),this.blobCylinder=new p(new Q(1,1,1,60,60),this.blobMat),this.blobCylinder.position.set(0,3,0),this.scene.add(this.blobSphere),this.scene.add(this.blobCube),this.scene.add(this.blobPlane),this.scene.add(this.blobCylinder),this.controller=new G(this.camera,this.renderer.domElement)}update(e){const t=e.getElapsedTime();this.blobMat.uniforms.u_time.value=t}}class I{constructor(e,t,o){i(this,"body");i(this,"mesh");i(this,"geometry");i(this,"material");this.body=new U(o),this.geometry=e,this.material=t,this.mesh=new p(this.geometry,this.material)}update(){this.mesh.position.copy(this.body.position),this.mesh.quaternion.copy(this.body.quaternion)}}class be extends M{constructor(e,t){super(e,t);i(this,"world");i(this,"balls");i(this,"ground");i(this,"light");i(this,"controller");this.controller=new G(this.camera,t.domElement),this.world=new ee({gravity:new L(0,-9.8,0)}),this.balls=[];for(let o=0;o<100;o++){const n=Math.random(),r=new I(new C(n),new v({flatShading:!0,color:Math.random()*16777215}),{mass:n,shape:new te(n)});r.body.position.set((Math.random()-.5)*10,(Math.random()-.5)*10,(Math.random()-.5)*10),r.body.applyTorque(new L(Math.random()*5,Math.random()*5,Math.random()*5)),r.body.applyForce(new L(Math.random()*50,Math.random()*50,Math.random()*50)),r.body.position.y+=5,this.balls.push(r)}this.balls.forEach(o=>{this.scene.add(o.mesh),this.world.addBody(o.body)}),this.ground=new I(new S(100,100),new ie,{type:U.STATIC,shape:new oe}),this.ground.body.quaternion.setFromEuler(-Math.PI/2,0,0),this.ground.body.position.y=-2,this.scene.add(this.ground.mesh),this.world.addBody(this.ground.body),this.light=new V(14540253),this.light.position.set(6,4,5),this.scene.add(this.light)}update(e){e.getElapsedTime(),this.world.gravity.copy(this.model.gravity),this.world.fixedStep(),this.controller.update(),this.balls.forEach(t=>t.update()),this.ground.update()}}let a={groupX:0,groupY:0,groupAngle:0,activeView:3,pointerPosition:new W(0,0),gravity:new he(0,-9.8,0)},d,y=new de,x,P,c,T,z,u=[],h;function ve(){Me(),ye(),fe(),xe()}function ye(){x=new ne,document.body.appendChild(x.dom)}function fe(){h=new se,A()}function A(){switch(console.log(h.__folders),h.__folders.group&&h.removeFolder(h.__folders.group),h.__folders.timeline&&h.removeFolder(h.__folders.timeline),h.__folders.cannon&&h.removeFolder(h.__folders.cannon),a.activeView){case 0:const s=h.addFolder("group");s.open(),s.add(a,"groupX",-4,4,.1),s.add(a,"groupY",-3,3,.1),s.add(a,"groupAngle",0,Math.PI*2,.1);break;case 1:let e={position:0,play:()=>{c.tl.play()},pause:()=>{c.tl.pause()},restart:()=>{c.tl.pause(),c.tl.seek(0),c.tl.play()}};const t=h.addFolder("timeline");t.open(),t.add(e,"position",0,8,.01).onChange(n=>{c.tl.pause(),c.tl.seek(n)}),t.add(e,"play"),t.add(e,"pause"),t.add(e,"restart");break;case 3:const o=h.addFolder("cannon");o.open(),o.add(a.gravity,"x",-10,10,.01),o.add(a.gravity,"y",-10,10,.01),o.add(a.gravity,"z",-10,10,.01);break}}function Me(){d=new ae,d.shadowMap.enabled=!0,d.shadowMap.type=re,d.setPixelRatio(window.devicePixelRatio),d.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(d.domElement),P=new pe(a,d),u.push(P),c=new ue(a,d),u.push(c),T=new ge(a,d),u.push(T),z=new be(a,d),u.push(z),new le,new W(800,800),R()}function xe(){window.addEventListener("resize",Pe,!1),window.addEventListener("pointermove",_e),window.addEventListener("keydown",s=>{const{key:e}=s;switch(e){case"e":const t=window.open("","Canvas Image"),{domElement:o}=d,n=o.toDataURL();if(!t)return;t.document.write(`<img src='${n}' width='${o.width}' height='${o.height}'>`);break;case"ArrowRight":a.activeView=(a.activeView+1)%u.length,A();break;case"ArrowLeft":a.activeView=a.activeView-1,a.activeView<0&&(a.activeView=u.length-1),A();break}})}function Pe(){P.onWindowResize(),c.onWindowResize()}function _e(s){a.pointerPosition.x=s.clientX/window.innerWidth*2-1,a.pointerPosition.y=-(s.clientY/window.innerHeight)*2+1}function R(){switch(requestAnimationFrame(()=>{R()}),y.getDelta(),a.activeView){case 0:P.update(y);break;case 1:c.update(y);break;case 2:T.update(y);break;case 3:z.update(y);break}x&&x.update(),d.render(u[a.activeView].scene,u[a.activeView].camera)}ve();
