import { ElementRef } from "@angular/core";
import { CellType, ColorMap } from "../datastructures/app.cell";
import { Canvas } from "../datastructures/app.canvas";


// Draws the maze when algorithm is not started
// Does so not by creating a maze object, therefore being more efficient
export function drawGraphicalMaze(mazeHeight : number, mazeWidth : number, mazeCanvasRef : ElementRef<HTMLCanvasElement>) : void {
    const canvas : Canvas = new Canvas(mazeHeight, mazeWidth, mazeCanvasRef);

    for (let yPos = 0; yPos < mazeHeight; yPos++){
        for (let xPos = 0; xPos < mazeWidth; xPos++){
            const canvas_yPos : number = yPos * canvas.cellSide + canvas.offsetY; 
            const canvas_xPos : number = xPos * canvas.cellSide + canvas.offsetX; 

            if (yPos % 2 == 0 && xPos % 2 == 0){
                canvas.context.fillStyle = ColorMap.getColor(CellType.PATH);
                }

            else if (yPos % 2 == 1 && xPos % 2 == 1) {
                canvas.context.fillStyle = ColorMap.getColor(CellType.WALL); 
            }

            else {
                canvas.context.fillStyle = ColorMap.getColor(CellType.UNDECIDED);  
            }

            canvas.context.fillRect(canvas_xPos, canvas_yPos, canvas.cellSide, canvas.cellSide); 
        }
    }    
}
