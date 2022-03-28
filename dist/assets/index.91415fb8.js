import{S as G,a as R,P as V,W as j,b as F,O,A as U,c as P,B as k,M as S,d as L,G as D,T as H,R as N,e as B,f as I,g as $,D as x,h as q,C as Z,V as K}from"./vendor.c910d6b9.js";const X=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))c(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const f of i.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&c(f)}).observe(document,{childList:!0,subtree:!0});function o(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerpolicy&&(i.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?i.credentials="include":e.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function c(e){if(e.ep)return;e.ep=!0;const i=o(e);fetch(e.href,i)}};X();var Y=`precision mediump float;

uniform float u_time;

varying vec2 UV;

void main(){
	UV = uv;
	vec4 mvPosition = modelViewMatrix*vec4(position,1.);
	mvPosition.y += sin(u_time / 2. + uv.x) * 2.0;
	mvPosition.x += cos(u_time / 1.3 + uv.y) * 2.0;
	gl_Position = projectionMatrix*mvPosition;
}`,J=`precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

varying vec2 UV;

void main(void){
	vec2 position = UV * 2. - 1.;
	
	float red = abs( 
		sin(position.x * position.y + u_time / 5.)
	);
	float green = abs( 
		sin(position.x * position.y + u_time / 4.) 
	);
	float blue = abs( 
		sin(position.x * position.y + u_time / 3.) 
	);

	gl_FragColor=vec4(red, green, blue, 1.0);
}`;let a,d,u,v=new Z,_,t,h,y,m,p,w,l,b,E;function Q(){te(),ee(),ne()}function ee(){y=new G,document.body.appendChild(y.dom)}function te(){d=new R,u=new V(75,window.innerWidth/window.innerHeight,.1,1e3),u.position.z=5,a=new j,a.shadowMap.enabled=!0,a.shadowMap.type=F,a.setPixelRatio(window.devicePixelRatio),a.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(a.domElement),h=new O(u,a.domElement),_=new U(3355443),d.add(_);const s=.25;t=new P(16777215),t.position.set(-.5,.5,4),t.castShadow=!0,t.intensity=s,d.add(t),t=new P(16777215),t.position.set(-.5,.5,4),t.castShadow=!0,t.intensity=s,d.add(t);const n=t.clone();n.intensity=1-s,n.castShadow=!1,d.add(n);const o=1024,c=.5,e=500;t.shadow.mapSize.width=o,t.shadow.mapSize.height=o,t.shadow.camera.near=c,t.shadow.camera.far=e;const i=new k,f=new S({color:15776699});m=new L(i,f),m.castShadow=!0,w=new D,w.add(m),m.position.set(-2,0,0),d.add(w);let M;new H().setPath("../resources/textures/").load("uv_grid_opengl.jpg",function(r){r.wrapS=r.wrapT=N,r.anisotropy=a.capabilities.getMaxAnisotropy(),b=r,M=new B({map:r}),m.material=M,new I().setPath("../resources/models/").load("teapot.gltf",A=>{l=A.scene,console.log(l),l.scale.set(.01,.01,.01),l.position.x=2,new S({color:2293538}),l.traverse(g=>{console.log(g),console.log(g.type==="Mesh"),g.type==="Mesh"&&(g.material=M)}),w.add(l)})});const C=new $(6,6,10,10),T=new S({color:6710886,side:x,flatShading:!0}),W={u_time:{type:"f",value:1},u_resolution:{type:"v2",value:new K(800,800)}};E=new q({uniforms:W,vertexShader:Y,fragmentShader:J,side:x}),p=new L(C,T),p.position.z=-2,p.receiveShadow=!0,d.add(p),h.addEventListener("dragstart",function(r){r.object.material.emissive.set(11184810)}),h.addEventListener("dragend",function(r){r.object.material.emissive.set(0)}),z()}function ne(){window.addEventListener("resize",oe,!1),window.addEventListener("keydown",s=>{const{key:n}=s;switch(n){case"e":const o=window.open("","Canvas Image"),{domElement:c}=a;a.render(d,u);const e=c.toDataURL();if(!o)return;o.document.write(`<img src='${e}' width='${c.width}' height='${c.height}'>`);break}})}function oe(){u.aspect=window.innerWidth/window.innerHeight,u.updateProjectionMatrix(),a.setSize(window.innerWidth,window.innerHeight)}function z(){requestAnimationFrame(()=>{z()});let s=v.getDelta();E.uniforms.u_time.value+=s,m.rotation.x+=.01,m.rotation.y+=.01,w.rotateZ(s),w.position.set(Math.sin(v.getElapsedTime())*2,0,0);const n=p.geometry.attributes.position;for(let o=0;o<n.count;o++)n.setZ(o,Math.sin(v.getElapsedTime()+o-n.count/2)*.5+Math.cos(v.getElapsedTime()-o)*.5);p.geometry.attributes.position.needsUpdate=!0,l!=null&&(l.rotateX(.01),l.rotateY(.01)),b&&(b.center.set(.5,.5),b.rotation+=s),y&&y.update(),h&&h.update(),a.render(d,u)}Q();
