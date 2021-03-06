#ifdef GL_ES
precision highp float;
#endif

attribute vec3 aVertexPosition;
attribute vec3 aVertexNormal;
attribute vec2 aTextureCoord;

uniform mat4 uMVMatrix;
uniform mat4 uPMatrix;
uniform mat4 uNMatrix;

varying vec2 vTextureCoord;

uniform float timeFactor;
uniform float speed;
uniform float acceleration;

void main() {
    vTextureCoord = aTextureCoord;

    vec3 offset=vec3(0.0,0.0,0.0);

   
    if (acceleration >= 0.0){
        if(speed==0.0)
            offset.z += cos((aVertexPosition.x + timeFactor) * 3.0) * 0.5 * (aVertexPosition.x - 0.5);
        else
            offset.z += cos((aVertexPosition.x + timeFactor*speed*7.0) * 3.0) * 0.5 * (aVertexPosition.x - 0.5);
    }
        
    else
        offset.z += cos((aVertexPosition.x + timeFactor - speed) * 3.0) * 0.5 * (aVertexPosition.x - 0.5);
    
    gl_Position = uPMatrix * uMVMatrix * vec4(aVertexPosition + offset, 1.0);
}