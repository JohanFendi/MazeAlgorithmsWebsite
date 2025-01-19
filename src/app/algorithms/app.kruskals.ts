import { Maze } from "../datastructures/app.maze";
import { CellType, Cell } from "../datastructures/app.cell";
import { drawGraphicalMaze } from "./app.drawGraphicalMaze";
import { Algorithm } from "./app.algorithm";


export class KruskalsObj extends Algorithm{ 
    
    override run() : void {
        this.maze.createEdges();
        const disjointedSet : DisjointedSet = new DisjointedSet(this.maze); 
        const index : {value : number} = { value : 0 }; 
        drawGraphicalMaze(this.maze.height, this.maze.height, this.mazeCanvasRef);
        let intervalId : NodeJS.Timeout = setInterval(() => this.step(index, intervalId,  disjointedSet), this.delay);
    }

    //Executes one step of kruskals algorithm. Updates the index variable by using it's passed in reference
    public step(index : {value : number}, intervalId : NodeJS.Timeout, disjointedSet : DisjointedSet) : void {

        if (index.value >= this.maze.edges.length || this.running.value === false){
            clearInterval(intervalId); 
            this.running.value = false; 
            this.paused.value = false; 
            return
        } 

        if (this.paused.value === true){
            return; 
        }
        
        const edge : [Cell, Cell, Cell, number] = this.maze.edges[index.value]; 
        const cell1 : Cell = edge[0]; 
        const edgeCell : Cell = edge[1]; 
        const cell2 : Cell = edge[2]
        
        edgeCell.updateType(CellType.BEINGDECIDED); 
        
        if (disjointedSet.union(cell1, cell2)){
            edgeCell.updateType(CellType.PATH); 
        }

        else {
            edgeCell.updateType(CellType.WALL); 
        }

        index.value ++; 

        this.animate(edgeCell);
        
    }  
}


class DisjointedSet {
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