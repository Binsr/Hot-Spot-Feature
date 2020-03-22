import Circle from './Circle.js';
import Rect from './Rect.js';

export default class ClickInfo{


    static getClickedObj(clickCoordinates,objects){

        for(let i= 0; i < objects.length; i++){
            if(objects[i] instanceof Circle){
                let x1= clickCoordinates.x;
                let y1= clickCoordinates.y;
                let ce= objects[i].getElements();
                let x2= ce.cx;
                let y2= ce.cy;

                let dist= Math.sqrt(Math.pow(x1-x2,2) + Math.pow(y1-y2,2));

                if(dist < ce.r)
                    return objects[i];
            }

            if(objects[i] instanceof Rect){
                let rectAngleCord= objects[i].getCoordOfAllAngles();
                let x= clickCoordinates.x;
                let y= clickCoordinates.y;

                if(x > rectAngleCord.leftUp.x && x < rectAngleCord.rightUp.x)
                    if(y > rectAngleCord.leftUp.y && y < rectAngleCord.leftDown.y){
                        return objects[i];
                    }
            }
        }

        return null;
    }
}