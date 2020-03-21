export default class SubmitAnimation{

    constructor(ctxWidth,ctxHeight){
        this.startX= ctxWidth/3-50;
        this.startY= ctxHeight/2;


        this.movingPointX= this.startX;
        this.movingPointY= this.startY;

        this.movingEndPointX= null;
        this.movingEndPointY= null;

        this.timer1= 0;
        this.timer2= 0;
        this.timeInterval= ctxHeight/8;
        this.isAnimationActive= false;
    }

    updateMovingPoint(){
        this.movingPointX+=6;
        this.movingPointY+=6;
    }

    updateMovingEndPoint(){
        this.movingEndPointX+=6;
        this.movingEndPointY-=6;
    }

    startAnimation(){
        this.isAnimationActive= true;
    }

    isAnimActive(){
        return this.isAnimationActive;
    }

    updateTimer(){
        if(!this.isAnimationActive)
            return;

        this.timer1+=3;


        if(this.timer1 >= this.timeInterval){

            if(!this.movingEndPointX){
                this.movingEndPointX= this.movingPointX;
                this.movingEndPointY= this.movingPointY;
            }
            if(this.timer2 < this.timeInterval+80){
                this.drawEndLine= true;
                this.timer2+=3;
                this.updateMovingEndPoint();
            }else{
                this.timer1= 0;
                this.timer2= 0;
                this.drawEndLine= false;
                this.isAnimationActive= false;
                this.movingPointX= this.startX;
                this.movingPointY= this.startY;
                this.movingEndPointX= null;
                this.movingEndPointY= null;
                return false;
            }
        }else{
            this.updateMovingPoint();
            console.log("this.timer1")
        }
    }

    draw(ctx){
        ctx.globalAlpha = 0.75;
        ctx.fillStyle= "gray";
        ctx.fillRect(0,0,700,600);
        ctx.globalAlpha = 1.0;

        ctx.lineWidth= 40;
        ctx.strokeStyle = 'blue';
        ctx.beginPath();
        ctx.moveTo(this.startX, this.startY);
        ctx.lineTo(this.movingPointX, this.movingPointY);
        if(this.drawEndLine){
            ctx.lineTo(this.movingEndPointX,this.movingEndPointY);
        }
        ctx.stroke(); 
    }
}