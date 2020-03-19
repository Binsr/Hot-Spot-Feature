export default class Circle{

    constructor(positions){

        this.color= "white"
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

    getColor(){
        return this.color;
    }

    setColor(color){
        this.color= color;
    }

    draw(ctx){
        ctx.lineWidth = 2;
        ctx.strokeStyle= this.color;
        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, this.r, 0, 2 * Math.PI);
        ctx.stroke(); 
    }


}