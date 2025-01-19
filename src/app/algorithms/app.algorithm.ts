import { Canvas } from "../datastructures/app.canvas";
import { Maze } from "../datastructures/app.maze";
import { ElementRef } from "@angular/core";
import { Cell, ColorMap } from "../datastructures/app.cell";




export class Algorithm {
    private readonly runNotImplementedError : string = "Run has to be implemented in subclass.";
    private readonly stepNotImplementedError : string = "Step has to be implemented in subclass.";
    protected readonly intervalIdError : string = "IntervalId is null";
    protected intervalId : NodeJS.Timeout | null = null;
    protected readonly canvas : Canvas; 


    constructor(protected readonly delay : {value : number}, 
                protected readonly maze : Maze, 
                protected readonly mazeCanvasRef : ElementRef<HTMLCanvasElement>, 
                protected readonly running : {value : boolean}, 
                protected readonly paused : {value : Boolean}){
        this.canvas = new Canvas(this.maze.height, this.maze.width, this.mazeCanvasRef); 
    }


    // Only draws the edgecell being processed, thus avoiding drawing the whole maze. 
    protected animateEdgeCell(edgeCell : Cell) : void {
        const canvas_yPos : number = edgeCell.yPos * this.canvas.cellSide + this.canvas.offsetY; 
        const canvas_xPos : number = edgeCell.xPos * this.canvas.cellSide + this.canvas.offsetX; 
        this.canvas.context.fillStyle = ColorMap.getColor(edgeCell.type); 
        this.canvas.context.fillRect(canvas_xPos, canvas_yPos, this.canvas.cellSide, this.canvas.cellSide); 
    } 


    //To be used in run method of subclass to update the delay of the algorithm
    updateDelay() : void {
        if (this.intervalId === null){
            throw new Error(this.intervalIdError); 
        }
        
        clearInterval(this.intervalId!); 
        this.intervalId = setInterval(() => this.step(), this.delay.value); 
        
    }

    //To be overridden and used in subclass to execute the algorithm, and animate it
    run() : void {
        throw new Error(this.runNotImplementedError); 
    }


    //To be overridden and used in run method of subclass to execute one step of the algorithm
    protected step() : void {
        throw new Error(this.stepNotImplementedError); 
    }

}