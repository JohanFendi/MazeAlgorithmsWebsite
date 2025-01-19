import { ElementRef } from '@angular/core';


//Immutable dataclass for html canvas. 
//The canvas is used in draw graphical maze and in the animate function of the algorithm class.
export class Canvas {
    private static readonly contextNullError : string = `Canvas-Context is Null.`
    readonly mazeCanvasElement : HTMLCanvasElement; 
    readonly offsetX : number;
    readonly offsetY : number; 
    readonly cellSide : number; 
    readonly context : CanvasRenderingContext2D; 


    constructor(readonly mazeHeight : number, readonly mazeWidth : number, mazeCanvasRef : ElementRef<HTMLCanvasElement>)
    {
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

   

}