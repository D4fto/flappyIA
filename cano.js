import { AnimatedObject } from "./AnimatedObject.js";
import { CollisionShape } from "./CollisionShape.js";
export class Cano extends AnimatedObject{
    constructor(canvas, global){
        const src = './assets/imgs/cano_1.png';
        const rows = 1;
        const columns = 1;
        super(src, rows,  columns)
        this.canvas=canvas
        this.ctx=canvas.getContext('2d')
        this.global=global
        this.scale=.7
        this.tamHole = 150
        this.speedy=Math.random() * (6 + 6) - 6
        this.speedy=0
        this.pos = {
            x: this.canvas.width + 400,
            y: Math.random() * (canvas.height-330 - 250) + 250
        }
        this.col1 = new CollisionShape(canvas,this.pos.x+this.wSprite*this.scale,this.pos.y-this.hSprite*this.scale/2-this.tamHole*this.scale,this.wSprite*this.scale,this.hSprite*this.scale,0)
        this.col2 = new CollisionShape(canvas,this.pos.x+this.wSprite*this.scale,this.pos.y+this.hSprite*this.scale/2+this.tamHole*this.scale,this.wSprite*this.scale,this.hSprite*this.scale,0)
    }
    #move(){
        this.pos.x -= this.global.speed
        this.pos.y+=this.speedy
        if(this.pos.y>canvas.height-330||this.pos.y<250){
            this.speedy*=-1
        }
        this.col1.update(this.pos.x+this.wSprite*this.scale,this.pos.y-this.hSprite*this.scale/2-this.tamHole*this.scale,this.wSprite*this.scale,this.hSprite*this.scale,0)
        this.col2.update(this.pos.x+this.wSprite*this.scale,this.pos.y+this.hSprite*this.scale/2+this.tamHole*this.scale,this.wSprite*this.scale,this.hSprite*this.scale,0)
    }
    draw(){
        this.#move()
        
        this.ctx.save()
        this.ctx.drawImage(this.image,this.posIniX,this.posIniY,this.wSprite,this.hSprite,this.pos.x+this.wSprite*this.scale/2,this.pos.y-this.hSprite*this.scale-this.tamHole*this.scale,this.wSprite*this.scale,this.hSprite*this.scale)
        this.ctx.translate(this.pos.x + this.wSprite * this.scale / 2, this.pos.y + this.tamHole*this.scale+this.hSprite*this.scale)
        this.ctx.rotate(Math.PI)
        this.ctx.drawImage(
            this.image,
            this.posIniX, this.posIniY,
            this.wSprite, this.hSprite,
            -this.wSprite * this.scale, 0,
            this.wSprite * this.scale,
            this.hSprite * this.scale
        )
        this.ctx.restore()
        this.col1.draw('#f00')
        this.col2.draw('#00f')
    }
}