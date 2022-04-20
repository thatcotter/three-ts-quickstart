precision mediump float;

uniform vec2 u_resolution;
uniform float u_time;

varying vec2 v_UV;
varying float v_Displacement;
varying vec3 v_Normal;

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

	// float hue = cos(v_UV.x * 40. + sin(v_UV.y * 20.) * 10. + u_time);
	
	vec3 hue = vec3(0.);//step(0.5, vec3(1.-length(position)));

	// for(float i = 0.; i < 1.; i++) {
		
		// position.x = cos(u_time);
		// position.y = sin(u_time)* 0.5;

		vec3 circle = step(0.5, vec3(1.- length(abs(position))));

		hue += circle;
	// }

	gl_FragColor=vec4(hue, 1.0);
}