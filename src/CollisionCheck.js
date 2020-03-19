import Circle from './Circle.js';
import Rect from './Rect.js';


//Prebaci ovde i za kvadrat kvadrat !!!!
export default class CollisionCheck{

    // leftUp: null,
    // leftDown: null,
    // rightUp: null,
    // rightDown: null

    static doesCircleRectCol(Circle,Rect){

        let rectAngleCoord= Rect.getCoordOfAllAngles();
        let circleElements= Circle.getElements();

        if(circleElements.cx > rectAngleCoord.rightUp.x){
            if(circleElements.cy < rectAngleCoord.rightUp.y && circleElements.cy > rectAngleCoord.rightDown.y){
                if(circleElements.cx - circleElements.r < rectAngleCoord.rightUp.x){
                    return true;
                }else
                    return false;
            }
        }

    }

    
}