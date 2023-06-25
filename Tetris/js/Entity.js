import Coordinates from "./Coordinates";

export default class Entity{
    width;
    height;
    coordinates = new Coordinates();
    
    constructor(width, height){
        this.width = width;
        this.height = height;
    }
}