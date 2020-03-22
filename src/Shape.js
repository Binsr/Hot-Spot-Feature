export default class Shape{

    constructor(){

        this.colorInColision= "red";
        this.defaultColor= "green";
        this.colision= null;
        this.color= this.defaultColor;

        this.lineWidth= 4;
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

    draw(ctx){}
}