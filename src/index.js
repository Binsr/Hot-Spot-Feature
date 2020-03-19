import Rect from './Rect.js';
import Circle from './Circle.js';
import CollisionCheck from './CollisionCheck.js';


const IMG_WIDTH = 700;
const IMG_HEIGHT = 600;
const IMG_POS_X= 0;
const IMG_POS_Y= 0;


let canvas= document.getElementById("slika");
let ctx= canvas.getContext("2d");

let hotSpotObjects= [];
let newShape={
    startX: null,
    startY: null,
    endX: null,
    endY: null
};

let dragRect= new Rect(newShape);
let dragCircle= new Circle(newShape);

let dragObj= null;

let showDragObj= false;

let collisionAllowed= false;

document.getElementById("rect").addEventListener("click", function(){ 
        console.log("Rect clicked");
        document.getElementById("shapList").style.visibility= "hidden";
        document.getElementById("shapeBtn").innerText= "Rect";
        dragObj= dragRect;
});

document.getElementById("circle").addEventListener("click", function(){ 
        console.log("Circle clicked");
        document.getElementById("shapList").style.visibility= "hidden";
        document.getElementById("shapeBtn").innerText= "Circle";
        dragObj= dragCircle;
});

document.getElementById("undo").addEventListener("click", function(){ 
    console.log("undo clicked");
    hotSpotObjects.pop();
});


document.getElementById("colisionContainer").addEventListener("click", function(){ 
    console.log("Colision btn clicked");
    if(!collision){
        document.getElementById("colisionOnOf").style.backgroundColor= "green";
        document.getElementById("colisionOnOf").innerText= "On";
        collision= true;
        dragRect.setColor("white");
    }else{
        document.getElementById("colisionOnOf").style.backgroundColor= "red";
        document.getElementById("colisionOnOf").innerText= "Off";
        collision= false;
        dragRect.setColor("white");
    }

});

document.getElementById("shapeBtn").addEventListener("click", function(){ 
    document.getElementById("shapList").style.visibility = "visible"; 
});


//-------------------------------------------------------------------------------------------------------------------

function getCanvasCoordinates(event){
    let x= event.clientX - canvas.getBoundingClientRect().left;
    let y= event.clientY - canvas.getBoundingClientRect().top;

    return {x: x, y: y};
}

function dragStart(event){
    let coordinates= getCanvasCoordinates(event);
    newShape.startX= coordinates.x;
    newShape.startY= coordinates.y;
    showDragObj= true;
    if(dragObj)
        dragObj.updateCord(newShape);
    
}

function drag(event){
    let coordinates= getCanvasCoordinates(event);
    newShape.endX= coordinates.x;
    newShape.endY= coordinates.y;
    if(dragObj)
        dragObj.updateCord(newShape);

    if(!collisionAllowed){
        if(CollisionCheck.doesObjsCollide(dragObj,hotSpotObjects)){
            if(dragObj)
                dragObj.setColor("red");
        }else{
            if(dragObj)
                dragObj.setColor("white");
        }
    }
}

function dragStop(event){
    let coordinates= getCanvasCoordinates(event);
    showDragObj= false;

    if(dragObj instanceof Rect){
        if(dragRect.getColor() != "red" || collisionAllowed)
            hotSpotObjects.push(new Rect(newShape));
    }
    if(dragObj instanceof Circle){
        hotSpotObjects.push(new Circle(newShape));
    }
}

canvas.addEventListener('mousedown',dragStart,false);
canvas.addEventListener('mousemove',drag,false);
canvas.addEventListener('mouseup',dragStop,false);

//-------------------------------------------------------------------------------------------------------------------

function draw(){
    ctx.clearRect(IMG_POS_X,IMG_POS_Y, IMG_WIDTH, IMG_HEIGHT); 
    ctx.fillStyle= "black";
    ctx.fillRect(IMG_POS_X, IMG_POS_Y, IMG_WIDTH, IMG_HEIGHT);

    for(let i= 0; i < hotSpotObjects.length; i++){
        hotSpotObjects[i].draw(ctx);
    }
    if(showDragObj && dragObj)
        dragObj.draw(ctx);
}

let lastTime= 0;
function gameLoop(timeStamp){
    let deltaTime= timeStamp - lastTime;
    lastTime= timeStamp;
    draw();
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);