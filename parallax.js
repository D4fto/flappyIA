import { AnimatedObject } from "./AnimatedObject.js";
export class Parallax extends AnimatedObject{
    constructor(src, speed, height,canvas, global){
        const rows = 1;
        const columns = 1;
        super(src, rows, columns)
        this.x1 = 0 
        this.x2 = canvas.width 
        this.canvas = canvas
        this.ctx = this.canvas.getContext('2d')
        this.speed = speed
        this.global = global
        this.height = height
        this.y = canvas.height-height
    }
    #move(){
        this.x1-=this.global.speed*this.speed
        this.x2-=this.global.speed*this.speed
        if(this.x1+this.canvas.width<=0){
            this.x1+= this.canvas.width*2
        }
        if(this.x2+this.canvas.width<=0){
            this.x2+= this.canvas.width*2
        }
        this.y = this.canvas.height-this.height
    }
    draw(){
        this.#move()
        this.ctx.drawImage(this.image,this.posIniX,this.posIniY,this.wSprite,this.hSprite,this.x1,this.y,this.canvas.width,this.height)
        this.ctx.drawImage(this.image,this.posIniX,this.posIniY,this.wSprite,this.hSprite,this.x2,this.y,this.canvas.width,this.height)
    }
}