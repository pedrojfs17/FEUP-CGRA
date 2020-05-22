/**
 * MyFlag
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MyFlag extends CGFobject {
	constructor(scene) {
		super(scene);
        this.f= new MyPlane(this.scene,60);
        this.support=new MyQuadDSided(this.scene);
        this.shader=new CGFshader(this.scene.gl, "shaders/flag.vert", "shaders/flag.frag");
        this.shader_inverted = new CGFshader(this.scene.gl, "shaders/flagi.vert", "shaders/flag.frag");
        this.texture=new CGFtexture(this.scene,'images/flag.png');

        this.shader.setUniformsValues({ uSampler1: 1 });
        this.shader.setUniformsValues({ speed: 0 });
        this.shader.setUniformsValues({ timeFactor: 0 });

        this.shader_inverted.setUniformsValues({ uSampler1: 1 });
        this.shader_inverted.setUniformsValues({ speed: 0 });
        this.shader_inverted.setUniformsValues({ timeFactor: 0 });

    }
    update(sp, tf, accel){
        this.shader.setUniformsValues({ speed: sp });
        this.shader.setUniformsValues({ timeFactor: tf });
        this.shader.setUniformsValues({ acceleration: accel});

        this.shader_inverted.setUniformsValues({ speed: sp });
        this.shader_inverted.setUniformsValues({ timeFactor: tf });
        this.shader_inverted.setUniformsValues({ acceleration: accel});
        
    }
    display(){
        
        this.scene.pushMatrix();
        
        this.scene.setActiveShader(this.scene.defaultShader);
        this.scene.pushMatrix();
        this.scene.translate(0,-0.107,0.47);
        this.scene.rotate(75.0*Math.PI/180.0,1,0,0);
        this.scene.rotate(90.0*Math.PI/180.0,0,1,0);
        this.scene.scale(0.025,1,1);
        this.support.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,0.107,0.47);
        this.scene.rotate(-75.0*Math.PI/180.0,1,0,0);
        this.scene.rotate(90.0*Math.PI/180.0,0,1,0);
        this.scene.scale(0.025,1,1);
        this.support.display();
        this.scene.popMatrix();
        
        this.scene.setActiveShader(this.shader);
        this.scene.scale(1,0.5,1);

        
        this.texture.bind(1);
        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(-90.0*Math.PI/180.0, 0, 1, 0);
        this.f.display();
        this.scene.popMatrix(); 
        
        this.scene.setActiveShader(this.shader_inverted);
        this.scene.pushMatrix();
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(90.0*Math.PI/180.0, 0, 1, 0);
        this.f.display();
        this.scene.popMatrix(); 

        this.scene.popMatrix(); 
        this.scene.setActiveShader(this.scene.defaultShader);
    }
    initNormalVizBuffers(){
        this.f.initNormalVizBuffers();
        this.support.initNormalVizBuffers();
    }
}