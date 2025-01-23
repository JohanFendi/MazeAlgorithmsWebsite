import { Canvas } from "./canvas";
import { Algorithm } from "../algorithms/algorithm";


//Handles interaction between the canvas and the algorithm
export class Animation{
    private intervalId : NodeJS.Timeout | undefined = undefined;
    private algorithm : Algorithm | undefined = undefined; 

    constructor(private readonly canvas : Canvas){
    } 


    //Takes delay value from appState and creates a new interval
    createNewInterval(delay : number):void{
        if (this.intervalId !== undefined){
            clearInterval(this.intervalId);
        }
   
        this.intervalId = setInterval(() => this.step(), delay);
    }

    step():void{}

    //Separate create interval and clear interval functions

    
}