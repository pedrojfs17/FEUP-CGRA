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

        this.setUpdatePeriod(50);
        
        this.enableTextures(true);

        this.slices=16;
        this.stacks=8;
        
        //Initialize scene objects
        this.axis = new CGFaxis(this);
        this.vehicle = new MyVehicle(this,this.slices,this.stacks);
        this.objects=[
            new MySphere(this, this.slices, this.stacks),
            new MyCylinder(this, this.slices),
            new MyUnitCubeQuad(this),
        ];
        this.objectList={
            'Sphere' : 0,
            'Cylinder': 1,
            'Cube':2,
        };

        //Objects connected to MyInterface
        this.displayAxis = true;
        this.displayObject = false;
        this.displayNormals = false;
        this.displayVehicle=false;
        this.currentTexture=-1;
        this.currentObject=0;
        this.complexity=0.0;
        this.speedFactor=1;
        this.scaleFactor=1;
        //Material
        this.material=new CGFappearance(this);
        this.material.setAmbient(0.7,0.7,0.7,1);
        this.material.setDiffuse(0.9,0.9,0.9,1);
        this.material.setDiffuse(0.2,0.2,0.2,1);
        this.material.setShininess(10);
        this.material.loadTexture('images/earth.jpg');
        this.material.setTextureWrap('REPEAT','REPEAT');

        //Textures
        this.textures=[
            new CGFtexture(this,'images/earth.jpg'),
            new CGFtexture(this,'images/cubemap.jpg'),
            new CGFtexture(this,'images/desert.png'),
        ];
        this.textureList={
            'Earth':0,
            'Cubemap':1,
            'Desert':2,
        };
    }
    initLights() {
        this.setGlobalAmbientLight(0.5, 0.5, 0.5, 1.0);
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
    updateObject(){
        this.objects[this.currentObject];
    }
    updateTexture(){
        if(this.currentObject!=2)
            this.material.setTexture(this.textures[this.currentTexture]);
        else{
            this.objects[this.currentObject].updateTexture();
        }
    }
    checkKeys(t){
        var text="Keys pressed: ";
        var keysPressed=false;

        if(this.gui.isKeyPressed("KeyP")){
            text+=" P ";
            this.vehicle.setAutomatic();
            keysPressed=true;
        }
        if(!this.vehicle.automatic){
            if(this.gui.isKeyPressed("KeyW")){
                text+=" W ";
                this.vehicle.accelerate(0.3*this.speedFactor);
                keysPressed=true;
            }
            if(this.gui.isKeyPressed("KeyS")){
                text+=" S ";
                this.vehicle.accelerate(-0.3*this.speedFactor);
                keysPressed=true;
            }
            if(this.gui.isKeyPressed("KeyA")){
                text+=" A ";
                this.vehicle.turn(5);
                keysPressed=true;
            }
            if(this.gui.isKeyPressed("KeyD")){
                text+=" D ";
                this.vehicle.turn(-5);
                keysPressed=true;
            }
        }
        
        if (this.gui.isKeyPressed("KeyR")) {
            text+=" R "
            this.vehicle.reset();
            keysPressed = true;
        }

        if(keysPressed){
            console.log(text);
        }
        else{
            if(!this.vehicle.automatic)
                this.vehicle.turn(0);
        }
    }
    // called periodically (as per setUpdatePeriod() in init())
    update(t){
        this.checkKeys(t);
        this.vehicle.update(t);
        //To be done...
    }

    updateComplexity(){
        this.vehicle.updateBuffers(this.complexity);
    }
    updateSlices(){
        this.objects[this.currentObject].updateSlices(this.slices);
    }

    updateStacks(){
        this.objects[this.currentObject].updateStacks(this.stacks);
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
        
        //this.cylinderSlices=this.cylinderSlices;
        // Draw axis
        if (this.displayAxis)
            this.axis.display();

        this.setDefaultAppearance();

        // ---- BEGIN Primitive drawing section
        this.pushMatrix();

        

        //This sphere does not have defined texture coordinates
        //this.incompleteSphere.display();
        if (this.displayNormals)
            this.objects[this.currentObject].enableNormalViz();
        else
            this.objects[this.currentObject].disableNormalViz();
        
        if (this.displayObject){
            this.material.apply();
            this.objects[this.currentObject].display();
        }

        if(this.displayVehicle){
            this.scale(this.scaleFactor,this.scaleFactor,this.scaleFactor);
            this.vehicle.display();
        }
        
        this.popMatrix();
        // ---- END Primitive drawing section
    }
}