import Circle from './Circle.js';

export default class Rect{

    constructor(positions){

        this.lineColor= "white";

        this.startPos={
            x: positions.startX,
            y: positions.startY
        }

        this.endPos={
            x: positions.endX,
            y: positions.endY
        }
    }
    getColor(){
        return this.lineColor;
    }

    setColor(color){
        this.lineColor= color;
    }
    updateCord(coordinates){
        this.endPos.x= coordinates.endX;
        this.endPos.y= coordinates.endY;

        this.startPos.x= coordinates.startX;
        this.startPos.y= coordinates.startY;
    }

    setStartPos(start){
        this.startPos.x= start.x;
        this.startPos.y= start.y;
    }

    getStartPos(){
        return this.startPos;
    }

    getEndPos(){
        return this.endPos;
    }

    getCoordOfAllAngles(){
        let startPos= this.startPos;
        let endPos= this.endPos;

        let pointsOfAngles={
            leftUp: null,
            leftDown: null,
            rightUp: null,
            rightDown: null
        };

        if(startPos.x < endPos.x){
            if(startPos.y < endPos.y){
                pointsOfAngles.leftDown= startPos;
                pointsOfAngles.rightUp= endPos;

                pointsOfAngles.rightDown= {
                    x: pointsOfAngles.rightUp.x,
                    y: pointsOfAngles.leftDown.y
                };

                pointsOfAngles.leftUp= {
                    x: pointsOfAngles.leftDown.x,
                    y: pointsOfAngles.rightUp.y
                };

            }else{
                pointsOfAngles.leftUp= startPos;
                pointsOfAngles.rightDown= endPos; 

                pointsOfAngles.leftDown= {
                    x: pointsOfAngles.leftUp.x,
                    y: pointsOfAngles.rightDown.y
                };

                pointsOfAngles.rightUp= {
                    x: pointsOfAngles.rightDown.x,
                    y: pointsOfAngles.leftUp.y
                };

            }
        }else{
            if(startPos.y < endPos.y){
                pointsOfAngles.rightDown= startPos;
                pointsOfAngles.leftUp= endPos;

                pointsOfAngles.rightUp= {
                    x: pointsOfAngles.rightDown.x,
                    y: pointsOfAngles.leftUp.y
                };

                pointsOfAngles.leftDown= {
                    x: pointsOfAngles.leftUp.x,
                    y: pointsOfAngles.rightDown.y
                };

            }else{
                pointsOfAngles.rightUp= startPos;
                pointsOfAngles.leftDown= endPos;

                pointsOfAngles.rightDown= {
                    x: pointsOfAngles.rightUp.x,
                    y: pointsOfAngles.leftDown.y
                };

                pointsOfAngles.leftUp= {
                    x: pointsOfAngles.leftDown.x,
                    y: pointsOfAngles.rightUp.y
                };
            }
        }
        return pointsOfAngles;
    }

    showColision(shapesList){
        let l1= {
            x: this.startPos.x,
            y: this.startPos.y
        };
        let d1= {
            x: this.endPos.x,
            y: this.endPos.y
        };

        for(let i= 0; i < shapesList.length; i++){
            if(shapesList[i] instanceof Circle)
                continue;
            let l2= shapesList[i].getStartPos();
            let d2= shapesList[i].getEndPos();

            if(d1.x < l2.x && d1.x < d2.x && l1.x < l2.x && l1.x < d2.x){
                this.lineColor= "white";
                continue;
            }
            if(d1.x > l2.x && d1.x > d2.x && l1.x > l2.x && l1.x > d2.x){
                this.lineColor= "white";
                continue;
            }

            if(d1.y < l2.y && d1.y < d2.y && l1.y < l2.y && l1.y < d2.y){
                this.lineColor= "white";
                continue;
            }

            if(d1.y > l2.y && d1.y > d2.y && l1.y > l2.y && l1.y > d2.y){
                this.lineColor= "white";
                continue;
            }

            else{
                this.lineColor= "red";
                return;
            }
        }
    }

    draw(ctx){
        ctx.strokeStyle= this.lineColor;
        ctx.lineWidth = 2;
        ctx.strokeRect(this.startPos.x,this.startPos.y,this.endPos.x-this.startPos.x,this.endPos.y-this.startPos.y);
    }
}