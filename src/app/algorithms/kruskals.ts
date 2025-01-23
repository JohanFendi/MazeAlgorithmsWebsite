import { CellType, Edge } from "../datastructures/cell";
import { Algorithm} from "./algorithm";
import { DisjointedSet } from "../datastructures/disjointedSet";


export class Kruskals extends Algorithm {
    private readonly edges : Edge[] = []; 
    private readonly disjointedSet : DisjointedSet = new DisjointedSet(this.maze);
    private index : number = 0; 
  

    //Executes one step of algorithm
    protected override executeStep() : void {    
        const [currentCell, edgeCell, nextCell, weight] : Edge = this.edges[this.index]; 
        
        if (this.disjointedSet.union(currentCell, nextCell)){
            edgeCell.updateType(CellType.PATH); 
        }

        else {
            edgeCell.updateType(CellType.WALL); 
        }

        this.index++; 
    }  


    //Checks is the index on the edges list is out of bounds, 
    //which would mean that the algorithm as traversed all the edges and is finished.
    protected override algorithmComplete(): boolean {
        return this.index >= this.edges.length; 
    }


    //Gets all the edges, and shuffles them. Does not visit any cell. 
    protected override prepareAlgorithm(): void {
        for (let yPos = 0; yPos < this.maze.height; yPos += 2){
            for (let xPos = 0; xPos < this.maze.width; xPos += 2){
                if (xPos + 2 < this.maze.width){
                    this.edges.push([this.maze.grid[yPos][xPos], this.maze.grid[yPos][xPos+1], 
                    this.maze.grid[yPos][xPos+2], Math.random()]);
                }

                if (yPos + 2 < this.maze.height) {
                    this.edges.push([this.maze.grid[yPos][xPos], this.maze.grid[yPos+1][xPos],
                    this.maze.grid[yPos+2][xPos], Math.random()]);
                }
            }
        }
        this.edges.sort((tup1, tup2) => tup1[3] - tup2[3]); //Sorting the edges based on weight, i.e.shuffling
    }




}


