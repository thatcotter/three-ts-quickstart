precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

varying vec2 UV;
varying float Displacement;

void main(void){
	vec2 position = UV * 2. - 1.;
	
	float red = abs( 
		sin(position.x * position.y + u_time / 5.) * Displacement
	);
	float green = abs( 
		sin(position.x * position.y + u_time / 4.) * Displacement
	);
	float blue = abs( 
		sin(position.x * position.y + u_time / 3.) * Displacement
	);



	gl_FragColor=vec4(red, green, blue, 1.0);
}