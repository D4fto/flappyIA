function met1(n){
    let sum = 0
    for (let i = 0; i < n; i++) {
        sum+=5**i
        
    }
    return sum
}
function met2(n){
    return (4+5*(5**(n-1)-1))/4
}
const oo = document.getElementById('oo')
let n = 1
while(true){
    let x1 = met1(n)
    let x2 = met2(n)
    oo.innerText = `${n}, ${x1}, ${x2}, ${x1===x2}`
    console.log(`${n}, ${x1}, ${x2}, ${x1==x2}`)
    if(x1!==x2){
        break
    }
    n+=1
}