/**
 * MyBox
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyBox extends CGFobject {
	constructor(scene) {
		super(scene);
        this.quad = new MyQuad(this.scene);
        
        this.initMaterials(scene);
    }
    initMaterials(scene){
        //wooden material
        this.wooden = new CGFappearance(scene);
        this.wooden.setAmbient(0.9, 0.9, 0.9, 1);
        this.wooden.setDiffuse(0.1, 0.1, 0.1, 1);
        this.wooden.setSpecular(0.1, 0.1, 0.1, 1);
        this.wooden.setShininess(10.0);
        this.wooden.loadTexture('images/wood.png');
        this.wooden.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        //wooden material
        this.land = new CGFappearance(scene);
        this.land.setAmbient(0.9, 0.9, 0.9, 1);
        this.land.setDiffuse(0.1, 0.1, 0.1, 1);
        this.land.setSpecular(0.1, 0.1, 0.1, 1);
        this.land.setShininess(10.0);
        this.land.loadTexture('images/box_land.png');
        this.land.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }
	display(landed) {
        this.scene.pushMatrix();
        this.scene.scale(1,1,1);
        
        if(!landed)
            this.wooden.apply();
        else
            this.land.apply();
        // Front
        this.scene.pushMatrix();
        this.scene.translate(0, 0, 0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Back
        this.scene.pushMatrix();
        this.scene.translate(0, 0, -0.5);
        this.quad.display();
        this.scene.popMatrix();

        // Right
        this.scene.pushMatrix();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Left
        this.scene.pushMatrix();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Top
        this.scene.pushMatrix();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Bottom
        this.scene.pushMatrix();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
    }
    enableNormalViz(){
        this.quad.enableNormalViz()
    }
    disableNormalViz(){
        this.quad.disableNormalViz();
    }
}