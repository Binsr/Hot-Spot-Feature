import Rect from './Rect.js';
import Circle from './Circle.js';
import CollisionCheck from './CollisionCheck.js';
import ClickInfo from './ClickInfo.js';
import ClickAnimation from './ClickAnimation.js'

const IMG_WIDTH = 700;
const IMG_HEIGHT = 600;
const IMG_POS_X= 0;
const IMG_POS_Y= 0;

let canvas= document.getElementById("slika");
let ctx= canvas.getContext("2d");

let newShape={
    startX: null,
    startY: null,
    endX: null,
    endY: null
};

const dragRect= new Rect(newShape);
const dragCircle= new Circle(newShape);
const hotSpotObjects= [];
let clickAnimation= new ClickAnimation();

canvas.addEventListener('mousedown',mouseClick,false);
canvas.addEventListener('mousemove',drag,false);
canvas.addEventListener('mouseup',dragStop,false);

document.getElementById("colisionContainer").addEventListener("click",colisionBtnClick);
document.getElementById("rect").addEventListener("click", rectBtnClick);
document.getElementById("circle").addEventListener("click", circleBtnClick);
document.getElementById("undo").addEventListener("click", undoBtnClick); 
document.getElementById("shapeBtn").addEventListener("click", shapeBtnClick);
document.getElementById("infoClick").addEventListener("click", infoClickBtnClick);
document.getElementById("picUploadBtn").addEventListener("click", uploadPic);


let dragObj= null;
let showDragObj= false;
let collisionAllowed= false;
let infoClickActive= false;

function rectBtnClick(){ 
        infoClickActive= false;
        console.log("Rect clicked");
        document.getElementById("shapList").style.visibility= "hidden";
        document.getElementById("shapeBtn").innerText= "Rect";
        dragObj= dragRect;
}

function circleBtnClick(){ 
        infoClickActive= false;
        console.log("Circle clicked");
        document.getElementById("shapList").style.visibility= "hidden";
        document.getElementById("shapeBtn").innerText= "Circle";
        dragObj= dragCircle;
}

function undoBtnClick(){ 
    console.log("undo clicked");
    hotSpotObjects.pop();
}


function colisionBtnClick(){ 
    console.log("Colision btn clicked");
    if(!collisionAllowed){
        document.getElementById("colisionOnOf").style.backgroundColor= "green";
        document.getElementById("colisionOnOf").innerText= "On";
        collisionAllowed= true;
        if(dragObj)
            dragObj.setColor("white");
    }else{
        document.getElementById("colisionOnOf").style.backgroundColor= "red";
        document.getElementById("colisionOnOf").innerText= "Off";
        collisionAllowed= false;
        if(dragObj)
            dragObj.setColor("white");
    }

}

function uploadPic(){
    console.log("Upload Pic");
}


function shapeBtnClick(){ 
    document.getElementById("shapList").style.visibility = "visible"; 
}

function infoClickBtnClick(){
    infoClickActive= true;
    document.getElementById("shapeBtn").innerText= "Chose Shape";
    newShape={
        startX: null,
        startY: null,
        endX: null,
        endY: null
    };
}


//-------------------------------------------------------------------------------------------------------------------

function getCanvasCoordinates(event){
    let x= event.clientX - canvas.getBoundingClientRect().left;
    let y= event.clientY - canvas.getBoundingClientRect().top;

    return {x: x, y: y};
}

function mouseClick(event){
    let coordinates= getCanvasCoordinates(event);
    if(infoClickActive){
        clickAnimation.startAnimation(coordinates);
        console.log(ClickInfo.getClickedObj(coordinates,hotSpotObjects));
        return;
    }else{
        dragStart(coordinates);
    }

}

function dragStart(coordinates){
    newShape.startX= coordinates.x;
    newShape.startY= coordinates.y;
    showDragObj= true;
    if(dragObj)
        dragObj.updateCord(newShape);
}


function drag(event){
    if(infoClickActive)
        return;

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
        if(dragObj.getColor() != "red" || collisionAllowed)
            hotSpotObjects.push(new Rect(newShape));
    }
    if(dragObj instanceof Circle){
        if(dragObj.getColor() != "red" || collisionAllowed)
            hotSpotObjects.push(new Circle(newShape));
    }
}


//-------------------------------------------------------------------------------------------------------------------

function draw(ctx){
    ctx.clearRect(IMG_POS_X,IMG_POS_Y, IMG_WIDTH, IMG_HEIGHT); 
    ctx.fillStyle= "black";
    ctx.fillRect(IMG_POS_X, IMG_POS_Y, IMG_WIDTH, IMG_HEIGHT);

    for(let i= 0; i < hotSpotObjects.length; i++){
        hotSpotObjects[i].draw(ctx);
    }
    if(showDragObj && dragObj)
        dragObj.draw(ctx);
    if(clickAnimation.isAnimActive() && infoClickActive){
        clickAnimation.draw(ctx);
        clickAnimation.updateTimer();
    }
}

let lastTime= 0;
function gameLoop(timeStamp){
    lastTime= timeStamp;
    draw(ctx);
    clickAnimation.updateTimer();
    requestAnimationFrame(gameLoop);
}

requestAnimationFrame(gameLoop);