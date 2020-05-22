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
        this.finhor= new MyFin(this.scene);
        this.finvert= new MyFin(this.scene);
        this.flag = new MyFlag(this.scene);
        
        this.initMaterials();

        this.angle_y=0;
        this.speed=0;
        this.x_pos=0;this.y_pos=0;this.z_pos=0;

        this.automatic=false;
        this.time=0;
        this.slope=0;
        this.center_x=0;this.center_z=0;

        this.accel = 0;

    }
    initNormalVizBuffers(){
        this.sphere.initNormalVizBuffers();
        this.cylinder.initNormalVizBuffers();
        this.propeller1.initNormalVizBuffers();
        this.propeller2.initNormalVizBuffers();
        this.finhor.initNormalVizBuffers();
        this.finvert.initNormalVizBuffers();
        this.flag.initNormalVizBuffers();

    }
    initMaterials(){
        this.body=new CGFappearance(this.scene);
        this.body.setAmbient(0.7,0.7,0.7,1);
        this.body.setDiffuse(0.9,0.9,0.9,1);
        this.body.setDiffuse(0.2,0.2,0.2,1);
        this.body.setShininess(10);
        this.body.loadTexture('images/blimp_body.png');
        this.body.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');

        this.cockpit=new CGFappearance(this.scene);
        this.cockpit.setAmbient(0.7,0.7,0.7,1);
        this.cockpit.setDiffuse(0.9,0.9,0.9,1);
        this.cockpit.setDiffuse(0.2,0.2,0.2,1);
        this.cockpit.setShininess(10);
        this.cockpit.loadTexture('images/cockpit.png');
        this.cockpit.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');

        this.helixes=new CGFappearance(this.scene);
        this.helixes.setAmbient(0.7,0.7,0.7,1);
        this.helixes.setDiffuse(0.9,0.9,0.9,1);
        this.helixes.setDiffuse(0.2,0.2,0.2,1);
        this.helixes.setShininess(10);
        this.helixes.loadTexture('images/helixes.png');
        this.helixes.setTextureWrap('CLAMP_TO_EDGE','CLAMP_TO_EDGE');


    }
    updateBuffers(complexity){
        this.slices = 3 + Math.round(9 * complexity); //complexity varies 0-10, so slices varies 3-93
        this.stacks = 3 + Math.round(9 * complexity);
        this.sphere.updateSlices(this.slices);
        this.sphere.updateStacks(this.stacks);
        this.cylinder.updateSlices(this.slices);
        // reinitialize buffers
        this.initMaterials();
        this.initNormalVizBuffers();
    }

    update(t){
        if (this.time == 0)
            this.time = t / 1000 % 1000;

        this.elapsedTime = (t / 1000 % 1000) - this.time;
        this.time = t / 1000 % 1000;

        if(this.automatic){
            this.autopilotTime += this.elapsedTime;
            this.angle_mov=this.autopilotTime*this.speed;
            this.angle_y = this.angle_y + this.elapsedTime*360/5;
            if (this.angle_y > 360) {
                this.angle_y = this.angle_y % 360;
            }
            this.finvert.setAngle(-this.speed*5);
            this.x_pos = -this.radius * Math.cos(this.angle_mov) + this.center_x;
            this.z_pos = this.radius * Math.sin(this.angle_mov) + this.center_z;
            this.propeller1.setAngle(this.speed/5*t*2.0);
            this.propeller2.setAngle(-this.speed/5*t*2.0);
            this.flag.update(this.speed/5,this.time,this.accel);
        }
        else{
            this.x_pos += this.speed * Math.sin(this.angle_y*Math.PI/180);
            this.z_pos += this.speed * Math.cos(this.angle_y*Math.PI/180);
            this.propeller1.setAngle(this.speed*t*2.0);
            this.propeller2.setAngle(-this.speed*t*2.0);
            this.flag.update(this.speed,this.time,this.accel);
        }
        
        
    }
    turn(v) {
        this.angle_y += v;
        this.finvert.setAngle(-v*5);
        
    }

    accelerate(v) {
        this.accel = v;
        this.speed += v;
        if(this.speed<0){
            this.speed=0;
        }
    }

    reset() {
        this.x_pos = 0;
        this.y_pos = 0;
        this.z_pos = 0;
        this.speed = 0;
        this.angle_y = 0;
        this.automatic=false;
        this.flag.update(this.speed,0);

    }

    setAutomatic(){
        if (!this.automatic) {
            this.automatic=true;
            this.radius=5;
            this.autopilotTime = 0;
            this.speed=2*Math.PI/5;
        
            if(Math.cos(this.angle_y*Math.PI/180)==1){
                this.center_x=this.x_pos+5;
                this.center_z=this.z_pos;
                this.autopilotTime=0;
            }
            else if(Math.cos(this.angle_y*Math.PI/180)==-1){
                this.center_x=this.x_pos-5;
                this.center_z=this.z_pos;
                this.autopilotTime=2.5;
            }
            else if(Math.sin(this.angle_y*Math.PI/180)==1){
                this.center_z=this.z_pos-5;
                this.center_x=this.x_pos;
                this.autopilotTime=1.25;
            }
            else if(Math.sin(this.angle_y*Math.PI/180)==-1){
                this.center_z=this.z_pos+5;
                this.center_x=this.x_pos;
                this.autopilotTime=3.75;
            }
            else{
                this.slope=(Math.sin(this.angle_y*Math.PI/180.0))/(Math.cos(this.angle_y*Math.PI/180.0));

                if(Math.sin(this.angle_y*Math.PI/180.0)>0)
                    this.center_z=this.z_pos-Math.sqrt(25.0/(1.0+1.0/Math.pow(this.slope,2)));
                else
                    this.center_z=this.z_pos+Math.sqrt(25.0/(1.0+1.0/Math.pow(this.slope,2)));
                
                this.center_x=-1.0/(this.slope)*(this.center_z-this.z_pos)+this.x_pos;
                

                if(this.z_pos>this.center_z)
                    this.autopilotTime=(Math.asin((this.x_pos-this.center_x)/this.radius)+Math.PI/2.0)/this.speed;
                else if(this.z_pos<this.center_z)
                    this.autopilotTime=5-(Math.asin((this.x_pos-this.center_x)/this.radius)+Math.PI/2.0)/this.speed;
                
            }
            
        }
        else{
            this.automatic=false;
            this.speed=this.speed/4;
        }
    }
    
    display(){
        this.scene.setAmbient(0.5, 0.5, 0.5, 1);
        this.scene.pushMatrix();
        this.scene.translate(0, 10, 0);
        this.scene.scale(this.scene.scaleFactor,this.scene.scaleFactor,this.scene.scaleFactor);
        

        this.scene.pushMatrix();
        this.scene.translate(this.x_pos, this.y_pos, this.z_pos);
        this.scene.rotate(this.angle_y*Math.PI/180.0, 0, 1, 0);
        //Blimp balloon
        this.scene.pushMatrix();
        this.body.apply();
        this.scene.scale(1,1,2);
        this.sphere.display();
        this.scene.popMatrix();
        
        //Cockpit
        this.scene.pushMatrix();
        this.cockpit.apply();
        this.scene.translate(0,-1,0);
        this.scene.scale(0.20,0.20,1.2);
        this.scene.translate(0,0,-0.5);
        this.scene.rotate(90.0*Math.PI/180.0, 1, 0, 0);
        this.cylinder.display();
        this.scene.popMatrix();

        //Ends of the cockpit
        this.scene.pushMatrix();
        this.scene.translate(0,-1,0.6);
        this.scene.scale(0.20,0.20,0.20);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0,-1,-0.6);
        this.scene.scale(0.20,0.20,0.20);
        this.sphere.display();
        this.scene.popMatrix();

        //Engine
        this.scene.pushMatrix();
        this.helixes.apply();
        this.scene.translate(0.18,-1.02,-0.74);
        this.scene.scale(0.05,0.05,0.1);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.helixes.apply();
        this.scene.translate(0.18,-1.02,-0.84);
        this.propeller1.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.helixes.apply();
        this.scene.translate(-0.18,-1.02,-0.74);
        this.scene.scale(0.05,0.05,0.1);
        this.sphere.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.helixes.apply();
        this.scene.translate(-0.18,-1.02,-0.84);
        this.propeller2.display();
        this.scene.popMatrix();


        //Flight Control Surfaces
        this.cockpit.apply();
        this.scene.pushMatrix();
        this.scene.scale(2,2,2);
        this.scene.rotate(90.0*Math.PI/180.0, 0, 0, 1);

        this.scene.pushMatrix();
        this.scene.translate(-0.35,0,-0.7);
        this.finvert.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.35,0,-0.7);
        this.finvert.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
        this.scene.scale(2,2,2);
        this.scene.pushMatrix();
        this.scene.translate(-0.35,0,-0.7);
        this.finhor.display();
        this.scene.popMatrix();

        this.scene.pushMatrix();
        this.scene.translate(0.35,0,-0.7);
        this.finhor.display();
        this.scene.popMatrix();

        //Flag
        this.scene.pushMatrix();
        this.scene.translate(0,0,-1.8);
        this.flag.display();
        this.scene.popMatrix();

        this.scene.popMatrix();
        this.scene.popMatrix();

    }

    

}

