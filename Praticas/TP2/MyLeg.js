/**
 * MyLeg
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyLeg extends CGFobject {
	constructor(scene) {
        super(scene);
        this.cube = new MyUnitCube(scene);
	}
    
    display() {
        this.scene.pushMatrix();
        this.scene.scale(0.75, 5, 0.75);
        this.cube.display();
        this.scene.popMatrix();
    }
}