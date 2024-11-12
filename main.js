
import { Cano } from "./cano.js"
import { Parallax } from "./parallax.js"
import { Global } from "./global.js"
import { CollisionShape } from "./CollisionShape.js"
import { Player } from "./Player.js"
import { Rede } from "./Rede.js"

const oo = document.getElementById('oo')
const canvas = document.getElementById('canvas')
const ctx = canvas.getContext('2d')
let global = new Global()
var spawner
let gen =1 
const step = 5
let contagenspawn=0
function spawnar(){

    global.canos.push(new Cano(canvas,global))
    contagenspawn=0
}
const chao = new Parallax("./assets/imgs/chao.png",1,80,canvas,global)
global.parallaxs.push(chao)
const chaoCollision = new CollisionShape(canvas,canvas.width/2,canvas.height-40,canvas.width,80,0)
const arbusto = new Parallax("./assets/imgs/arbusto.png",.5,600,canvas,global)
global.parallaxs.push(arbusto)
const cidade = new Parallax("./assets/imgs/cidade.png",.3,600,canvas,global)
global.parallaxs.push(cidade)
const nuvem = new Parallax("./assets/imgs/nuvem.png",.1,600,canvas,global)
global.parallaxs.push(nuvem)

let numberOfMutation = 50
let bests = []

let population = 1000
for (let i = 0; i < population; i++) {
    global.players.push(new Player(canvas,global))   
}
redimensionar()


function redimensionar(){
    canvas.height=window.innerHeight
    canvas.width=window.innerWidth
    for (const element of global.parallaxs) {
        element.x1 = 0 
        element.x2 = canvas.width 
    }
    chaoCollision.update(canvas.width/2,canvas.height-40,canvas.width,80,0)
}
spawnar()
// global.canos.push(new Cano(canvas,global))
window.addEventListener('load',()=>{
    window.requestAnimationFrame(main)
})
function main(){
    contagenspawn+=1
    if(contagenspawn>60){
        spawnar()
    }
    ctx.clearRect(0,0,canvas.width,canvas.height)
    nuvem.draw()
    cidade.draw()
    arbusto.draw()
    let best = -1
    let bestPlayer = null
    for (let i = 0; i < global.players.length; i++) {
        const player = global.players[i];
        if(player.draw() === 'kkk'){
            i--
            global.mortos.push(player)
        }
        if(player.fit>best){
            best = player.fit
            bestPlayer = player
            player.isBest = true
        }
        // if(global.players.length==5 && bests.length==0){
        //     for (const element of global.players) {
        //         bests.push(element)
        //     }
        // }
    }
    global.updateCanos()
    chao.draw()
    chaoCollision.draw('#00f')
    // console.log(global.players)
    for (const player of global.players) {
        let distX = canvas.width+500
        for (const cano of global.canos) {
            if(cano.pos.x-player.pos.x<distX&&cano.pos.x-player.pos.x>cano.wSprite*-2.1*cano.scale){
                player.distX=cano.col1.pos.x-player.pos.x
                distX = player.distX
                player.distY=cano.pos.y-player.pos.y
                player.canospeed=cano.speedy
            }
            if(player.collisionShape.verifyCollision(cano.col1.pos.x,cano.col1.pos.y,cano.col1.size.width,cano.col1.size.height,cano.col1.angle)||player.collisionShape.verifyCollision(cano.col2.pos.x,cano.col2.pos.y,cano.col2.size.width,cano.col2.size.height,cano.col2.angle)){
                player.life = 0
                
            } 
        }
        if(player.pos.y<=-10){
            player.life = 0
        }
        if(player.collisionShape.verifyCollision(chaoCollision.pos.x,chaoCollision.pos.y,chaoCollision.size.width,chaoCollision.size.height,chaoCollision.angle)&&player.isMoving){
            player.life = 0
            player.isMoving=false
            player.pos.y+=10
            
        }
        
    }
    // ctx.beginPath()
    // ctx.moveTo(bestPlayer.pos.x,bestPlayer.pos.y)
    // ctx.strokeStyle = '#00f'
    // ctx.lineTo(bestPlayer.pos.x+bestPlayer.distX,bestPlayer.pos.y)
    // ctx.stroke()
    // ctx.beginPath()
    // ctx.moveTo(bestPlayer.pos.x+bestPlayer.distX,bestPlayer.pos.y)
    // ctx.strokeStyle = '#f00'
    // ctx.lineTo(bestPlayer.pos.x+bestPlayer.distX,bestPlayer.pos.y+bestPlayer.distY)
    // ctx.stroke()
    bestPlayer.drawBest()
    bestPlayer.rede.draw(canvas,10,10,.5,'right')
    if(global.players.length==0){
        global.canos=[]
        // console.log(global.mortos)
        for (let i = 0; i < step; i++) {
            let max = -99999
            let index = 0
            for (let j = 0; j < global.mortos.length; j++) {
                const element = global.mortos[j];
                if(element.fit>max){
                    index=j
                    max=element.fit
                }
            }
            bests.push(global.mortos[index])
            global.mortos.splice(index,1)
            
        }
        // console.log(bests)
        // console.log(bests)
        
        for (let j = 0; j < step; j++) {
            for (let i = 0+j; i < population; i+=step) {
                global.players.push(new Player(canvas,global,bests[j].rede))   
            }
            // console.log(global.mortos[j].rede)
        }
        // console.log(global.players)
        for (let i = step; i < population; i++) {
            for (let j = 0; j < numberOfMutation; j++) {
                global.players[i].rede.mutateRandomWeight(Math.floor(Math.random() * (3)))
            }
        }
        // global.canos.push(new Cano(canvas,global))

        clearTimeout(spawner)
        spawnar()
        // global.gravity=.5
        // global.mortos=[]
        gen+=1
        bests=[]
        oo.innerHTML='Gen: '+gen+', '+numberOfMutation
        numberOfMutation*=0.99
        if(numberOfMutation<5){
            numberOfMutation=5
        }
        global.mortos=[]
        
    }
    // global.gravity*=1.001
    window.requestAnimationFrame(main)
}
window.addEventListener('resize',()=>{
    redimensionar()
})
window.addEventListener('keydown',(event)=>{
    if(event.keyCode == 32){
        for (const player of global.players) {
            if(player.life>0){
                player.pulo()
            }
        }
    }
})