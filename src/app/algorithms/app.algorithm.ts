import { Canvas } from "../datastructures/app.canvas";
import { Maze } from "../datastructures/app.maze";
import { ElementRef } from "@angular/core";
import { Cell, ColorMap } from "../datastructures/app.cell";


export class Algorithm {
    protected  readonly canvas : Canvas; 

    constructor(protected readonly delay : number, protected  readonly maze : Maze, protected  readonly mazeCanvasRef : ElementRef<HTMLCanvasElement>, 
        protected  readonly running : {value:boolean}, protected  readonly paused : {value : Boolean}){
        this.canvas = new Canvas(this.maze.height, this.maze.width, this.mazeCanvasRef); 
    }

    // Only draws the edgecell being processed, thus avoiding drawing the whole maze. 
    protected animate(edgeCell : Cell) : void {
        const canvas_yPos : number = edgeCell.yPos * this.canvas.cellSide + this.canvas.offsetY; 
        const canvas_xPos : number = edgeCell.xPos * this.canvas.cellSide + this.canvas.offsetX; 
        this.canvas.context.fillStyle = ColorMap.getColor(edgeCell.type); 
        this.canvas.context.fillRect(canvas_xPos, canvas_yPos, this.canvas.cellSide, this.canvas.cellSide); 
    } 

    protected run() : void {
        throw new Error("Run has to be implemented in subclass."); 
    }

}