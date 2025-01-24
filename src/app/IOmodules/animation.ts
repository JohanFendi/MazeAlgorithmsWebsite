import { Canvas } from "./canvas";
import { Algorithm } from "../algorithms/algorithm";
import { Prims } from "../algorithms/prims";
import { Maze } from "../datastructures/maze";
import { Edge } from "../datastructures/cell";
import { Kruskals } from "../algorithms/kruskals";


//Handles interaction between the canvas and the algorithm
export class Animation{

    private static readonly LASTEDGEERROR : string = "LastEdgeError : lastEdge is undefined while algorithm is running. "

    //Instance methods
    private intervalId : NodeJS.Timeout | undefined = undefined;
    private algorithm : Algorithm; 
    private paused : boolean = false; 
    private stepCounter : number = 0; 
    private lastEdge : Edge | undefined; 


    constructor(private readonly canvas : Canvas, maze : Maze){
        this.algorithm = new Kruskals(maze); 
        this.canvas.drawGraphicalMaze();
    } 


    //used in appState class
    togglePause() : void{
        this.paused = !this.paused; 
    }


    //Takes delay value from appState and creates a new interval
    createNewInterval(delay : number):void{
        if (this.intervalId !== undefined){
            clearInterval(this.intervalId);
        }
   
        this.intervalId = setInterval(() => this.step(), delay);
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