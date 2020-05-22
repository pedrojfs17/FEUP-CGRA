/**
* MyFin
* @constructor
*/
class MyFin extends CGFobject {
    constructor(scene) {
        super(scene);
        this.quad = new MyQuadDSided(this.scene);
        this.triangle = new MyTriangle(this.scene);
        this.quad.initBuffers();
        this.triangle.initBuffers();
        this.angle=0;

    }
    initNormalVizBuffers(){
        this.quad.initNormalVizBuffers();
        this.triangle.initNormalVizBuffers();
    }
    
    setAngle(angle){
        this.angle= angle*Math.PI/180;
    }
    
    display(){

        this.scene.pushMatrix();
        this.scene.rotate(this.angle,1,0,0);
        this.scene.translate(0,0,-0.4);

        this.scene.pushMatrix();
        this.scene.rotate(90.0*Math.PI/180.0, 1, 0, 0);
        this.scene.scale(0.4,0.4,0.4);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0,0.2);
        this.scene.scale(0.141,0.141,0.141);
        this.scene.rotate(135.0*Math.PI/180.0, 0, 1, 0);
        this.scene.rotate(90.0*Math.PI/180.0, 1, 0, 0);
        this.triangle.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
        
    }

}