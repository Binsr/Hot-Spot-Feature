export default class ClickAnimation{

    constructor(){
        this.x= null;
        this.y= null;
        this.r= null;

        this.timer= 0;
        this.timeInterval= 40;
        this.isAnimationActive= false;
    }

    startAnimation(coord){
        this.isAnimationActive= true;
        this.x= coord.x;
        this.y= coord.y;
        this.r= 1;
    }

    isAnimActive(){
        return this.isAnimationActive;
    }

    updateTimer(){
        if(!this.isAnimationActive)
            return;

        this.timer++;
        this.r= this.timer/2;
        if(this.timer == this.timeInterval){
            this.timer= 0;
            this.isAnimationActive= false;
        }
    }

    draw(ctx){
        ctx.lineWidth = 1;
        ctx.strokeStyle= "#a0fff9";
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI);
        ctx.stroke();
    }
}