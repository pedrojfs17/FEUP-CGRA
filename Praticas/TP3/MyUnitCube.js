/**
 * MyDiamond
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
            -0.5, -0.5, -0.5,	//0
			-0.5, -0.5, 0.5,	//1
			-0.5, 0.5, -0.5,	//2
            -0.5, 0.5, 0.5,		//3
            0.5,0.5,0.5,        //4
            0.5,-0.5,0.5,       //5
            0.5,-0.5,-0.5,      //6
			0.5,0.5,-0.5,        //7
			-0.5, -0.5, -0.5,	//8 (0)
			-0.5, -0.5, 0.5,	//9 (1)
			-0.5, 0.5, -0.5,	//10 (2)
            -0.5, 0.5, 0.5,		//11 (3)
            0.5,0.5,0.5,        //12 (4)
            0.5,-0.5,0.5,       //13 (5)
            0.5,-0.5,-0.5,      //14 (6)
			0.5,0.5,-0.5,        //15 (7)
			-0.5, -0.5, -0.5,	//16 (0)
			-0.5, -0.5, 0.5,	//17 (1)
			-0.5, 0.5, -0.5,	//18 (2)
            -0.5, 0.5, 0.5,		//19 (3)
            0.5,0.5,0.5,        //20 (4)
            0.5,-0.5,0.5,       //21 (5)
            0.5,-0.5,-0.5,      //22 (6)
            0.5,0.5,-0.5        //23 (7)*/
		];

		//Counter-clockwise reference of vertices
		this.indices = [
			2, 0, 1,    //Face Esquerda
            1, 3, 2,
            5,6,7,      //Face Direita
            7,4,5,
            11,12,15,      //Face Superior
            15,10,11,
            14,13,9,      //Face Inferior
            9,8,14,
            17,21,20,      //Face Frontal
            20,19,17,
            23,22,16,      //Face Traseira
            16,18,23
		];

		this.normals = [
			-1,0,0,
			-1,0,0,
			-1,0,0,
			-1,0,0,
			1,0,0,
			1,0,0,
			1,0,0,
			1,0,0,
			0,-1,0,
			0,-1,0,
			0,1,0,
			0,1,0,
			0,1,0,
			0,-1,0,
			0,-1,0,
			0,1,0,
			0,0,-1,
			0,0,1,
			0,0,-1,
			0,0,1,
			0,0,1,
			0,0,1,
			0,0,-1,
			0,0,-1
		];

		//The defined indices (and corresponding vertices)
		//will be read in groups of three to draw triangles
		this.primitiveType = this.scene.gl.TRIANGLES;

		this.initGLBuffers();
		
	}
	updateBuffers(complexity){
		// reinitialize buffers
		this.initBuffers();
		this.initNormalVizBuffers();
	}
}

