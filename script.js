const canvas = document.getElementById("canvas");
const c =canvas.getContext('2d');

//run on load
function update(){

    requestAnimationFrame(update);

    if (!window.time){
        time = 0;
        frame = 0;
        timeNextFrame = 0; 
    }
    currentTime = performance.now()/1000;
    while(time < currentTime){
        while(time < timeNextFrame){
            time += 1/16384;
        }
        frame++;
        time +=1/60;
    }
    

    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    let h = canvas.height
    let w = canvas.width
    c.translate(w/2,h/2);
    c.strokeStyle ='#fff';
    c.strokeText([w,h,frame],0,0);

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