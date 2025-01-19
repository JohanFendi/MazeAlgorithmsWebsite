import { Maze } from "../datastructures/app.maze";
import { CellType, Cell } from "../datastructures/app.cell";
import { drawGraphicalMaze } from "./app.drawGraphicalMaze";
import { Algorithm } from "./app.algorithm";
import { Heap } from "heap-js"; 
import { start } from "repl";

export class PrimsObj extends Algorithm {
    
    override run():void {
        const frontier : Heap<[Cell, Cell, Cell, number]> = new Heap((a, b) => b[3] - a[3]);  
        const [startX, startY] : [number, number] = this.getStartCordinates();
        const visited = this.getVisitedArray(); 
        
        visited[startY][startX] = true;
        for (let edge of this.getEdges(this.maze.grid[startY][startX], visited)){
            frontier.push(edge); //Add all edges of starting cell to frontier
        }

        drawGraphicalMaze(this.maze.height, this.maze.height, this.mazeCanvasRef);
        let intervalId : NodeJS.Timeout = setInterval(() => this.step(intervalId, frontier, visited), this.delay);
    }


    private step (intervalId : NodeJS.Timeout, frontier : Heap<[Cell, Cell, Cell, number]>, visited : boolean[][]): void{ 

        if (this.running.value === false){
            clearInterval(intervalId); 
            this.running.value = false; 
            this.paused.value = false; 
            return
        } 

        if (this.paused.value === true || frontier.size() === 0){
            return; 
        }

        const edge : [Cell, Cell, Cell, number] = frontier.pop()!; //Not null since we checked size above
        const edgeCell : Cell = edge[1];
        const nextCell : Cell = edge[2];

        edgeCell.updateType(CellType.BEINGDECIDED);
        this.animate(edgeCell);

        setTimeout(() => {
            if (visited[nextCell.yPos][nextCell.xPos]){
                edgeCell.updateType(CellType.WALL);
                
            }
            else  {
                visited[nextCell.yPos][nextCell.xPos] = true;
                edgeCell.updateType(CellType.PATH); 
                for (let newEdge of this.getEdges(nextCell, visited)){
                    frontier.push(newEdge); 
                }
            }
    
            this.animate(edgeCell); 

        }, 100);
        
    }

    private getVisitedArray():boolean[][]{
        const visited : boolean [][] = []; 
        for (let yPos = 0; yPos < this.maze.height; yPos ++){
            visited.push([]); 
            for (let xPos = 0; xPos < this.maze.width; xPos ++){
                visited[yPos].push(false); 
            }
        }
        return visited; 
    }


    private getEdges(currentCell : Cell, visited : boolean[][]) : [Cell, Cell, Cell, number][]{
        const edges : [Cell, Cell, Cell, number][] = []; 
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
            startX = Math.max(0, startX - 1);
        }

        if (startY % 2 === 1){
            startY = Math.max(0, startY - 1);
        }
        console.log(this.maze.width, this.maze.height);
        console.log(startX, startY);
        return [startX, startY]; 
    
    }
}