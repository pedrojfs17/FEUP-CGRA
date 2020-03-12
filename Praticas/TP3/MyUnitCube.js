/**
 * MyUnitCube
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCube extends CGFobject {
	constructor(scene) {
		super(scene);
		this.initBuffers();
	}
	initBuffers() {
		this.vertices = [
			-0.5, -0.5, 0.5,	//Bottom front left - 0
			0.5, -0.5, 0.5,	    //Bottom front right - 1
			-0.5, 0.5, 0.5,	    //Top front left - 2
            0.5, 0.5, 0.5,	    //Top front right - 3
            -0.5, -0.5, -0.5,	//Bottom back left - 4
			0.5, -0.5, -0.5,	//Bottom back right - 5
			-0.5, 0.5, -0.5,	//Top back left - 6
            0.5, 0.5, -0.5	    //Top back right - 7
            
		];

		//Counter-clockwise reference of vertices
		this.indices = [
            // Front
            0, 1, 2,
            3, 2, 1,

            // Right
            1, 5, 3,
            7, 3, 5,

            // Back
            5, 4, 7,
            6, 7, 4,

            // Left
            2, 4, 0,
            4, 2, 6,

            // Top
            2, 3, 6,
            7, 6, 3,

            // Bottom
            5, 1, 4,
            4, 1, 0
            
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
	}
}