import { CellType, Edge } from "../datastructures/app.cell";
import { drawGraphicalMaze } from "./app.drawGraphicalMaze";
import { Algorithm} from "./app.algorithm";
import { DisjointedSet } from "../datastructures/app.disjointedSet";


export class KruskalsObj extends Algorithm {
    private readonly edges : Edge[] = []; 
    private readonly disjointedSet : DisjointedSet = new DisjointedSet(this.maze);
    private index : number = 0; 
    

    override run() : void {
        this.createEdges();
        drawGraphicalMaze(this.maze.height, this.maze.height, this.mazeCanvasRef);
        this.intervalId = setInterval(() => this.step(), this.delay.value);
    }


    protected override step() : void {
        
        if (this.intervalId === null){
            throw new Error(this.intervalIdError); 
        }
        
        if (this.paused.value === true){
            return; 
        }
        
        if (this.index >= this.edges.length || this.running.value === false){
            clearInterval(this.intervalId); 
            this.running.value = false; 
            this.paused.value = false; 
            return
        } 
        
        const [currentCell, edgeCell, nextCell, weight] : Edge = this.edges[this.index]; 
        
        if (this.disjointedSet.union(currentCell, nextCell)){
            edgeCell.updateType(CellType.PATH); 
        }

        else {
            edgeCell.updateType(CellType.WALL); 
        }

        this.index++; 

        this.animateStep([currentCell, edgeCell, nextCell, weight]);
    }  


    public createEdges () : void {
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


