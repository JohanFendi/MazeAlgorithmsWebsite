import { CellType, Cell } from "./app.cell";



//Grid, edges, width and height are to be read. 
export class Maze {
    private static readonly invalidDimensionsError : string = `Dimensions of mazes (y) must give positive 
                                                        integer value of x on the line: 3 + 2x = y`
    readonly grid : Cell[][]; 
    readonly edges : [Cell, Cell, Cell, number][]; 
    
    
    constructor( readonly width : number, readonly height : number){
        this.checkValidDimensions(); 
        this.grid = this.createGrid(); 
        this.edges = this.createEdges(); 
    }


    //Dimensions of mazes (y) must give positive integer value of x on the line: 3 + 2x = y. 
    // 3 + 2x = y <=> x = (y-3) / 2
    private checkValidDimensions() : void{
        const validHeight : boolean = Number.isInteger((this.width-3)/2); 
        const validWidth : boolean = Number.isInteger((this.height-3)/2); 
        if (!validHeight && !validWidth){
            throw new Error(Maze.invalidDimensionsError); 
        }
    }

    
    private createGrid() : Cell[][]{
        const grid : Cell[][] = []; 
        for (let yPos = 0; yPos < this.height; yPos++){
            grid.push([]); 
            for (let xPos = 0; xPos < this.width; xPos++){

                if (yPos % 2 == 0 && xPos % 2 == 0){
                  grid[yPos].push(new Cell(xPos, yPos, CellType.PATH));
                }

                else if (yPos % 2 == 1 && xPos % 2 == 1){
                    grid[yPos].push(new Cell(xPos, yPos, CellType.WALL));
                }

                else {
                    grid[yPos].push(new Cell(xPos, yPos, CellType.UNDECIDED));
                }
            }
        }
        return grid; 
    }


    //[Cell1, cell2, edgeWeight (0-1)]
    private createEdges () : [Cell, Cell, Cell, number][]{
        const edges : [Cell, Cell, Cell, number][] = []; 

        for (let yPos = 0; yPos < this.height; yPos += 2){
            for (let xPos = 0; xPos < this.width; xPos += 2){
                if (xPos + 2 < this.width){
                    edges.push([this.grid[yPos][xPos], this.grid[yPos][xPos+1], 
                    this.grid[yPos][xPos+2], Math.random()]);
                }

                if (yPos + 2 < this.height) {
                    edges.push([this.grid[yPos][xPos], this.grid[yPos+1][xPos],
                    this.grid[yPos+2][xPos], Math.random()]);
                }
            }
        }
        edges.sort((tup1, tup2) => tup1[3] - tup2[3]); //Sorting the edges based on weight, i.e.shuffling
        return edges; 
    }
}