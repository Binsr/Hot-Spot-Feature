import Rect from './Rect.js';
import Circle from './Circle.js';
import CollisionCheck from './CollisionCheck.js';
import ClickInfo from './ClickInfo.js';
import ClickAnimation from './ClickAnimation.js';
import SubmitAnimation from './SubmitAnimation.js';
import ColisionBtn from './ColisionBtn.js';

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

const inputBtn= document.getElementById("input-container__img-input");
const drawingShapesBtn= document.getElementById("drawing-shapes__btn");
const drawingShapeRectBtn= document.getElementById("drawing-shapes__list__rect-btn");
const drawingShapeCircleBtn= document.getElementById("drawing-shapes__list__circle-btn");
const colisionBtn= new ColisionBtn();
const infoBtn= document.getElementById("info-btn");
const undoBtn= document.getElementById("undo-btn");
const submitBtn= document.getElementById("submit-btn");

inputBtn.addEventListener("change", uploadPic);
drawingShapesBtn.addEventListener("click", shapeBtnClick);
drawingShapeRectBtn.addEventListener("click", rectBtnClick);
drawingShapeCircleBtn.addEventListener("click", circleBtnClick);
document.getElementById("colision-container__on-of-btn").addEventListener("click",colisionClick);
infoBtn.addEventListener("click", infoClickBtnClick);
undoBtn.addEventListener("click", undoBtnClick); 
submitBtn.addEventListener("click",submitCilck);

const inputContainer= document.getElementById("input-container");
const drawingShapesList= document.getElementById("drawing-shapes__list");


let dragObj= null;
let showDragObj= false;
let infoClickActive= false;

function colisionClick(){
    colisionBtn.clicked();
}

function rectBtnClick(){ 
        infoClickActive= false;
        drawingShapesList.style.visibility= "hidden";
        drawingShapesBtn.innerText= "Rect";
        dragObj= dragRect;
}

function circleBtnClick(){ 
        infoClickActive= false;
        drawingShapesList.style.visibility= "hidden";
        drawingShapesBtn.innerText= "Circle";
        dragObj= dragCircle;
}

function undoBtnClick(){ 
    hotSpotObjects.pop();
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
        inputBtn.style.visibility= "hidden";
    });
    reader.readAsDataURL(file);
}


function shapeBtnClick(){ 
    drawingShapesList.style.visibility = "visible"; 
    infoBtn.style.backgroundColor= '#9BC49B';
    infoClickActive= false;
}


function infoClickBtnClick(){
    infoClickActive= true;
    drawingShapesBtn.innerText= "Chose Shape";
    infoBtn.style.backgroundColor= "green";

    newShape={
        startX: null,
        startY: null,
        endX: null,
        endY: null
    };
}
function submitCilck(){
    console.log("Submit clicked");
    console.log(hotSpotObjects);
    submitAnimation.startAnimation();
}

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

    if(!colisionBtn.isColisionAllowed()){
        if(CollisionCheck.doesObjsCollide(dragObj,hotSpotObjects)){
            if(dragObj)
                dragObj.setColor("colision");
        }else{
            if(dragObj)
                dragObj.setColor("default");
        }
    }else{
        if(dragObj)
            dragObj.setColor("default");
    }
}

function dragStop(event){
    showDragObj= false;
    if(infoClickActive)
        return;
    if(dragObj instanceof Rect){
        if(!dragObj.inColision() || colisionBtn.isColisionAllowed())
            hotSpotObjects.push(new Rect(newShape,hotSpotObjects.length));
    }
    if(dragObj instanceof Circle){
        if(!dragObj.inColision() || colisionBtn.isColisionAllowed())
            hotSpotObjects.push(new Circle(newShape,hotSpotObjects.length));
    }
}

function finishSession(){
    canvas.style.width= "0px";
    canvas.style.borderWidth= "0px 0 0px 0px";
    inputBtn.style.visibility= "visible";
    inputContainer.setAttribute("style","width:700px");
    inputContainer.style.borderWidth= "3px 0 3px 3px";
    hotSpotObjects= [];
}

function draw(ctx){
    ctx.clearRect(IMG_POS_X,IMG_POS_Y, IMG_WIDTH, IMG_HEIGHT); 
    ctx.drawImage(image,IMG_POS_X,IMG_POS_Y,IMG_WIDTH,IMG_HEIGHT);
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
function appLoop(timeStamp){
    lastTime= timeStamp;
    draw(ctx);
    clickAnimation.updateTimer();
    requestAnimationFrame(appLoop);
}
requestAnimationFrame(appLoop);