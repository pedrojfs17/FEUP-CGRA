/**
* MyPropeller
* @constructor
*/
class MyPropeller extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quad = new MyQuadDSided(this.scene);
        this.quad.initBuffers();
        this.angle=0;

    }
    initNormalVizBuffers(){
        this.quad.initNormalVizBuffers();
    }
    
    setAngle(angle){
        this.angle= angle*Math.PI/180;
    }
    
    display(){

        this.scene.pushMatrix();
        this.scene.rotate(this.angle,0,0,1);
        this.scene.scale(0.08,0.01,1);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.rotate(this.angle,0,0,1);
        this.scene.scale(0.01,0.08,1);
        this.quad.display();
        this.scene.popMatrix();
        
    }

}