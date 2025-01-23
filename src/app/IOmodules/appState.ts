import { isPlatformBrowser } from "@angular/common";
import { Animation } from "./animation";
import { Canvas } from "./canvas";
import { ElementRef, inject, PLATFORM_ID } from "@angular/core";
import { Maze } from "../datastructures/maze";


//Handles IO. Manipulates the animation object bassed on the IO values
export class appState {


    //Final non-instance variables
    private static readonly MAZECANVASREFERROR : string = "CanvasError: mazeCanvasRef is undefined"; 
    private static readonly INITIALMAZESIDE : number = 11; 
    private static readonly PAUSEBUTTONTEXT : string = "pause";
    private static readonly RESUMEBUTTONTEXT : string = "resume"; 
    private static readonly INITIALDELAY : number = 100; 


    //Instance variables
    private animationObj : Animation | undefined;
    private mazeHeight : number = appState.INITIALMAZESIDE; 
    private mazeWidth : number = appState.INITIALMAZESIDE;  
    private delay : number = appState.INITIALDELAY;  
    private running : boolean = false; 
    private paused : boolean = false; 
    private pauseButtonText : string = appState.RESUMEBUTTONTEXT; 
    private platfrom_id = inject(PLATFORM_ID); 
   

    //Methods get values from key html sliders and update the state of the app.
    getMazeHeight(heightSlider : HTMLInputElement, mazeCanvasRef : ElementRef<HTMLCanvasElement>|undefined) : void {
        this.checkMazeCanvasRefError(mazeCanvasRef);

        if (!this.running){
            this.mazeHeight = Number(heightSlider.value); 
            this.drawMaze(mazeCanvasRef); 
        }
    }


    getMazeWidth(widthSlider : HTMLInputElement,  mazeCanvasRef : ElementRef<HTMLCanvasElement> |undefined) : void {
        this.checkMazeCanvasRefError(mazeCanvasRef);

        if (!this.running){
            this.mazeWidth = Number(widthSlider.value); 
            this.drawMaze(mazeCanvasRef); 
        } 
    }


    getAlgorithmDelay(delaySlider : HTMLInputElement) : void {
       
        this.delay = Number(delaySlider.value); 

        //if this.running , call function to update delay of algorithm inside animationObj
        
    }

    //---------------------------------------------------------------------------


    //Methods are triggered by html buttons and update the state of the app
    togglePause() : void {
    if (this.running === true){ 
        this.paused = !this.paused;
        this.pauseButtonText = this.paused === true ? appState.RESUMEBUTTONTEXT : appState.PAUSEBUTTONTEXT; 
        //Toggle pause in animationObj 
        } 
    }


    startAlgorithm() : void {
        this.running = true; 

        //Create new instance of algorithm class
        //Call run method of algorithm class (create interval)
    }


    resetMaze():void{
        this.running = false; 
        this.paused = false; 
        this.pauseButtonText = appState.RESUMEBUTTONTEXT;
        //Destroy animationObj
        //Create new canvas, and draw graphical maze
    }

    //---------------------------------------------------------------------------

    //Only used when algorithm is not running, in getMazeWidth/Height (and reset?)
    drawMaze(mazeCanvasRef : ElementRef<HTMLCanvasElement> | undefined ):void{
        this.checkMazeCanvasRefError(mazeCanvasRef); 
      
        if (isPlatformBrowser(this.platfrom_id)){
            const canvas : Canvas = new Canvas(this.mazeHeight, this.mazeWidth, mazeCanvasRef!); 
            canvas.drawGraphicalMaze(); 
        }
    }

   

    private checkMazeCanvasRefError(mazeCanvasRef : ElementRef<HTMLCanvasElement> | undefined ): void {
        if (mazeCanvasRef === undefined){
            throw new Error(appState.MAZECANVASREFERROR); 
        }
    }
}