import { Canvas } from "../datastructures/app.canvas";
import { Maze } from "../datastructures/app.maze";
import { ElementRef } from "@angular/core";
import { Cell, ColorMap, Edge , CellType} from "../datastructures/app.cell";




export class Algorithm {
    private readonly notImplementedError : string = "Method has to be implemented in subclass.";
    private readonly edgeError : string = "Edge is undefined";
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


    //To be used in run method of subclass to update the delay of the algorithm
    updateDelay() : void {
        if (this.intervalId === null){
            throw new Error(this.intervalIdError); 
        }
        
        clearInterval(this.intervalId!); 
        this.intervalId = setInterval(() => this.step(), this.delay.value);  
    }


    //To be overridden
    run() : void {
        throw new Error(this.notImplementedError); 
    }


    //To be overridden
    protected step() : void {
        throw new Error(this.notImplementedError); 
    }

    //To be overridden
    protected executeStep() : void {
        throw new Error(this.notImplementedError);
    }


    // Only draws the edgecell being processed, thus avoiding drawing the whole maze. 
    protected animateStep(edge : Edge | undefined) : void {
        if (edge === undefined){
            throw new Error(this.edgeError); 
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


    protected clearAnimation(edge : Edge | undefined) : void {
        if (edge === undefined){
            throw new Error(this.edgeError); 
        }

        const [currentCell, edgeCell, nextCell, weight] = edge;
        for (let cell of [currentCell, edgeCell, nextCell]){
            this.animateCell(cell);
        }
    }

    private animateCell(edgeCell : Cell) : void {
        const canvas_yPos : number = edgeCell.yPos * this.canvas.cellSide + this.canvas.offsetY; 
        const canvas_xPos : number = edgeCell.xPos * this.canvas.cellSide + this.canvas.offsetX; 
        this.canvas.context.fillStyle = ColorMap.getColor(edgeCell.type); 
        this.canvas.context.fillRect(canvas_xPos, canvas_yPos, this.canvas.cellSide, this.canvas.cellSide); 
    }

    
}