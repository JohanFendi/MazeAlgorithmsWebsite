import { Canvas } from "../IOmodules/canvas";
import { Maze } from "../datastructures/maze";
import { ElementRef } from "@angular/core";
import { Cell, ColorMap, Edge , CellType} from "../datastructures/cell";




export class Algorithm {
    private readonly notImplementedError : string = "Method has to be implemented in subclass.";
    protected readonly intervalIdError : string = "IntervalId is null";
    protected intervalId : NodeJS.Timeout | undefined = undefined;
    protected readonly canvas : Canvas; 


    constructor(protected readonly delay : {value : number}, 
                protected readonly maze : Maze, 
                protected readonly mazeCanvasRef : ElementRef<HTMLCanvasElement>, 
                protected readonly running : {value : boolean}, 
                protected readonly paused : {value : Boolean},
                protected lastEdge : Edge | undefined = undefined,
                protected stepCount : number = 0 
                ){
        this.canvas = new Canvas(this.maze.height, this.maze.width, this.mazeCanvasRef); 
    }
    

    //To be overridden
    run() : void {
        throw new Error(this.notImplementedError); 
    }


    //To be overridden
    protected algorithmComplete() : boolean {
        throw new Error(this.notImplementedError); 
    }


    //To be overridden
    protected executeStep() : void {
        throw new Error(this.notImplementedError);
    }


    //To be overridden
    protected prepareAlgorithm(): void {
        throw new Error(this.notImplementedError); 
    }


}