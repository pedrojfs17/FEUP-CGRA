/**
 * MyTangram
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyTangram extends CGFobject {
	constructor(scene) {
        super(scene);
        this.initMaterials(scene);
        
        this.baseSquare = new MyDiamond(this.scene);
        this.orangeTriangle = new MyTriangleBig(this.scene);
        this.purpleTriangle = new MyTriangleSmall(this.scene);
        this.yellowParallelogram = new MyParallelogram(this.scene);
        this.redTriangle = new MyTriangleSmall(this.scene);
        this.blueTriangle = new MyTriangleBig(this.scene);
        this.pinkTriangle = new MyTriangle(this.scene);
    }
    
    initMaterials(scene) {
        //green color
        this.green = new CGFappearance(scene);
        this.green.setAmbient(0,1*0.5,0,1.0);
        this.green.setDiffuse(0,1*0.7,0,1.0);
        this.green.setSpecular(0,1,0,1.0);
        this.green.setShininess(10.0);

        //orange color
        this.orange = new CGFappearance(scene);
        this.orange.setAmbient(1*0.5,0.647*0.5,0,1.0);
        this.orange.setDiffuse(1*0.7,0.647*0.7,0,1.0);
        this.orange.setSpecular(1,0.647,0,1.0);
        this.orange.setShininess(10.0);

        //light blue color
        this.blue = new CGFappearance(scene);
        this.blue.setAmbient(0,0.749*0.5,1*0.5,1.0);
        this.blue.setDiffuse(0,0.749*0.7,1*0.7,1.0);
        this.blue.setSpecular(0,0.749,1,1.0);
        this.blue.setShininess(10.0);

        //yellow color
        this.yellow = new CGFappearance(scene);
        this.yellow.setAmbient(1*0.5,1*0.5,0,1.0);
        this.yellow.setDiffuse(1*0.7,1*0.7,0,1.0);
        this.yellow.setSpecular(1,1,0,1.0);
        this.yellow.setShininess(10.0);

        //purple color
        this.purple = new CGFappearance(scene);
        this.purple.setAmbient(0.58*0.5,0,0.827*0.5,1.0);
        this.purple.setDiffuse(0.58*0.7,0,0.827*0.7,1.0);
        this.purple.setSpecular(0.58,0,0.827,1.0);
        this.purple.setShininess(10.0);

        //pink color
        this.pink = new CGFappearance(scene);
        this.pink.setAmbient(1*0.5,0.714*0.5,0.757*0.5,1.0);
        this.pink.setDiffuse(1*0.7,0.714*0.7,0.757*0.7,1.0);
        this.pink.setSpecular(1,0.714,0.757,1.0);
        this.pink.setShininess(10.0);

        //red color
        this.red = new CGFappearance(scene);
        this.red.setAmbient(1*0.5,0,0,1.0);
        this.red.setDiffuse(1*0.7,0,0,1.0);
        this.red.setSpecular(1,0,0,1.0);
        this.red.setShininess(10.0);
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
    
    enableNormalViz() {
        this.baseSquare.enableNormalViz();
		this.orangeTriangle.enableNormalViz();
		this.purpleTriangle.enableNormalViz();
		this.redTriangle.enableNormalViz();
        this.yellowParallelogram.enableNormalViz();
        this.blueTriangle.enableNormalViz();
        this.pinkTriangle.enableNormalViz();
    }

    disableNormalViz() {
        this.baseSquare.disableNormalViz();
		this.orangeTriangle.disableNormalViz();
		this.purpleTriangle.disableNormalViz();
		this.redTriangle.disableNormalViz();
        this.yellowParallelogram.disableNormalViz();
        this.blueTriangle.disableNormalViz();
        this.pinkTriangle.disableNormalViz();
    }

    updateBuffers(complexity){
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }
}
