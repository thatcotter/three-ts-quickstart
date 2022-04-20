precision mediump float;

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
}