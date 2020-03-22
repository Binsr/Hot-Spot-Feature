export default class Circle{

    constructor(positions){

        this.colorInColision= "red";
        this.defaultColor= "green";

        this.colision= null;

        this.color= this.defaultColor;

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

    inColision(){
        return this.colision;
    }

    setColor(status){
        if(status == "colision"){
            this.color= this.colorInColision;
            this.colision= true;
        }
        else{
            this.color= this.defaultColor;
            this.colision= false;
        }
    }

    draw(ctx){
        ctx.lineWidth= 4;
        ctx.strokeStyle= this.color;
        ctx.beginPath();
        ctx.arc(this.centerX, this.centerY, this.r, 0, 2 * Math.PI);
        ctx.stroke(); 
    }


}