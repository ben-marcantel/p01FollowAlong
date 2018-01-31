const canvas = document.getElementById("canvas");
const c =canvas.getContext('2d');
MAX = 96*60;
// let vines = [{}];

//run on load
function update(){

    requestAnimationFrame(update);

    if (!window.time){
        time = 0;
        frame = 0;
        timeNextFrame = 0; 
        vines = [{x:0, y:0, a:0, ai:0, w1:8, p:[], l:MAX}]
    }
    currentTime = performance.now()/1000;
    while(time < currentTime){
        while(time < timeNextFrame){
            time += 1/16384;
        }
        frame++;
        time +=1/60;
       

        //update visuals
        vines = vines.filter(v => v.l--);
        vines.forEach(v => {
            
            dx = Math.cos(v.a)* v.w1/2;
            dy = Math.sin(v.a)* v.w1/2;
            v.x += dx;
            v.y += dy;
            v.a += v.ai / v.w /2;
            v.p.splice(0, v.p.length - v.l);
            v.p.splice(0, v.p.length - 60 * 5);
            v.p.push({x:v.x, y:v.y, dx:dx, dy:dy});
            if (frame % 30 == 0) {
                v.ai = Math.random()-.5;
            }
            if (v.w > 1 && Math.random () < v.l /16384/2){
                vines.push({x:v.x, y:v.y, a:v.a, ai:v.ai, w1:v.w/2, p:[], l:Math.min(v.l, 0 | v.w1 * 32 * (1+Math.random()))});
            }
        })

    }
    
//render visuals
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    let h = canvas.height
    let w = canvas.width
    c.translate(w/2,h/2);
    c.shadowBlur = 24;
    vines.forEach(v => {
        c.strokeStyle ='hsl('+(v.a*60|0) + ',100%, '+ (60 + v.w*5)+ '%)';
        if(v.w == 8) {
            c.translate(-v.x, -v.y);
        }
       
        c.beginPath();
        c.lineTo(10,200);
        l = v.p.length-1;
        for(i=1;p=v.p[i];i--){
           c.lineTo(p.x,p.y);
       }
       c.stroke();
    });
}
update();





// function draw() {
  
//     c.beginPath();
    
//     c.fillStyle = 'rgb(' + [127 + 127 * Math.cos(hue), 127 + 127 * Math.cos(hue+2), 127 + 127 * Math.cos(hue+4)] +')';
//     c.font = "100px Futura";
//     c.strokeText("e",255,255);
//     c.strokeStyle='rgb(200, 0, 0)';
//     c.moveTo(canvas.width/2,canvas.height/2);
//     c.stroke(); 
//   }