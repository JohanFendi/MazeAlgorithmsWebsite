import { Cell, CellType } from "./app.cell";
import { Maze } from "./app.maze";


export class DisjointedSet {
    private readonly parent : Map<Cell, Cell> = new Map <Cell, Cell> (); 
    private readonly rank : Map<Cell, number> = new Map <Cell, number> (); 
    private readonly findError : string =  `DisjointedSetFindError: Parent of cell should ¨
                                            be either self pointer or other cell, not undefined.`; 
    private readonly unionError : string = `DisjointedSetError: Rank of cell should be number, 
                                            not undefined `; 
    constructor(maze : Maze){
        for (let row of maze.grid){
            for (let cell of row){
                if (cell.type !== CellType.WALL){
                    this.parent.set(cell, cell); //Self pointer indicating parent,
                    this.rank.set(cell, 0);
                }
            }
        }
    }

    public union(cell1 : Cell, cell2 : Cell) : boolean {
        const cell1Parent : Cell = this.find(cell1); 
        const cell2Parent : Cell = this.find(cell2); 

        if (cell1Parent === cell2Parent){
            return false; 
        }

        const rank1 : number | undefined = this.rank.get(cell1Parent); 
        const rank2 : number | undefined = this.rank.get(cell2Parent);  

        if (rank1 === undefined || rank2 === undefined){
            throw new Error(this.unionError); 
        }

        if (rank1 > rank2){
            this.parent.set(cell2Parent, cell1Parent); 
        }
        else if (rank1 < rank2){
            this.parent.set(cell1Parent, cell2Parent); 
        }
        else {
            this.parent.set(cell2Parent, cell1Parent); 
            this.rank.set(cell1Parent, rank1 + 1); 
        }

        return true; 
    } 


    public find(cell : Cell) : Cell {
        let parentCell : Cell | undefined = this.parent.get(cell); 
        
        if (parentCell === undefined){
            throw new Error(this.findError); 
        } 

        if (parentCell === cell){
            return cell; 
        }

        this.parent.set(cell, this.find(parentCell)); 
        
        return this.parent.get(cell)!;
    }
}