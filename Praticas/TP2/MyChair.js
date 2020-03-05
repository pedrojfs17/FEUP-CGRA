/**
 * MyChair
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyChair extends CGFobject {
	constructor(scene) {
        super(scene);
        this.FLLeg = new MyLeg(scene);
        this.FRLeg = new MyLeg(scene);
        this.BLLeg = new MyLeg(scene);
        this.BRLeg = new MyLeg(scene);
        this.top = new MyUnitCube(scene);
        this.back = new MyUnitCube(scene);
	}
    
    display() {
        // Resize
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,0.5);

        // Put the center on the ground
        this.scene.pushMatrix();
        this.scene.translate(0, 5, 0);

        // Top
        this.scene.pushMatrix();
        this.scene.scale(10, 1.5, 10);
        this.top.display();
        this.scene.popMatrix();

        // Back
        this.scene.pushMatrix();
        this.scene.translate(0, 8.25, -4.5);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
        this.scene.scale(10, 1, 15);
        this.back.display();
        this.scene.popMatrix();

        // Front Left
        this.scene.pushMatrix();
        this.scene.translate(-4.5, -2.75, 4.5);
        this.FLLeg.display();
        this.scene.popMatrix();

        // Front Right
        this.scene.pushMatrix();
        this.scene.translate(4.5, -2.75, 4.5);
        this.FRLeg.display();
        this.scene.popMatrix();

        // Back Left
        this.scene.pushMatrix();
        this.scene.translate(-4.5, -2.75, -4.5);
        this.BLLeg.display();
        this.scene.popMatrix();

        // Back Right
        this.scene.pushMatrix();
        this.scene.translate(4.5, -2.75, -4.5);
        this.BRLeg.display();
        this.scene.popMatrix();

        // Put the center on the ground
        this.scene.popMatrix();

        // Resize
        this.scene.popMatrix();

    }
}