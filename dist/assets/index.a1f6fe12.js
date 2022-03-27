import{S as G,a as R,P as V,W as F,b as O,O as U,A as k,c as P,B as j,M,d as x,G as D,T as H,R as N,e as B,f as I,g as $,D as L,h as q,C as Z,V as K}from"./vendor.c910d6b9.js";const X=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))l(e);new MutationObserver(e=>{for(const i of e)if(i.type==="childList")for(const w of i.addedNodes)w.tagName==="LINK"&&w.rel==="modulepreload"&&l(w)}).observe(document,{childList:!0,subtree:!0});function o(e){const i={};return e.integrity&&(i.integrity=e.integrity),e.referrerpolicy&&(i.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?i.credentials="include":e.crossorigin==="anonymous"?i.credentials="omit":i.credentials="same-origin",i}function l(e){if(e.ep)return;e.ep=!0;const i=o(e);fetch(e.href,i)}};X();var Y=`precision mediump float;

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
}`;let a,r,c,g=new Z,_,t,S,y,u,m,p,d,v,z;function Q(){te(),ee(),ne()}function ee(){y=new G,document.body.appendChild(y.dom)}function te(){r=new R,c=new V(75,window.innerWidth/window.innerHeight,.1,1e3),c.position.z=5,a=new F,a.shadowMap.enabled=!0,a.shadowMap.type=O,a.setPixelRatio(window.devicePixelRatio),a.setSize(window.innerWidth,window.innerHeight),document.body.appendChild(a.domElement),S=new U(c,a.domElement),_=new k(3355443),r.add(_);const s=.25;t=new P(16777215),t.position.set(-.5,.5,4),t.castShadow=!0,t.intensity=s,r.add(t),t=new P(16777215),t.position.set(-.5,.5,4),t.castShadow=!0,t.intensity=s,r.add(t);const n=t.clone();n.intensity=1-s,n.castShadow=!1,r.add(n);const o=1024,l=.5,e=500;t.shadow.mapSize.width=o,t.shadow.mapSize.height=o,t.shadow.camera.near=l,t.shadow.camera.far=e;const i=new j,w=new M({color:15776699});u=new x(i,w),u.castShadow=!0,p=new D,p.add(u),u.position.set(-2,0,0),r.add(p);let b;new H().setPath("../resources/textures/").load("uv_grid_opengl.jpg",function(f){f.wrapS=f.wrapT=N,f.anisotropy=a.capabilities.getMaxAnisotropy(),v=f,b=new B({map:f}),u.material=b,new I().setPath("../resources/models/").load("teapot.gltf",A=>{d=A.scene,console.log(d),d.scale.set(.01,.01,.01),d.position.x=2,new M({color:2293538}),d.traverse(h=>{console.log(h),console.log(h.type==="Mesh"),h.type==="Mesh"&&(h.material=b)}),p.add(d)})});const E=new $(6,6,10,10),T=new M({color:6710886,side:L,flatShading:!0}),W={u_time:{type:"f",value:1},u_resolution:{type:"v2",value:new K(800,800)}};z=new q({uniforms:W,vertexShader:Y,fragmentShader:J,side:L}),m=new x(E,T),m.position.z=-2,m.receiveShadow=!0,r.add(m),C()}function ne(){window.addEventListener("resize",oe,!1),window.addEventListener("keydown",s=>{const{key:n}=s;switch(n){case"e":const o=window.open("","Canvas Image"),{domElement:l}=a;a.render(r,c);const e=l.toDataURL();if(!o)return;o.document.write(`<img src='${e}' width='${l.width}' height='${l.height}'>`);break}})}function oe(){c.aspect=window.innerWidth/window.innerHeight,c.updateProjectionMatrix(),a.setSize(window.innerWidth,window.innerHeight)}function C(){requestAnimationFrame(()=>{C()});let s=g.getDelta();z.uniforms.u_time.value+=s,u.rotation.x+=.01,u.rotation.y+=.01,p.rotateZ(s),p.position.set(Math.sin(g.getElapsedTime())*2,0,0);const n=m.geometry.attributes.position;for(let o=0;o<n.count;o++)n.setZ(o,Math.sin(g.getElapsedTime()+o-n.count/2)*.5+Math.cos(g.getElapsedTime()-o)*.5);m.geometry.attributes.position.needsUpdate=!0,d!=null&&(d.rotateX(.01),d.rotateY(.01)),v&&(v.center.set(.5,.5),v.rotation+=s),y&&y.update(),S&&S.update(),a.render(r,c)}Q();
