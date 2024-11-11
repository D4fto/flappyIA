import { Collision } from "./Collision.js";

export class CollisionShape {
    constructor(canvas,x,y,w,h,a) {
        this.canvas=canvas
        this.ctx=this.canvas.getContext('2d')
        this.Collision=Collision
        this.pos={
            x:x,
            y:y
        }
        this.size={
            width: w,
            height: h
        }
        this.angle=a
    }
    update(x,y,w,h,a){
        this.pos={
            x:x,
            y:y
        }
        this.size={
            width: w,
            height: h
        }
        this.angle=a
    }
    verifyCollision(x,y,w,h,a){
        return this.Collision.isCollidingRect(
            { 
                x: this.pos.x, 
                y: this.pos.y, 
                width: this.size.width, 
                height: this.size.height, 
                angle: this.angle 
            },
            { 
                x: x, 
                y: y, 
                width: w, 
                height: h, 
                angle: a 
            }
            
        )
    }
    draw(color){
        // this.ctx.save(); 
        // this.ctx.translate(this.pos.x, this.pos.y); 
        // this.ctx.rotate(this.angle); 
        // this.ctx.translate(-this.size.width / 2, -this.size.height / 2); 
        // this.ctx.strokeStyle = color;
        // this.ctx.lineWidth = 4;
        // this.ctx.strokeRect(0, 0, this.size.width, this.size.height);
        // this.ctx.restore(); 
    }
}