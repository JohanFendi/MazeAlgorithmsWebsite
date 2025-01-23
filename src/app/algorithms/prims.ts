import { CellType, Cell, Edge} from "../datastructures/cell";
import { Algorithm } from "./algorithm";
import { Heap } from "heap-js"; 


//Prims algorithm for generating a maze
export class Prims extends Algorithm {
    private readonly frontier : Heap<Edge> = new Heap((a, b) => b[3] - a[3]);  
    private readonly visited = this.createVisitedArray(); 
    

    //Checks if frontier is empty, which implies that the algorithm is complete.
    protected override algorithmComplete(): boolean {
        return this.frontier.length === 0; 
    }


    //Visits the first cell, adds its neighbours to frontier, and marks said cell as visited. 
    protected override prepareAlgorithm() : void {
        const [startX, startY] : [number, number] = this.getStartCordinates(); 
        const firstEdges : Edge[] = this.getNeighbouringEdges(new Cell(startX, startY, CellType.PATH), this.visited); 
        this.visited[startY][startX] = true; 

        for (let edge of firstEdges){
            this.frontier.add(edge);
        }
    }

    
    //Executes one step of algorithm
    protected override executeStep() : void{ 
        const [currentCell, edgeCell, nextCell, weight] : Edge = this.frontier.pop()!; //Not null since we checked size above
        this.lastEdge = [currentCell, edgeCell, nextCell, weight];

        if (this.visited[nextCell.yPos][nextCell.xPos]){
            edgeCell.updateType(CellType.WALL);
            
        }
        else  {
            this.visited[nextCell.yPos][nextCell.xPos] = true;
            edgeCell.updateType(CellType.PATH); 
            for (let newEdge of this.getNeighbouringEdges(nextCell, this.visited)){
                this.frontier.push(newEdge); 
            }
        }
    }

    
    //Creates boolean array that holds values determening if cell is visited. 
    private createVisitedArray():boolean[][]{
        const visited : boolean [][] = []; 
        for (let yPos = 0; yPos < this.maze.height; yPos ++){
            visited.push([]); 
            for (let xPos = 0; xPos < this.maze.width; xPos ++){
                visited[yPos].push(false); 
            }
        }
        return visited; 
    }


    //Gets all neighbours, horisontally and vertically, of cell. 
    private getNeighbouringEdges(currentCell : Cell, visited : boolean[][]) : Edge[]{
        const edges : Edge[] = []; 
        const yPos : number = currentCell.yPos; 
        const xPos : number = currentCell.xPos;

        if ((currentCell.yPos >= 2) && !visited[yPos-2][xPos]){ //Add upper neighbour
            edges.push([currentCell, this.maze.grid[yPos-1][xPos], this.maze.grid[yPos-2][xPos], Math.random()]);
        }
        if ((currentCell.yPos <= this.maze.height - 3) && !visited[yPos+2][xPos]){ //Add lower neighbour
            edges.push([currentCell, this.maze.grid[yPos+1][xPos], this.maze.grid[yPos+2][xPos], Math.random()]);
        }

        if ((currentCell.xPos >= 2) && !visited[yPos][xPos-2]){ //Add left neighbour
            edges.push([currentCell, this.maze.grid[yPos][xPos-1], this.maze.grid[yPos][xPos-2], Math.random()]);
        }

        if ((currentCell.xPos <= this.maze.width - 3) && !visited[yPos][xPos+2]){ //Add right neighbour
            edges.push([currentCell, this.maze.grid[yPos][xPos+1], this.maze.grid[yPos][xPos+2], Math.random()]);
        }

        return edges;
    }    


    //Returns a pair of coordinates (x,y), of even values. This is because start cell has to be a path. 
    private getStartCordinates(): [number, number]{ 
        let startX : number = Math.floor(Math.random() * (this.maze.width-1));
        let startY : number = Math.floor(Math.random() * (this.maze.height-1));

        if (startX % 2 === 1){
            startX = startX - 1;
        }

        if (startY % 2 === 1){
            startY = startY - 1;
        }

        return [startX, startY]; 
    } 
}