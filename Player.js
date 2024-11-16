import { AnimatedObject } from "./AnimatedObject.js";
import { CollisionShape } from "./CollisionShape.js";
import { Rede } from "./Rede.js"
export class Player extends AnimatedObject{
    constructor(canvas, global,rede=0){
        const src = './assets/imgs/passaro.png';
        const rows = 1;
        const columns = 1;
        super(src, rows,  columns)
        this.canvas=canvas
        this.ctx=canvas.getContext('2d')
        this.global=global
        this.scale=.6
        this.lol=false
        this.angle=Math.PI/180
        this.pos = {
            x: this.canvas.height/2+(Math.random() * (200+200)-200),
            y: this.canvas.height/2+(Math.random() * (100+100)-100) 
        }
        this.distX = false
        this.distY= false
        this.speedY= 0
        this.isMoving=true
        this.fit=0
        this.canospeed=0
        this.isBest=false
        this.collisionShape = new CollisionShape(canvas,this.pos.x,this.pos.y,(this.wSprite-100)*this.scale,(this.hSprite-100)*this.scale,this.angle)
        this.life=1
        if(rede!=0){
            this.rede = new Rede({
                header:'child',
                rede:rede
            })
        }else{
            this.rede = new Rede({
                header:'first',
                entrada: 4,
                hidden: [6],
                saida: 3
            })
        }
    }
    frente(){
        if(this.life>0){
            this.pos.x+=this.global.speed
            this.fit+=this.global.speed
        }
    }
    tras(){
        if(this.life>0){
            this.pos.x-=this.global.speed
            this.fit-=this.global.speed
        }
    }
    pulo(){
        if(this.pos.x>0&&this.life>0){
            this.speedY=-8
        }
    }
    #move(){
        this.speedY+=this.global.gravity
        // if(this.angle<Math.PI/180*0&&this.speedY>0){
        //     this.angle+=this.speedY/100
        // }
        // if(this.angle>Math.PI/180*-0&&this.speedY<0){
        //     this.angle+=this.speedY/30
        // }
        this.pos.y+=this.speedY
        if(this.pos.y>this.canvas.height){
            this.pos.y=this.canvas.height
            this.speedY=0
        }
    }
    draw(){
        let kkk = false
        if(this.distX!==false&&this.distY!==false){
            let result = this.rede.execute([this.distX, this.distY, this.canospeed, this.pos.x])
            if(result[0].valor>0){
                this.pulo()
            }
            if(result[1].valor>0){
                this.frente()
            }
            if(result[2].valor>0){
                this.tras()
            }
        }
        if(this.isMoving){
            this.#move()
        }
        if(this.life<=0){
            this.pos.x-=this.global.speed
            
        }
        this.collisionShape.update(this.pos.x,this.pos.y,(this.wSprite-20)*this.scale,(this.hSprite-20)*this.scale,this.angle)
        this.ctx.beginPath();
        this.ctx.save()
        this.ctx.translate(this.pos.x,this.pos.y)
        if(this.life>0){
            this.fit+=this.global.speed*1.1
            if(this.pos.x<50||this.pos.x>this.canvas.width-100){
                this.life=0
            }
            
        }else{
                this.global.players.splice(this.global.players.indexOf(this),1)
                kkk = true

        }
        if(this.isBes||true){
            this.ctx.rotate(this.angle)
            this.ctx.drawImage(this.image,this.posIniX,this.posIniY,this.wSprite,this.hSprite,this.wSprite/-2*this.scale,this.hSprite/-2*this.scale,this.wSprite*this.scale,this.hSprite*this.scale)
        }
        // if(this.global.mortos.includes(this)){
        //     this.ctx.fillRect(0,0,50,50)
        // }
        
        this.ctx.restore()
        this.collisionShape.draw('#0f0')
        if(kkk){
            return 'kkk'
        }
    }
    drawBest(){
        this.ctx.beginPath();
        this.ctx.save()
        if(this.isBest){
            this.ctx.filter='brightness(0)'
        }
        this.ctx.translate(this.pos.x,this.pos.y)
        this.ctx.rotate(this.angle)
        this.ctx.drawImage(this.image,this.posIniX,this.posIniY,this.wSprite,this.hSprite,this.wSprite/-2*this.scale,this.hSprite/-2*this.scale,this.wSprite*this.scale,this.hSprite*this.scale)
        this.ctx.restore()
    }
}