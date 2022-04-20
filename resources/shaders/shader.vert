precision mediump float;

uniform float u_time;

varying vec2 v_UV;
varying float v_Displacement;

void main(){
	v_UV = uv;
	float diplacement = 
		fract(sin(u_time + uv.y * 10.) + 1.) 
		/ 2. +
		fract(cos(u_time + uv.x * 10.) + 1.)
		 + .25;
	v_Displacement = diplacement;
	vec3 newPosition = position * diplacement;
	vec4 mvPosition = modelViewMatrix*vec4(newPosition,1.);
	// mvPosition.y += sin(u_time / 2. + uv.x) * 2.0;
	// mvPosition.x += cos(u_time / 1.3 + uv.y) * 2.0;
	gl_Position = projectionMatrix*mvPosition;
}