import Rect from './Rect.js';
import Circle from './Circle.js';
import CollisionCheck from './CollisionCheck.js';
import ClickInfo from './ClickInfo.js';
import ClickAnimation from './ClickAnimation.js';
import SubmitAnimation from './SubmitAnimation.js';
import Shape from './Shape.js';

const IMG_WIDTH = 700;
const IMG_HEIGHT = 600;
const IMG_POS_X= 0;
const IMG_POS_Y= 0;

let canvas= document.getElementById("canvas-element");
let ctx= canvas.getContext("2d");

let newShape={
    startX: null,
    startY: null,
    endX: null,
    endY: null
};

const dragRect= new Rect(newShape);
const dragCircle= new Circle(newShape);
let hotSpotObjects= [];
let clickAnimation= new ClickAnimation();
const submitAnimation= new SubmitAnimation(IMG_WIDTH,IMG_HEIGHT);

canvas.addEventListener('mousedown',mouseClick,false);
canvas.addEventListener('mousemove',drag,false);
canvas.addEventListener('mouseup',dragStop,false);

document.getElementById("colision-container__on-of-btn").addEventListener("click",colisionBtnClick);
document.getElementById("drawing-shapes__list__rect-btn").addEventListener("click", rectBtnClick);
document.getElementById("drawing-shapes__list__circle-btn").addEventListener("click", circleBtnClick);
document.getElementById("undo-btn").addEventListener("click", undoBtnClick); 
document.getElementById("drawing-shapes__btn").addEventListener("click", shapeBtnClick);
document.getElementById("info-btn").addEventListener("click", infoClickBtnClick);
document.getElementById("submit-btn").addEventListener("click",submitCilck);

const inpFile= document.getElementById("input-container__img-input");

inpFile.addEventListener("change", uploadPic);

let dragObj= null;
let showDragObj= false;
let collisionAllowed= false;
let infoClickActive= false;

function rectBtnClick(){ 
        infoClickActive= false;
        document.getElementById("drawing-shapes__list").style.visibility= "hidden";
        document.getElementById("drawing-shapes__btn").innerText= "Rect";
        dragObj= dragRect;
}

function circleBtnClick(){ 
        infoClickActive= false;
        document.getElementById("drawing-shapes__list").style.visibility= "hidden";
        document.getElementById("drawing-shapes__btn").innerText= "Circle";
        dragObj= dragCircle;
}

function undoBtnClick(){ 
    hotSpotObjects.pop();
}


function colisionBtnClick(){ 
    if(!collisionAllowed){
        document.getElementById("colision-container__on-of-btn").style.backgroundColor= "green";
        document.getElementById("colision-container__on-of-btn").innerText= "On";
        collisionAllowed= true;
        if(dragObj)
            dragObj.setColor("default");
    }else{
        document.getElementById("colision-container__on-of-btn").style.backgroundColor= "red";
        document.getElementById("colision-container__on-of-btn").innerText= "Off";
        collisionAllowed= false;
        if(dragObj)
            dragObj.setColor("default");
    }

}
let image= new Image();

function uploadPic(){

    const file= this.files[0];
    const reader= new FileReader();
    reader.addEventListener("load",function(){
        // previewImage.setAttribute("src",this.result);
        image.src= this.result;
        canvas.style.width= "700px";
        document.getElementById("input-container").setAttribute("style","width:0px");
        canvas.style.borderWidth= "3px 0 3px 3px";
        inpFile.style.visibility= "hidden";
    });
    reader.readAsDataURL(file);
}


function shapeBtnClick(){ 
    document.getElementById("drawing-shapes__list").style.visibility = "visible"; 
    document.getElementById("info-btn").style.backgroundColor= '#9BC49B';
    infoClickActive= false;
}


function infoClickBtnClick(){
    infoClickActive= true;
    document.getElementById("drawing-shapes__btn").innerText= "Chose Shape";
    document.getElementById("info-btn").style.backgroundColor= "green";

    newShape={
        startX: null,
        startY: null,
        endX: null,
        endY: null
    };
}
function submitCilck(){
    console.log("Submit clicked");
    submitAnimation.startAnimation();
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
                dragObj.setColor("colision");
        }else{
            if(dragObj)
                dragObj.setColor("default");
        }
    }else{
        dragObj.setColor("default");
    }
}

function dragStop(event){

    let coordinates= getCanvasCoordinates(event);
    showDragObj= false;

    if(dragObj instanceof Rect){
        if(!dragObj.inColision() || collisionAllowed)
            hotSpotObjects.push(new Rect(newShape));
    }
    if(dragObj instanceof Circle){
        if(!dragObj.inColision() || collisionAllowed)
            hotSpotObjects.push(new Circle(newShape));
    }
}

function finishSession(){
    canvas.style.width= "0px";
    canvas.style.borderWidth= "0px 0 0px 0px";
    inpFile.style.visibility= "visible";
    document.getElementById("input-container").setAttribute("style","width:700px");
    document.getElementById("input-container").style.borderWidth= "3px 0 3px 3px";
    hotSpotObjects= [];
}

//-------------------------------------------------------------------------------------------------------------------

function draw(ctx){
    ctx.clearRect(IMG_POS_X,IMG_POS_Y, IMG_WIDTH, IMG_HEIGHT); 
    ctx.fillStyle= "black";
    ctx.fillRect(IMG_POS_X, IMG_POS_Y, IMG_WIDTH, IMG_HEIGHT);
    ctx.drawImage(image,0,0,700,600);
    for(let i= 0; i < hotSpotObjects.length; i++){
        hotSpotObjects[i].draw(ctx);
    }
    if(showDragObj && dragObj)
        dragObj.draw(ctx);
    if(clickAnimation.isAnimActive() && infoClickActive){
        clickAnimation.draw(ctx);
        clickAnimation.updateTimer();
    }
    if(submitAnimation.isAnimActive()){
        submitAnimation.draw(ctx);
        submitAnimation.updateTimer();
        if(!submitAnimation.isAnimActive()){
            finishSession();
        }
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