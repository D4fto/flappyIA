export class Global{
    constructor(){
        this.speedIni=10
        this.speed=this.speedIni
        this.gravity=.5
        this.canos = []
        this.parallaxs = []
        this.players=[]
        this.mortos=[]
    }
    updateCanos(){
        for (let i = 0; i < this.canos.length; i++) {
            const cano = this.canos[i];
            if(cano.pos.x<0-cano.wSprite*2){
                this.canos.splice(i,1)
                i-=1
            }
            cano.draw()
        }
    }
}