import { Cell } from "./app.cell";
import { CellType } from "./app.colorsCellTypes";


export class Maze {
    static readonly cellWidth : number = 10; //px
    readonly grid : Cell[][] = []; 
    readonly height : number = 0; 
    readonly width : number = 0; 

    constructor(width : number, height : number){
        this.height = Maze.adjustParameter(height); 
        this.width = Maze.adjustParameter(width); 
        this.createGrid(this.width,this.height); 
    }

    private static adjustParameter(n : number) : number{ // makes sure value is on the line y = 3x+2
        return 2 * Math.trunc((n - 3) / 2) + 3; 
    }

    private createGrid(width : number, height : number) : void{
        for (let yPos = 0; yPos < height; yPos++){
            this.grid.push([]); 
            for (let xPos = 0; xPos < width; xPos++){

                if (yPos % 2 == 0 && xPos % 2 == 0){
                  this.grid[yPos].push(new Cell(xPos, yPos, CellType.PATH));
                }

                else if (yPos % 2 == 0 && xPos % 2 == 1){
                    this.grid[yPos].push(new Cell(xPos, yPos, CellType.UNDECIDED));
                }

                else if (yPos % 2 == 1 && xPos % 2 == 0){
                    this.grid[yPos].push(new Cell(xPos, yPos, CellType.UNDECIDED));
                }

                else {
                    this.grid[yPos].push(new Cell(xPos, yPos, CellType.WALL));
                }
            }
        }
    }

    public logMaze(): void { //For debugging
        for (let row of this.grid){
            let res : String = ""; 
            for (let cell of row){
                res += cell.type + " "; 
            }
        console.log(res); 
        }
    } 
}