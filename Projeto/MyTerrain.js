/**
* MyTerrain
* @constructor
*/
class MyTerrain extends CGFobject {
    constructor(scene) {
        super(scene);
        this.plane = new MyPlane(this.scene,20);
        this.plane.initBuffers();
        
        this.shader=new CGFshader(this.scene.gl, "shaders/terrain.vert", "shaders/terrain.frag");
        this.texture1=new CGFtexture(this.scene,'images/mountain1.jpg');
        this.texture2=new CGFtexture(this.scene,'images/desert.jpg');
        this.map=new CGFtexture(this.scene,'images/heightmap1.jpg');
        
        this.shader.setUniformsValues({ uSampler1: 1 });
        this.shader.setUniformsValues({ uSampler2: 2 }); 
    }
    display(){
        
        this.scene.setActiveShader(this.shader);
        if(this.scene.currentTexture==1){
            this.texture1.bind(1);
        }
        else{
            this.texture2.bind(1);
        }
        this.map.bind(2);

        this.scene.pushMatrix();
        
        this.scene.pushMatrix();
        this.scene.rotate(-90.0*Math.PI/180.0, 1, 0, 0);
        this.scene.scale(50,50,8);
        this.plane.display();

        this.scene.popMatrix();
    }

}