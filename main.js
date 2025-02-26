
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
let melhorRede = null
let contagenspawn=0
let quantos = Math.floor(55)
function spawnar(){

    global.canos.push(new Cano(canvas,global))
    quantos = Math.floor(55)
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

let numberOfMutation = 0
let bests = []

let population = 1000
for (let i = 0; i < population; i++) {
    global.players.push(new Player(canvas,global,{"changeValue":500,"entradas":[{"valor":62.13818901845889,"pesos":[-457.1565344378463,-60.26217930271322,662.9595884918539,-309.92678909281517,84.44519610089995,-204.06642910203956]},{"valor":-7.591060427379148,"pesos":[-125.91167968593368,391.95613385449917,480.3205739642058,-174.63051584887126,865.7313362776018,-3137.3712657378965]},{"valor":-5,"pesos":[-238.02818441015162,-361.01557160214884,428.23103934086157,-712.2612637713898,-764.8710437159276,-471.95333245341374]},{"valor":404.53742652155256,"pesos":[759.2115403513296,-68.52241723456878,-0.5400983687377536,-444.58477225599626,-594.991453594602,-41.03589979710988]},{"valor":916.6618109815411,"pesos":[715.798383981745,-773.1351442650945,-335.1648204752886,43.62209755782777,263.06437329490853,11.334809512505384]}],"hiddenLayers":[[{"valor":10000,"pesos":[-511.45454569079885,-482.2850164428179,-120.63626205942148,-770.8621662593908,44.19191332501137,783.8471859624614]},{"valor":0,"pesos":[-966.4317762555128,-218.4374178332571,253.53345062691318,105.26969674211895,884.0816154866577,-260.2817952589728]},{"valor":0,"pesos":[-265.293271894221,-841.3700660617125,-446.74749406626546,-848.5400780435275,266.63306268508177,-469.92688268515974]},{"valor":0,"pesos":[712.4677837600623,24.568969392152013,275.200250499827,828.0759519319382,-269.61539585640725,-762.469337109981]},{"valor":2944.561277796136,"pesos":[-897.3260080149923,901.9826386025688,-1009.9464028254238,1475.1072363849757,348.1926290972656,-955.6371779586052]},{"valor":7285.052895686824,"pesos":[-338.71752606709424,485.4810257137178,-1174.9362237716884,929.2100649893072,-1632.039054049973,808.5996137331385]}],[{"valor":0,"pesos":[268.3215413167921,402.7418626194339,1087.618157184019]},{"valor":10000,"pesos":[-233.79384610692446,405.356547124557,680.1698933013165]},{"valor":0,"pesos":[763.1563517976456,382.7675287925361,834.1974229642522]},{"valor":10000,"pesos":[-241.21799173449935,-903.1671758050761,343.38279915495553]},{"valor":0,"pesos":[-741.5600306896171,170.6064863631858,672.1424474525768]},{"valor":10000,"pesos":[588.5680858763673,1118.2677186820458,-956.9910174136886]}]],"saidas":[{"valor":1135562.4803494345},{"valor":6204570.9000152685},{"valor":665616.7504258342}]}))   
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
    if(contagenspawn>quantos){
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
    oo.innerHTML='Gen: '+gen+', Individuos: '+global.players.length
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
        melhorRede = bests[0].rede
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
        
        numberOfMutation*=0.99
        // if(numberOfMutation<5){Zz
        global.mortos=[]
        
    }
    // global.gravity*=1.001
    window.requestAnimationFrame(main)
}
window.addEventListener('resize',()=>{
    redimensionar()
})
window.addEventListener('keydown',(event)=>{
    // if(event.keyCode == 32){
    //     for (const player of global.players) {
    //         if(player.life>0){
    //             player.pulo()
    //         }
    //     }
    // }
})
document.getElementById('baixarIA').addEventListener('click', function() {
    // Conteúdo do arquivo JavaScript
    const conteudo = `${JSON.stringify(melhorRede)};`;

    // Criando um Blob com o conteúdo JavaScript
    const blob = new Blob([conteudo], { type: 'application/javascript' });

    // Criando uma URL para o Blob
    const url = URL.createObjectURL(blob);

    // Criando um link de download
    const link = document.createElement('a');
    link.href = url;
    link.download = 'MelhorRede.js'; // Nome do arquivo

    // Simulando o clique no link para iniciar o download
    link.click();

    // Liberando o objeto URL após o download
    URL.revokeObjectURL(url);
});