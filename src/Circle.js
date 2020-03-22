import Shape from "./Shape.js";

export default class Circle extends Shape{

    constructor(positions){

        super();
        this.centerX= (positions.startX + positions.endX)/2;
        this.centerY= (positions.startY + positions.endY)/2;
        this.r= (Math.sqrt(Math.pow(positions.startX-positions.endX,2) + Math.pow(positions.startY - positions.endY,2)))/2;
    }

    updateCord(positions){
        this.centerX= (positions.startX + positions.endX)/2;
        this.centerY= (positions.startY + positions.endY)/2;
        this.r= (Math.sqrt(Math.pow(positions.startX-positions.endX,2) + Math.pow(positions.startY - positions.endY,2)))/2;
    }

    getElements(){
        return {r: this.r, cx: this.centerX, cy: this.centerY};
    }


    draw(ctx){
        ctx.lineWidth= this.lineWidth;
        ctx.strokeStyle= this.color;
        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, this.r, 0, 2 * Math.PI);
        ctx.stroke(); 
    }


}