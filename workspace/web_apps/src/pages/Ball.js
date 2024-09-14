const GRAVITY = 0.6;


export class Ball {
    constructor(name, img, x, y, radius) {
        this.name = name;
        this.img = img;
        this.image=null;
        this.x = x;
        this.y = y;
        this.px = x;
        this.py = y;
        this.fx = 0;
        this.fy = 0;
        this.radius = radius;
        this.load = false;
    }


    apply_force(delta) {
        delta *= delta;
        this.fy += GRAVITY;
        this.x += this.fx * delta;
        this.y += this.fy * delta;
        this.fx = this.fy = 0;
    }

    verlet() {
        var nx = (this.x * 2) - this.px;
        var ny = (this.y * 2) - this.py;
        this.px = this.x;
        this.py = this.y;
        this.x = nx;
        this.y = ny;
    }

    draw(ctx) {
        ctx.beginPath();
        if(this.load){
            ctx.drawImage(this.image,this.radius,this.radius);
        }else{
            ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        }
        ctx.fill();
    }
}

