import { CellType, Cell, Edge} from "../datastructures/app.cell";
import { drawGraphicalMaze } from "./app.drawGraphicalMaze";
import { Algorithm } from "./app.algorithm";
import { Heap } from "heap-js"; 


//Prims algorithm for generating a maze
export class PrimsObj extends Algorithm {
    private readonly frontier : Heap<Edge> = new Heap((a, b) => b[3] - a[3]);  
    private readonly visited = this.createVisitedArray(); 
    

    override run():void {
        const [startX, startY] : [number, number] = this.getStartCordinates();        
        this.visited[startY][startX] = true;
        for (let edge of this.getNeighbouringEdges(this.maze.grid[startY][startX], this.visited)){
            this.frontier.push(edge); //Add all edges of starting cell to frontier
        }

        drawGraphicalMaze(this.maze.height, this.maze.height, this.mazeCanvasRef);
        this.intervalId = setInterval(() => this.step(),this.delay.value);
    }


    protected override step() : void {
        if (this.paused.value === true){
            return
        }

        if (this.running.value === false){
            clearInterval(this.intervalId); 
            this.running.value = false; 
            this.paused.value = false; 
            return
        } 

        if (this.stepCount % 3 === 0){
            this.executeStep();
        }

        else if (this.stepCount % 3 === 1){
            this.animateStep(this.lastEdge);
        }

        else {
            this.clearAnimation(this.lastEdge);
        }


        this.stepCount++;


    }


    protected override executeStep () : void{ 
        if (this.intervalId === null){
            throw new Error(this.intervalIdError); 
        }

        if (this.paused.value === true || this.frontier.size() === 0){
            return; 
        }
       
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


    private getStartCordinates(): [number, number]{ //Makes sure startCordinates are on line 3 + 2x = y; 
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