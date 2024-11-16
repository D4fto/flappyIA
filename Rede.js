export class Rede{
    constructor(init){
        this.changeValue = 500
        if(init.header==='first'){
            this.entradas=[]
            for (let i = 0; i < init.entrada; i++) {
                let entradaTemp = {
                    valor:0,
                    pesos:[]
                }
                for (let j = 0; j < init.hidden[0]; j++) {
                    entradaTemp.pesos.push(Math.random() * (1000 + 1000) - 1000)
                }
                this.entradas.push(entradaTemp)
            }
            this.hiddenLayers=[]
            for (let i = 0; i < init.hidden.length-1; i++) {
                let layerTemp = []
                for (let j = 0; j < init.hidden[i]; j++) {
                    let nodeTemp = {
                        valor:0,
                        pesos:[]
                    }
                    for (let k = 0; k < init.hidden[i+1]; k++) {
                        nodeTemp.pesos.push(Math.random() * (1000 + 1000) - 1000)
                    }
                    layerTemp.push(nodeTemp)
                }
                this.hiddenLayers.push(layerTemp)
            }
            this.hiddenLayers.push([])
            for (let i = 0; i < init.hidden[init.hidden.length-1]; i++) {
                let nodeTemp = {
                    valor:0,
                    pesos:[]
                }
                for (let j = 0; j < init.saida; j++) {
                    nodeTemp.pesos.push(Math.random() * (1000 + 1000) - 1000)
                }
                this.hiddenLayers[this.hiddenLayers.length-1].push(nodeTemp)
            }
            this.saidas=[]
            for (let i = 0; i < init.saida; i++) {
                this.saidas.push({valor:0})
                
            }
        }else if(init.header==='child'){
            this.entradas=[]
            for (const entrada of init.rede.entradas) {
                let entradaTemp = {
                    valor: 0,
                    pesos:[]
                }
                for (const peso of entrada.pesos) {
                    entradaTemp.pesos.push(peso)
                }
                this.entradas.push(entradaTemp)
            }
            this.hiddenLayers=[]
            for (const layer of init.rede.hiddenLayers) {
                let layerTemp = []
                for (const node of layer) {
                    let nodeTemp = {
                        valor: 0,
                        pesos:[]
                    }
                    for (const peso of node.pesos) {
                        nodeTemp.pesos.push(peso)
                    }
                    layerTemp.push(nodeTemp)
                }
                this.hiddenLayers.push(layerTemp)
            }
            this.saidas = []
            for (const saida of init.rede.saidas) {
                this.saidas.push({valor:0})
            }
        }
    }
    execute(values=[]){
        for (let i = 0; i < values.length; i++) {
            this.entradas[i].valor=values[i]

        }
        for (const element of this.hiddenLayers) {
            for (const item of element) {
                item.valor=0
            }
        }
        for (const element of this.saidas) {
            element.valor=0
        }
        for (let i = 0; i < this.entradas.length; i++) {
            const entrada = this.entradas[i];
            for (let j = 0; j < entrada.pesos.length; j++) {
                this.hiddenLayers[0][j].valor+=entrada.valor*entrada.pesos[j]
            }
        }
        for (let i = 0; i < this.hiddenLayers.length-1; i++) {
            const layer = this.hiddenLayers[i];
            for (let j = 0; j < layer.length; j++) {
                const node = layer[j];
                if(node.valor<0){
                    node.valor = 0
                }
                if(node.valor>10000){
                    node.valor = 10000
                }
                for (let k = 0; k < node.pesos.length; k++) {
                    this.hiddenLayers[i+1][k].valor+=node.valor*node.pesos[k]
                }
            }
        }
        for (let j = 0; j < this.hiddenLayers[this.hiddenLayers.length-1].length; j++) {
            const node = this.hiddenLayers[this.hiddenLayers.length-1][j];
            if(node.valor<0){
                node.valor = 0
            }
            if(node.valor>10000){
                node.valor = 10000
            }
            
            for (let k = 0; k < node.pesos.length; k++) {
                this.saidas[k].valor+=node.valor*node.pesos[k]
            }
            
        }
        return this.saidas
    }
    mutateRandomWeight(typeOfMutation){
        let index = Math.floor(Math.random() * (this.hiddenLayers.length+1))
        let pesoArr
        if(index===0){
            pesoArr = this.entradas[Math.floor(Math.random() * (this.entradas.length))].pesos
        }
        else{
            pesoArr = this.hiddenLayers[index-1][Math.floor(Math.random() * (this.hiddenLayers[index-1].length))].pesos
        }
        switch (typeOfMutation) {
            case 0:
                pesoArr[Math.floor(Math.random() * (pesoArr.length))]=Math.random() * (1000 + 1000) - 1000
                break;
            case 1:
                pesoArr[Math.floor(Math.random() * (pesoArr.length))]*=Math.random() * (1.5 - 0.5) + 0.5
                break;
            case 2:
                pesoArr[Math.floor(Math.random() * (pesoArr.length))]+=Math.random() * (10 + 10) - 10
                break;
        
        }
    }
    draw(canvas,x,y,scale,align='left'){
        let ctx = canvas.getContext('2d')
        let nodesRadius=40
        let gap = 80
        if(align==='right'){
            x = canvas.width-x-nodesRadius*2*(this.hiddenLayers.length+2)*scale-gap*(this.hiddenLayers.length+2)*scale
            // console.log(x)
        }
        ctx.save()
        ctx.translate(x,y)
        ctx.scale(scale,scale)
        for (let i = 0; i < this.entradas.length; i++) {
            (async ()=>{
                for (let k = 0; k < this.entradas[i].pesos.length; k++) {
                    ctx.beginPath()
                    if(this.entradas[i].valor*this.entradas[i].pesos[k]>0){
                        ctx.strokeStyle='#f00'
                        ctx.lineWidth = 3
                    }else{
                        ctx.strokeStyle='#00000000'
                        ctx.lineWidth = 1
                    }
                    ctx.moveTo(0+nodesRadius,0+nodesRadius+nodesRadius*(i*2)+gap*i)
                    ctx.lineTo(nodesRadius*(3)+gap,nodesRadius+(nodesRadius*k*2)+(gap*k))
                    ctx.stroke()
                }
            })().then(()=>{
                ctx.save()
                ctx.translate(x,y)
                ctx.scale(scale,scale)
                ctx.beginPath()
                
                if(this.entradas[i].valor>0){
                    ctx.fillStyle='#f00'
                }else{
                    ctx.fillStyle='#555'
    
                }
                ctx.arc(nodesRadius,nodesRadius+(nodesRadius*i*2)+(gap*i),nodesRadius,0,2*Math.PI)
                ctx.fill()
                ctx.strokeStyle='#000'
                ctx.lineWidth=5
                ctx.arc(nodesRadius,nodesRadius+(nodesRadius*i*2)+(gap*i),nodesRadius,0,2*Math.PI)
                ctx.stroke()
                ctx.font = "bold 20px serif"
                ctx.fillStyle = '#000'
                ctx.textBaseline ='middle'
                ctx.textAlign = 'center'
                ctx.fillText((this.entradas[i].valor).toFixed(2),nodesRadius,nodesRadius+(nodesRadius*i*2)+(gap*i))
                ctx.restore()
            })
            
        }
        
        for (let i = 0; i < this.hiddenLayers.length; i++) {
            for (let j = 0; j < this.hiddenLayers[i].length; j++) {
                (async ()=>{
                    for (let k = 0; k < this.hiddenLayers[i][j].pesos.length; k++) {
                        ctx.beginPath()
                        if(this.hiddenLayers[i][j].valor*this.hiddenLayers[i][j].pesos[k]>0){
                            ctx.strokeStyle='#f00'
                            ctx.lineWidth = 3
                        }else{
                            ctx.strokeStyle='#00000000'
                            ctx.lineWidth = 1
                        }
                        ctx.moveTo(0+nodesRadius+(nodesRadius*2*(i+1)+gap*(i+1)),0+nodesRadius+nodesRadius*(j*2)+gap*j)
                        ctx.lineTo(0+nodesRadius*3+gap+(nodesRadius*2*(i+1)+gap*(i+1)),nodesRadius+(nodesRadius*k*2)+(gap*k))
                        
                        ctx.stroke()
                    }
                })().then(()=>{
                    ctx.save()
                    ctx.translate(x,y)
                    ctx.scale(scale,scale)
                    ctx.beginPath()
                    
                    if(this.hiddenLayers[i][j].valor>0){
                        ctx.fillStyle='#f00'
                    }else{
                        ctx.fillStyle='#555'
        
                    }
                    ctx.arc(nodesRadius+nodesRadius*(2*(i+1))+gap*(i+1),nodesRadius+(nodesRadius*j*2)+(gap*j),nodesRadius,0,2*Math.PI)
                    ctx.fill()
                    ctx.strokeStyle='#000'
                    ctx.lineWidth=5
                    ctx.arc(nodesRadius+nodesRadius*(2*(i+1))+gap*(i+1),nodesRadius+(nodesRadius*j*2)+(gap*j),nodesRadius,0,2*Math.PI)
                    ctx.stroke()
                    ctx.font = "bold 15px serif"
                    ctx.fillStyle = '#000'
                    ctx.textBaseline ='middle'
                    ctx.textAlign = 'center'
                    ctx.fillText((this.hiddenLayers[i][j].valor).toFixed(2),nodesRadius+nodesRadius*(2*(i+1))+gap*(i+1),nodesRadius+(nodesRadius*j*2)+(gap*j),nodesRadius*2-10)
                    ctx.restore()
                })
            }
        }
        for (let i = 0; i < this.saidas.length; i++) {
            ctx.beginPath()
            if(this.saidas[i].valor>0){
                ctx.fillStyle='#f00'
            }else{
                ctx.fillStyle='#555'

            }
            ctx.arc(nodesRadius+nodesRadius*(2*(this.hiddenLayers.length+1))+(gap*(this.hiddenLayers.length+1)),nodesRadius+(nodesRadius*i*2)+(gap*i),nodesRadius,0,2*Math.PI)
            ctx.fill()
            ctx.strokeStyle='#000'
            ctx.lineWidth=5
            ctx.arc(nodesRadius+nodesRadius*(2*(this.hiddenLayers.length+1))+(gap*(this.hiddenLayers.length+1)),nodesRadius+(nodesRadius*i*2)+(gap*i),nodesRadius,0,2*Math.PI)
            ctx.stroke()
            ctx.font = "bold 10px serif"
            ctx.fillStyle = '#000'
            ctx.textBaseline ='middle'
            ctx.textAlign = 'center'
            ctx.fillText((this.saidas[i].valor).toFixed(2),nodesRadius+nodesRadius*(2*(this.hiddenLayers.length+1))+(gap*(this.hiddenLayers.length+1)),nodesRadius+(nodesRadius*i*2)+(gap*i),nodesRadius*2-10)
        }
        ctx.restore()
    }
}
