import { ElementRef } from "@angular/core";
import { Maze } from "./app.maze";
import { ColorMap, CellType } from "./app.colorsCellTypes";



export class MazeAlgos {


    // Draws the maze when algorithm is not started
    // Does so not by creating a maze object, therefore being more efficient
    public static drawGraphicalMaze(mazeHeight : number, mazeWidth : number, mazeCanvasRef : ElementRef<HTMLCanvasElement>) : void {
        const mazeCanvasEl : HTMLCanvasElement = mazeCanvasRef.nativeElement; 
        mazeCanvasEl.width = mazeCanvasEl.clientWidth; 
        mazeCanvasEl.height = mazeCanvasEl.clientHeight; 
        let context = mazeCanvasEl.getContext('2d');  

        if (!context){
            throw new Error("ContextError : Context is null")
        }
     
        const cellSide : number = mazeCanvasEl.clientHeight / Math.max(mazeHeight, mazeWidth); 
        const offsetY : number = Math.max((mazeWidth-mazeHeight)*cellSide / 2, 0); 
        const offsetX : number = Math.max((mazeHeight-mazeWidth)*cellSide / 2, 0);
        
        for (let yPos = 0; yPos < mazeHeight; yPos++){
            for (let xPos = 0; xPos < mazeWidth; xPos++){
                const canvas_yPos : number = yPos * cellSide + offsetY; 
                const canvas_xPos : number = xPos * cellSide + offsetX; 

                if (yPos % 2 == 0 && xPos % 2 == 0){
                    context.fillStyle = ColorMap.getColor(CellType.PATH);
                    }
    
                else if (yPos % 2 == 0 && xPos % 2 == 1){
                    context.fillStyle = ColorMap.getColor(CellType.UNDECIDED); 
                }

                else if (yPos % 2 == 1 && xPos % 2 == 0){
                    context.fillStyle = ColorMap.getColor(CellType.UNDECIDED);  
                }

                else {
                    context.fillStyle = ColorMap.getColor(CellType.WALL); 
                }

                context.fillRect(canvas_xPos, canvas_yPos, cellSide, cellSide); 
            }
        } 
    }
}