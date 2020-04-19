/**
* MyPyramid
* @constructor
*/
class MyVehicle extends CGFobject {
    constructor(scene, slices, stacks) {
        super(scene);
        this.slices = slices;
        this.stacks = stacks;
        this.sphere= new MySphere(this.scene, this.slices, this.stacks);
        this.cylinder= new MyCylinder(this.scene, this.slices);
        this.propeller1 = new MyPropeller(this.scene);
        this.propeller2 = new MyPropeller(this.scene);
        this.finhor1= new MyFin(this.scene);
        this.finhor2= new MyFin(this.scene);
        this.finvert1= new MyFin(this.scene);
        this.finvert2= new MyFin(this.scene);
        this.initBuffers();

        this.angle_y=0;
        this.speed=0;
        this.x_pos=0;this.y_pos=0;this.z_pos=0;


        this.automatic=false;
        this.time=0;
        this.slope=0;
        this.center_x=0;this.center_z=0;

    }
    /*
    initBuffers() {
        this.vertices = [];
        this.indices = [];
        this.normals = [];

        var ang = 0;
        var alphaAng = 2*Math.PI/this.slices;

        for(var i = 0; i < this.slices; i++){
            // All vertices have to be declared for a given face
            // even if they are shared with others, as the normals 
            // in each face will be different

            var sa=Math.sin(ang);
            var saa=Math.sin(ang+alphaAng);
            var ca=Math.cos(ang);
            var caa=Math.cos(ang+alphaAng);

            this.vertices.push(0,2,0);
            this.vertices.push(ca, 0, -sa);
            this.vertices.push(caa, 0, -saa);

            // triangle normal computed by cross product of two edges
            var normal= [
                saa-sa,
                ca*saa-sa*caa,
                caa-ca
            ];

            // normalization
            var nsize=Math.sqrt(
                normal[0]*normal[0]+
                normal[1]*normal[1]+
                normal[2]*normal[2]
                );
            normal[0]/=nsize;
            normal[1]/=nsize;
            normal[2]/=nsize;

            // push normal once for each vertex of this triangle
            this.normals.push(...normal);
            this.normals.push(...normal);
            this.normals.push(...normal);

            this.indices.push(3*i, (3*i+1) , (3*i+2) );

            ang+=alphaAng;
        }

        this.primitiveType = this.scene.gl.TRIANGLES;
        this.initGLBuffers();
    }*/
    
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-10, so slices varies 3-93
        this.stacks = 3 + Math.round(9*complexity);
        this.sphere.updateSlices(this.slices);
        this.sphere.updateStacks(this.stacks);
        this.cylinder.updateSlices(this.slices);
        // reinitialize buffers
        this.initBuffers();
        this.initNormalVizBuffers();
    }

    update(t){
        if(this.automatic){
            this.time=t / 1000 % 1000;
            this.radius=5;
            this.speed=2*Math.PI/5;
            this.angle_y=this.time*72;
            this.finvert1.setAngle(-this.speed*5);
            this.finvert2.setAngle(-this.speed*5);
            this.x_pos=this.radius*Math.sin(this.time*this.speed)+this.center_x;
            this.z_pos = this.radius * Math.cos(this.time*this.speed)+this.center_z;
        }
        else{
            this.x_pos += this.speed * Math.sin(this.angle_y*Math.PI/180);
            this.z_pos += this.speed * Math.cos(this.angle_y*Math.PI/180);
        }
        
        this.propeller1.setAngle(this.speed*t);
        this.propeller2.setAngle(-this.speed*t);
        
        
    }

    turn(v) {
        this.angle_y += v;
        this.finvert1.setAngle(-v*5);
        this.finvert2.setAngle(-v*5);
        
    }

    accelerate(v) {
        this.speed += v;
    }

    reset() {
        this.x_pos = 0;
        this.y_pos = 0;
        this.z_pos = 0;
        this.speed = 0;
        this.angle_y = 0;
        this.automatic=false;

    }

    setAutomatic(){
        this.automatic=!this.automatic;
        if(!this.automatic){
            this.reset();
        }
        else{
            this.time=0;
            if(Math.sin(this.angle_y*Math.PI/180)==0){
                this.center_x=this.x_pos+5;
                this.center_z=this.z_pos;
            }
            else if(Math.cos(this.angle_y*Math.PI/180)==0){
                this.center_z=this.z_pos+5;
                this.center_x=this.x_pos;
            }
            else{
                this.slope=(this.speed * Math.cos(this.angle_y*Math.PI/180))/(this.speed * Math.sin(this.angle_y*Math.PI/180));
                this.center_x=this.x_pos-Math.sqrt(25/(1+1/Math.pow(this.slope,2)));
                this.center_z=this.slope*(this.center_x-this.x_pos)+this.z_pos;
            }
            console.log(this.center_x);
            console.log(this.center_z);
        }
        
        
    }
    
    display(){

        this.scene.setDiffuse(0,0,1);
        this.scene.setSpecular(0, 0, 0, 1);
        this.scene.setAmbient(0, 0, 0.5, 1);
        this.scene.pushMatrix();
        this.scene.translate(this.x_pos, this.y_pos, this.z_pos);
        this.scene.rotate(this.angle_y*Math.PI/180.0, 0, 1, 0);
        //Blimp balloon
        this.scene.pushMatrix();
        this.scene.scale(0.5,0.5,1);
        this.sphere.display();
        this.scene.popMatrix();
        
        //Cockpit
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0);
        this.scene.scale(0.10,0.10,0.6);
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(90.0*Math.PI/180.0, 1, 0, 0);
        this.cylinder.display();
        this.scene.popMatrix();

        //Ends of the cockpit
        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,0.3);
        this.scene.scale(0.10,0.10,0.10);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,-0.5,-0.3);
        this.scene.scale(0.10,0.10,0.10);
        this.sphere.display();
        this.scene.popMatrix();

        //Engine
        this.scene.pushMatrix();
        this.scene.translate(0.09,-0.51,-0.37);
        this.scene.scale(0.025,0.025,0.05);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.09,-0.51,-0.42);
        this.propeller1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.09,-0.51,-0.37);
        this.scene.scale(0.025,0.025,0.05);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.09,-0.51,-0.42);
        this.propeller2.display();
        this.scene.popMatrix();


        //Flight Control Surfaces
        this.scene.pushMatrix();
        this.scene.rotate(90.0*Math.PI/180.0, 0, 0, 1);

        this.scene.pushMatrix();
        this.scene.translate(-0.35,0,-0.7);
        this.finvert1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.35,0,-0.7);
        this.finvert2.display();
        this.scene.popMatrix();

        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(-0.35,0,-0.7);
        this.finhor1.display();
        this.scene.popMatrix();


        this.scene.pushMatrix();
        this.scene.translate(0.35,0,-0.7);
        this.finhor2.display();
        this.scene.popMatrix();

        this.scene.popMatrix();


    }

    

}

