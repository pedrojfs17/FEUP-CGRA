/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {
	constructor(scene) {
        super(scene);
        
        this.baseSquare = new MyDiamond(this.scene);
        this.orangeTriangle = new MyTriangleBig(this.scene);
        this.purpleTriangle = new MyTriangleSmall(this.scene);
        this.yellowParallelogram = new MyParallelogram(this.scene);
        this.redTriangle = new MyTriangleSmall(this.scene);
        this.blueTriangle = new MyTriangleBig(this.scene);
        this.pinkTriangle = new MyTriangle(this.scene);
	}
    
    display() {
        this.scene.pushMatrix();
        this.scene.translate(0, -Math.sqrt(8), 0);

        // BASE SQUARE
        var rot = [Math.cos(Math.PI / 4), Math.sin(Math.PI / 4), 0.0, 0.0,
                    -Math.sin(Math.PI / 4), Math.cos(Math.PI / 4), 0.0, 0.0,
                    0.0, 0.0, 1.0, 0.0,
                    0.0, 0.0, 0.0, 1.0];

        var tra = [1.0, 0.0, 0.0, 0.0,
                    0.0, 1.0, 0.0, 0.0, 
                    0.0, 0.0, 1.0, 0.0,
                    0.0, -Math.sqrt(2) / 2, 0.0, 1.0];
        
        this.scene.pushMatrix();
        this.scene.multMatrix(tra);
        this.scene.multMatrix(rot);
        this.scene.setDiffuse(0,1,0,0);
        this.baseSquare.display();
        this.scene.popMatrix();


        // ORANGE TRIANGLE
        this.scene.pushMatrix();
        this.scene.translate(-Math.sqrt(2), Math.sqrt(2), 0);
        this.scene.rotate(-3 * Math.PI/4, 0, 0, 1);
        this.scene.setDiffuse(1, 128/255, 0, 0);
        this.orangeTriangle.display();
        this.scene.popMatrix()

        // PURPLE TRIANGLE
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0);
        this.scene.rotate(3 * Math.PI/4, 0, 0, 1);
        this.scene.setDiffuse(204/255, 0, 204/255, 0);
        this.purpleTriangle.display();
        this.scene.popMatrix();

        // RED TRIANGLE
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2), 0, 0);
        this.scene.translate(Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0);
        this.scene.rotate(3 * Math.PI/4, 0, 0, 1);
        this.scene.setDiffuse(1, 0, 0, 0);
        this.redTriangle.display();
        this.scene.popMatrix();

        // YELLOW PARALLELOGRAM
        this.scene.pushMatrix();
        this.scene.translate(Math.sqrt(2), 0, 0);
        this.scene.rotate(-Math.PI / 4, 0, 0, 1);
        this.scene.scale(-1, 1, 1);
        this.scene.setDiffuse(1, 1, 0, 0);
        this.yellowParallelogram.display();
        this.scene.popMatrix();

        this.scene.popMatrix();

        // BLUE TRIANGLE
        this.scene.pushMatrix();
        this.scene.setDiffuse(0, 153/255, 1, 0);
        this.blueTriangle.display();
        this.scene.popMatrix();

        // PINK TRIANGLE
        this.scene.pushMatrix();
        this.scene.translate(0, 2, 0);
        this.scene.rotate(-3 * Math.PI / 4, 0, 0, 1);
        this.scene.setDiffuse(1, 102/255, 204/255, 0);
        this.pinkTriangle.display();
        this.scene.popMatrix();
    }
}
