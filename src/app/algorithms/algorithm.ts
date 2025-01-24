import { Canvas } from "../IOmodules/canvas";
import { Maze } from "../datastructures/maze";
import { ElementRef } from "@angular/core";
import { Cell, ColorMap, Edge , CellType} from "../datastructures/cell";




export class Algorithm {
    private readonly notImplementedError : string = "Method has to be implemented in subclass.";


    constructor(protected readonly maze : Maze){}
    

    //To be overridden
    isComplete() : boolean {
        throw new Error(this.notImplementedError); 
    }


    //Returns the processed edge
    executeStep() : Edge {
        throw new Error(this.notImplementedError);
    }


    //To be overridden
    prepare(): void {
        throw new Error(this.notImplementedError); 
    }


}