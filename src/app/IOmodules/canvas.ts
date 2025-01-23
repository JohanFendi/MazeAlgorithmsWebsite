import { ElementRef } from '@angular/core';
import { CellType, Cell, Edge, ColorMap} from '../datastructures/cell';
import { isPlatformBrowser } from '@angular/common';


//Immutable dataclass for html canvas. 
//The canvas is used in draw graphical maze and in the animate function of the algorithm class.
export class Canvas {

    //Error messages, class variables; 
    private static readonly edgeError : string = "Edge is undefined";
    private static readonly contextNullError : string = "Canvas-Context is Null"; 
    private static readonly mazeCanvasRefError : string = "CanvasError: mazeCanvasRef is undefined"; 


    //instance variables
    private readonly mazeCanvasElement : HTMLCanvasElement; 
    private readonly offsetX : number;
    private readonly offsetY : number; 
    private readonly cellSide : number; 
    private readonly context : CanvasRenderingContext2D; 


    constructor(readonly mazeHeight : number, readonly mazeWidth : number, mazeCanvasRef : ElementRef<HTMLCanvasElement>)
    {
        if (mazeCanvasRef === undefined){
            throw new Error(Canvas.mazeCanvasRefError); 
        }

        this.mazeCanvasElement = mazeCanvasRef.nativeElement; 
        this.cellSide = this.mazeCanvasElement.clientHeight / Math.max(mazeHeight, mazeWidth); 
        this.offsetY = Math.max((mazeWidth-mazeHeight)*this.cellSide / 2, 0); 
        this.offsetX = Math.max((mazeHeight-mazeWidth)*this.cellSide / 2, 0);
        this.mazeCanvasElement.width = this.mazeCanvasElement.clientWidth; 
        this.mazeCanvasElement.height = this.mazeCanvasElement.clientHeight; 
        let context : CanvasRenderingContext2D | null = this.mazeCanvasElement.getContext('2d');

        if (context == null){
            throw new Error(Canvas.contextNullError); 
        }

        this.context = context; 
    }


    // Only animates the edge being processed, thus avoiding drawing the whole maze. 
    animateEdge(edge : Edge | undefined | null) : void {
        if (edge === undefined || edge === null){
            throw new Error(Canvas.edgeError); 
        }
        const [currentCell, edgeCell, nextCell, weight] = edge;
        const edgeCellCopy : Cell = new Cell(edgeCell.xPos, edgeCell.yPos, edgeCell.type);

        for (let cell of [currentCell, edgeCell, nextCell]){
            cell.updateType(CellType.BEINGDECIDED);
            this.animateCell(cell);

            if (cell.yPos === edgeCell.yPos && cell.xPos === edgeCell.xPos){
                cell.updateType(edgeCellCopy.type);
            }
            else {
                cell.updateType(CellType.PATH);
            }
        }
    } 


    //Used after animate edge to clear the animation
    clearEdgeAnimation(edge : Edge | undefined | null) : void {
        if (edge === undefined || edge === null){
            throw new Error(Canvas.edgeError); 
        }

        const [currentCell, edgeCell, nextCell, weight] = edge;
        for (let cell of [currentCell, edgeCell, nextCell]){
            this.animateCell(cell);
        }
    }


    //Used in animateEdge to animate a single cell
    private animateCell(edgeCell : Cell) : void {
        const canvas_yPos : number = edgeCell.yPos * this.cellSide + this.offsetY; 
        const canvas_xPos : number = edgeCell.xPos * this.cellSide + this.offsetX; 
        this.context.fillStyle = ColorMap.getColor(edgeCell.type); 
        this.context.fillRect(canvas_xPos, canvas_yPos, this.cellSide, this.cellSide); 
    }
    

    //Draws the whole maze, not used during the animation of the algorithm
    //Used when the maze size changes, or to reset the maze. 
    drawGraphicalMaze() : void {
        for (let yPos = 0; yPos < this.mazeHeight; yPos++){
            for (let xPos = 0; xPos < this.mazeWidth; xPos++){
                const canvas_yPos : number = yPos * this.cellSide + this.offsetY; 
                const canvas_xPos : number = xPos * this.cellSide + this.offsetX; 
    
                if (yPos % 2 == 0 && xPos % 2 == 0){
                    this.context.fillStyle = ColorMap.getColor(CellType.PATH);
                    }
    
                else if (yPos % 2 == 1 && xPos % 2 == 1) {
                    this.context.fillStyle = ColorMap.getColor(CellType.WALL); 
                }
    
                else {
                    this.context.fillStyle = ColorMap.getColor(CellType.UNDECIDED);  
                }
    
                this.context.fillRect(canvas_xPos, canvas_yPos, this.cellSide, this.cellSide); 
            }
        }    
    }
    

    //Makes sure device is client
    drawMaze() : void {
        requestAnimationFrame(() => this.drawGraphicalMaze()); 
    }
}