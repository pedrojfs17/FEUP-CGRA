/**
* MyScene
* @constructor
*/
class MyScene extends CGFscene {
    constructor() {
        super();
    }
    init(application) {
        super.init(application);
        this.initCameras();
        this.initLights();

        //Background color
        this.gl.clearColor(0.0, 0.0, 0.0, 1.0);

        this.gl.clearDepth(100.0);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.enable(this.gl.CULL_FACE);
        this.gl.depthFunc(this.gl.LEQUAL);

        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.baseSquare = new MyDiamond(this);
        this.orangeTriangle = new MyTriangleBig(this);
        this.purpleTriangle = new MyTriangleSmall(this);
        this.yellowParallelogram = new MyParallelogram(this);
        this.redTriangle = new MyTriangleSmall(this);

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayDiamond = true;
        this.scaleFactor = 1;
    }
    initLights() {
        this.lights[0].setPosition(15, 2, 5, 1);
        this.lights[0].setDiffuse(1.0, 1.0, 1.0, 1.0);
        this.lights[0].enable();
        this.lights[0].update();
    }
    initCameras() {
        this.camera = new CGFcamera(0.4, 0.1, 500, vec3.fromValues(15, 15, 15), vec3.fromValues(0, 0, 0));
    }
    setDefaultAppearance() {
        this.setAmbient(0.2, 0.4, 0.8, 1.0);
        this.setDiffuse(0.2, 0.4, 0.8, 1.0);
        this.setSpecular(0.2, 0.4, 0.8, 1.0);
        this.setShininess(10.0);
    }
    display() {
        // ---- BEGIN Background, camera and axis setup
        // Clear image and depth buffer everytime we update the scene
        this.gl.viewport(0, 0, this.gl.canvas.width, this.gl.canvas.height);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // Initialize Model-View matrix as identity (no transformation
        this.updateProjectionMatrix();
        this.loadIdentity();
        // Apply transformations corresponding to the camera position relative to the origin
        this.applyViewMatrix();
        
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        var sca = [this.scaleFactor, 0.0, 0.0, 0.0,
                    0.0, this.scaleFactor, 0.0, 0.0,
                    0.0, 0.0, this.scaleFactor, 0.0,
                    0.0, 0.0, 0.0, 1.0];

        this.pushMatrix();
        this.multMatrix(sca);

        // ---- BEGIN Primitive drawing section
        
        // DRAW BASE SQUARE
        // Rotation
        var rot = [Math.cos(Math.PI / 4), Math.sin(Math.PI / 4), 0.0, 0.0,
                    -Math.sin(Math.PI / 4), Math.cos(Math.PI / 4), 0.0, 0.0,
                    0.0, 0.0, 1.0, 0.0,
                    0.0, 0.0, 0.0, 1.0];

        // Translation
        var tra = [1.0, 0.0, 0.0, 0.0,
                    0.0, 1.0, 0.0, 0.0, 
                    0.0, 0.0, 1.0, 0.0,
                    0.0, -Math.sqrt(2) / 2, 0.0, 1.0];
        
        this.pushMatrix();
        this.multMatrix(tra);
        this.multMatrix(rot);
        
        if (this.displayDiamond) {
            this.setDiffuse(0,1,0,0);
            this.baseSquare.display();
        }

        this.popMatrix();


        // ORANGE TRIANGLE
        this.pushMatrix();
        this.translate(-Math.sqrt(2), Math.sqrt(2), 0);
        this.rotate(-3 * Math.PI/4, 0, 0, 1);
        this.setDiffuse(1, 128/255, 0, 0);
        this.orangeTriangle.display();
        this.popMatrix()

        // PURPLE AND RED TRIANGLE
        this.pushMatrix();
        this.translate(Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0);
        this.rotate(3 * Math.PI/4, 0, 0, 1);
        this.setDiffuse(204/255, 0, 204/255, 0);
        this.purpleTriangle.display();
        this.setDiffuse(1, 0, 0, 0);
        this.redTriangle.display();
        this.popMatrix();

        // YELLOW PARALLELOGRAM
        this.pushMatrix();
        this.translate(Math.sqrt(2), 0, 0);
        this.rotate(-Math.PI / 4, 0, 0, 1);
        this.scale(-1, 1, 1);
        this.setDiffuse(1, 1, 0, 0);
        this.yellowParallelogram.display();
       
        this.popMatrix();

        // ---- END Primitive drawing section

        this.popMatrix();
    }
}