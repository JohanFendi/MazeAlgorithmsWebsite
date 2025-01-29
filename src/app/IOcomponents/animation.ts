import { Canvas } from "./canvas";
import { Algorithm } from "../algorithms/algorithm";
import { Prims } from "../algorithms/prims";
import { Maze } from "../datastructures/maze";
import { Edge } from "../datastructures/cell";
import { Kruskals } from "../algorithms/kruskals";


//Actually runs the algorithm by using a canvas and an algorithm object
export class Animation{

    private static readonly LASTEDGEERROR : string = "LastEdgeError : lastEdge is undefined while algorithm is running. "
    private static readonly ALGOUNDEFINEDERROR : string = `AlgorrithmUndefinedError : algorithm which is 
                                                        passed into constructor of animation is undefined.`

    //Instance variables
    private intervalId : NodeJS.Timeout | undefined = undefined;
    private algorithm : Algorithm; 
    private paused : boolean = false; 
    private stepCounter : number = 0; 
    private lastEdge : Edge | undefined; 


    constructor(private readonly canvas : Canvas, maze : Maze, algorithm : new (maze : Maze) => Algorithm){
        if (algorithm === undefined){
            throw new Error(Animation.ALGOUNDEFINEDERROR); 
        }
        console.log(algorithm); 
        this.algorithm = new algorithm(maze); 
        this.canvas.drawGraphicalMaze();
    } 


    //used in appState class
    togglePause() : void{
        this.paused = !this.paused; 
    }


    //Takes delay value from appState and creates a new interval
    createNewInterval(newDelay : number):void{
        if (this.intervalId !== undefined){
            clearInterval(this.intervalId);
        }
   
        this.intervalId = setInterval(() => this.step(), newDelay);
    }


    stopAlgorithm () : void {
        clearInterval(this.intervalId); 
    }


    //Alternates between executing and animating a step or clearing previous step animation. 
    private step():void{
        if (this.stepCounter === 0){
            this.algorithm.prepare(); 
        }

        if (this.algorithm.isComplete()){

            if (this.lastEdge == undefined){
                throw new Error(Animation.LASTEDGEERROR); 
            }
            
            this.canvas.clearEdgeAnimation(this.lastEdge); 
            clearInterval(this.intervalId);
            return; 
        }

        if (this.paused){
            return; 
        }

        if (this.stepCounter % 2 == 0){
            this.lastEdge = this.algorithm.executeStep(); 
            this.canvas.animateEdge(this.lastEdge); 
        }

        else {
            if (this.lastEdge == undefined){
                throw new Error(Animation.LASTEDGEERROR); 
            }
            this.canvas.clearEdgeAnimation(this.lastEdge); 
        }

        this.stepCounter ++; 
    }    
}