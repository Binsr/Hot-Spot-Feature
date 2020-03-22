export default class ColisionBtn{

    constructor(){
        this.colisionAllowed= false;
    }

    clicked(){ 
        let colisionBtn= document.getElementById("colision-container__on-of-btn");
        if(!this.colisionAllowed){
            colisionBtn.style.backgroundColor= "green";
            colisionBtn.innerText= "On";
            this.colisionAllowed= true;
        }else{
            colisionBtn.style.backgroundColor= "red";
            colisionBtn.innerText= "Off";
            this.colisionAllowed= false;
        }
    }

    isColisionAllowed(){
        return this.colisionAllowed;
    }
}