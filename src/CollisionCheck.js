import Circle from './Circle.js';
import Rect from './Rect.js';


//Prebaci ovde i za kvadrat kvadrat !!!!
export default class CollisionCheck{

    // leftUp: null,
    // leftDown: null,
    // rightUp: null,
    // rightDown: null

    //0 za Y kordinatu je vrhs stranice ne dno

    static doesObjsCollide(dragObj,hotSpotObjects){

            if(dragObj instanceof Rect){ //IZMENI kad dodas koliziju za krug //SVE PREBACI U CHECK COLLISION KLASU       
                for(let i= 0; i < hotSpotObjects.length; i++){
                    if(hotSpotObjects[i] instanceof Circle) 
                        if(this.doesCircleRectCol(hotSpotObjects[i],dragObj)){
                            return true;
                        }else{
                            continue;
                        }
                    
                    if(this.doesRectRectCol(hotSpotObjects[i],dragObj)){
                        return true;
                    }
                    else
                        continue;
                }
                return false;
            }
        if(dragObj instanceof Circle){
                for(let i= 0; i < hotSpotObjects.length; i++){
                    if(hotSpotObjects[i] instanceof Circle) 
                        if(this.doesCircleCircleCol(dragObj,hotSpotObjects[i])){
                            return true;
                        }else{
                            continue;
                        }
                    
                    if(this.doesCircleRectCol(dragObj,hotSpotObjects[i])){
                        return true;
                    }else{
                        continue;
                    }
                }
                return false;
        }  
    }


    static doesCircleRectCol(circle,rect){

        let rectAngleCoord= rect.getCoordOfAllAngles();
        let circleElements= circle.getElements();

        if(circleElements.cx > rectAngleCoord.rightUp.x){
            if(circleElements.cy > rectAngleCoord.rightUp.y && circleElements.cy < rectAngleCoord.rightDown.y){ //1
                if(circleElements.cx - circleElements.r < rectAngleCoord.rightUp.x){
                    return true;
                }else
                    return false;
            }
            if(circleElements.cy < rectAngleCoord.rightUp.y){
                let x1= rectAngleCoord.rightUp.x;
                let y1= rectAngleCoord.rightUp.y;
                let x2= circleElements.cx;
                let y2= circleElements.cy;

                let dist= Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));
                if(dist > circleElements.r){
                    return false;
                }else{
                    return true;
                }
            }else{
                let x1= rectAngleCoord.rightDown.x;
                let y1= rectAngleCoord.rightDown.y;
                let x2= circleElements.cx;
                let y2= circleElements.cy;

                let dist= Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));
                if(dist > circleElements.r){
                    return false;
                }else{
                    return true;
                }
            }

        }else if(circleElements.cx > rectAngleCoord.leftUp.x){
            if(circleElements.cy < rectAngleCoord.leftUp.y){ //2
                if(circleElements.cy + circleElements.r > rectAngleCoord.leftUp.y){ //KONTRA SU UP AND DOWN
                    return true;
                }else
                    return false;
            }else if(circleElements.cy > rectAngleCoord.leftDown.y){ //4
                if(circleElements.cy - circleElements.r < rectAngleCoord.leftDown.y){
                    return true;
                }else{ //3
                    return false;
                }
            }else{
                return true;
            }

        }else{
            if(circleElements.cy > rectAngleCoord.leftUp.y && circleElements.cy < rectAngleCoord.leftDown.y){
                if(circleElements.cx + circleElements.r > rectAngleCoord.leftDown.x){//5
                    return true;
                }else{
                    return false;
                }
            }else if(circleElements.cy < rectAngleCoord.leftUp.y){
                let x1= rectAngleCoord.leftUp.x;
                let y1= rectAngleCoord.leftUp.y;
                let x2= circleElements.cx;
                let y2= circleElements.cy;

                let dist= Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));
                if(dist > circleElements.r){
                    return false;
                }else{
                    return true;
                }
            }else{
                let x1= rectAngleCoord.leftDown.x;
                let y1= rectAngleCoord.leftDown.y;
                let x2= circleElements.cx;
                let y2= circleElements.cy;

                let dist= Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));
                if(dist > circleElements.r){
                    return false;
                }else{
                    return true;
                }
            }
        }

    }

    static doesRectRectCol(rect1,rect2){

        let l1= rect1.getStartPos();
        let d1= rect1.getEndPos();

            let l2= rect2.getStartPos();
            let d2= rect2.getEndPos();

            if(d1.x < l2.x && d1.x < d2.x && l1.x < l2.x && l1.x < d2.x){
                return false;
            }
            if(d1.x > l2.x && d1.x > d2.x && l1.x > l2.x && l1.x > d2.x){
                return false;
            }

            if(d1.y < l2.y && d1.y < d2.y && l1.y < l2.y && l1.y < d2.y){
                return false;
            }

            if(d1.y > l2.y && d1.y > d2.y && l1.y > l2.y && l1.y > d2.y){
                return false;
            }

            else{
                return true;
            }
    }

    static doesCircleCircleCol(circle1,circle2){
        let circleEl1= circle1.getElements();
        let circleEl2= circle2.getElements();

        let x1= circleEl1.cx;
        let y1= circleEl1.cy;
        let x2= circleEl2.cx;
        let y2= circleEl2.cy;

        let dist= Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));

        if(dist > circleEl1.r + circleEl2.r){
            return false;
        }else{
            return true;
        }
    }
}