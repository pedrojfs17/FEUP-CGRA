/**
 * MyDiamond
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyUnitCubeQuad extends CGFobject {
	constructor(scene) {
		super(scene);
        this.quad = new MyQuad(this.scene);
        this.initMaterials(scene);
    }
    initMaterials(scene){
        //left material
        this.left = new CGFappearance(scene);
        this.left.setAmbient(0.9, 0.9, 0.9, 1);
        this.left.setDiffuse(0.1, 0.1, 0.1, 1);
        this.left.setSpecular(0.1, 0.1, 0.1, 1);
        this.left.setShininess(10.0);
        this.left.loadTexture('images/split_cubemap/left.png');
        this.left.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        //right material
        this.right = new CGFappearance(scene);
        this.right.setAmbient(0.9, 0.9, 0.9, 1);
        this.right.setDiffuse(0.0, 0.0, 0.0, 1);
        this.right.setSpecular(0.0, 0.0, 0.0, 1);
        this.right.setShininess(10.0);
        this.right.loadTexture('images/split_cubemap/right.png');
        this.right.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
        
        //front material
        this.front = new CGFappearance(scene);
        this.front.setAmbient(0.9, 0.9, 0.9, 1);
        this.front.setDiffuse(0.0, 0.0, 0.0, 1);
        this.front.setSpecular(0.0, 0.0, 0.0, 1);
        this.front.setShininess(10.0);
        this.front.loadTexture('images/split_cubemap/front.png');
        this.front.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        //back material
        this.back = new CGFappearance(scene);
        this.back.setAmbient(0.9, 0.9, 0.9, 1);
        this.back.setDiffuse(0.0, 0.0, 0.0, 1);
        this.back.setSpecular(0.0, 0.0, 0.0, 1);
        this.back.setShininess(10.0);
        this.back.loadTexture('images/split_cubemap/back.png');
        this.back.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        //top material
        this.top = new CGFappearance(scene);
        this.top.setAmbient(0.9, 0.9, 0.9, 1);
        this.top.setDiffuse(0.0, 0.0, 0.0, 1);
        this.top.setSpecular(0.0, 0.0, 0.0, 1);
        this.top.setShininess(10.0);
        this.top.loadTexture('images/split_cubemap/top.png');
        this.top.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');

        //bottom material
        this.bot = new CGFappearance(scene);
        this.bot.setAmbient(0.9, 0.9, 0.9, 1);
        this.bot.setDiffuse(0.0, 0.0, 0.0, 1);
        this.bot.setSpecular(0.0, 0.0, 0.0, 1);
        this.bot.setShininess(10.0);
        this.bot.loadTexture('images/split_cubemap/bottom.png');
        this.bot.setTextureWrap('CLAMP_TO_EDGE', 'CLAMP_TO_EDGE');
    }
	display() {
        this.scene.pushMatrix();
        this.scene.scale(50,50,50);
        
        // Front
        this.scene.pushMatrix();
        this.front.apply();
        this.scene.translate(0, 0, 0.5);
        this.quad.display();
        this.scene.popMatrix();

        // Back
        this.scene.pushMatrix();
        this.back.apply();
        this.scene.translate(0, 0, -0.5);
        this.scene.rotate(Math.PI, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();
        
        // Right
        this.scene.pushMatrix();
        this.right.apply();
        this.scene.translate(0.5, 0, 0);
        this.scene.rotate(Math.PI / 2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Left
        this.scene.pushMatrix();
        this.left.apply();
        this.scene.translate(-0.5, 0, 0);
        this.scene.rotate(-Math.PI / 2, 0, 1, 0);
        this.quad.display();
        this.scene.popMatrix();
 
        // Top
        this.scene.pushMatrix();
        this.top.apply();
        this.scene.translate(0, 0.5, 0);
        this.scene.rotate(-Math.PI / 2, 1, 0, 0);
        this.quad.display();
        this.scene.popMatrix();

        // Bottom
        this.scene.pushMatrix();
        this.bot.apply();
        this.scene.translate(0, -0.5, 0);
        this.scene.rotate(Math.PI / 2, 1, 0, 0);
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
    updateTexture(){
        if(this.scene.currentTexture==1){
            this.left.loadTexture('images/split_cubemap/left.png');
            this.right.loadTexture('images/split_cubemap/right.png');
            this.front.loadTexture('images/split_cubemap/front.png');
            this.back.loadTexture('images/split_cubemap/back.png');
            this.top.loadTexture('images/split_cubemap/top.png');
            this.bot.loadTexture('images/split_cubemap/bottom.png');
        }
        else if(this.scene.currentTexture==2){
            this.left.loadTexture('images/split_desertmap/left_desert.png');
            this.right.loadTexture('images/split_desertmap/right_desert.png');
            this.front.loadTexture('images/split_desertmap/front_desert.png');
            this.back.loadTexture('images/split_desertmap/back_desert.png');
            this.top.loadTexture('images/split_desertmap/top_desert.png');
            this.bot.loadTexture('images/split_desertmap/bottom_desert.png');
        }
    }
}