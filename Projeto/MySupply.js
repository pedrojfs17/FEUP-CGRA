const SupplyStates = {
    INACTIVE:0,
    FALLING:1,
    LANDED:2
};

/**
 * MySupply
 * @constructor
 * @param scene - Reference to MyScene object
 */
class MySupply extends CGFobject {
	constructor(scene) {
		super(scene);
        this.box = new MyBox(this.scene);
        this.state=SupplyStates.INACTIVE;
        this.x_pos=0;
        this.y_pos=8.5;
        this.z_pos=0;
        this.dropTime=0;
    }
    update(t){
        if (this.time == 0)
            this.time = t / 1000 % 1000;

        this.elapsedTime = (t / 1000 % 1000) - this.time;
        this.time = t / 1000 % 1000;
        
        if (this.state == SupplyStates.FALLING){
            this.dropTime += this.elapsedTime;
            this.y_pos -= (this.elapsedTime * (8.5/3.0));
            if(this.y_pos <= 0.5)
                this.land();
        }
    }
    dropSupply(x,z){
        this.state=SupplyStates.FALLING;
        this.x_pos=x;
        this.z_pos=z;
    }
    land(){
        this.y_pos=0.5;
        this.state=SupplyStates.LANDED;
    }
    display(){
        if(this.state!=SupplyStates.INACTIVE){
            this.scene.pushMatrix();
            this.scene.translate(this.x_pos,this.y_pos,this.z_pos);
            if(this.state==SupplyStates.FALLING)
                this.box.display(false);
            if(this.state==SupplyStates.LANDED)
                this.box.display(true);
            this.scene.popMatrix();
        }
        
    }
}