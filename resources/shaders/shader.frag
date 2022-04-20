precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

varying vec2 v_UV;
varying float v_Displacement;

void main(void){
	vec2 position = v_UV * 2. - 1.;
	
	float red = abs( 
		sin(position.x * position.y + u_time / 5.) * v_Displacement
	);
	float green = abs( 
		sin(position.x * position.y + u_time / 4.) * v_Displacement
	);
	float blue = abs( 
		sin(position.x * position.y + u_time / 3.) * v_Displacement
	);



	gl_FragColor=vec4(red, green, blue, 1.0);
}