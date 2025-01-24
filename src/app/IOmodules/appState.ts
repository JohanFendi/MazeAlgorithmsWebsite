import { isPlatformBrowser } from "@angular/common";
import { ElementRef, inject, PLATFORM_ID } from "@angular/core";
import assert from "assert";

import { Animation } from "./animation";
import { Maze } from "../datastructures/maze";
import { Canvas } from "./canvas";


//Handles IO. Manipulates the animation object bassed on the IO values
export class appState {

    //Final non-instance variables
    private static readonly MAZECANVASREFERROR : string = "CanvasError: mazeCanvasRef is undefined"; 
    private static readonly ANIMATIONOBJERROR: string = "AnimationObjError : AnimationObj undefined while animation running."
    private static readonly PAUSEBUTTONTEXT : string = "PAUSE";
    private static readonly RESUMEBUTTONTEXT : string = "REUSME"; 
    private static readonly STARTBUTTONTEXT : string = "START"; 
    private static readonly RUNNINGBUTTONTEXT : string = "RUNNING"; 
    private static readonly INITIALMAZESIDE : number = 11; 
    private static readonly INITIALDELAY : number = 100; 


    //Instance variables
    private animationObj : Animation | undefined;
    private mazeHeight : number = appState.INITIALMAZESIDE; 
    private mazeWidth : number = appState.INITIALMAZESIDE;  
    private delay : number = appState.INITIALDELAY;  
    private running : boolean = false; 
    private paused : boolean = false; 
    private platfrom_id = inject(PLATFORM_ID); 
    private _pauseButtonText : string = appState.PAUSEBUTTONTEXT; 
    private _startButtonText : string = appState.STARTBUTTONTEXT; 
   

    //Methods get values from key html sliders and update the state of the app.
    setMazeHeight(heightSlider : HTMLInputElement, mazeCanvasRef : ElementRef<HTMLCanvasElement>|undefined) : void {
        if (mazeCanvasRef == undefined){
            throw new Error(appState.MAZECANVASREFERROR); 
        }       
        this.mazeHeight = Number(heightSlider.value); 

        if (!this.running){
            this.drawMaze(mazeCanvasRef); 
        }
    }


    setMazeWidth(widthSlider : HTMLInputElement,  mazeCanvasRef : ElementRef<HTMLCanvasElement> |undefined) : void {
        if (mazeCanvasRef == undefined){
            throw new Error(appState.MAZECANVASREFERROR); 
        }
        this.mazeWidth = Number(widthSlider.value); 

        if (!this.running){
            this.drawMaze(mazeCanvasRef); 
        }
    }

    
    //If algorithm is running, creates a new interval in the animationObj
    setAlgorithmDelay(delaySlider : HTMLInputElement) : void {
        this.delay = Number(delaySlider.value); 

        if (this.running) {
            if (this.animationObj == undefined){
                throw new Error(appState.ANIMATIONOBJERROR); 
            }
            this.animationObj!.createNewInterval(this.delay); 
        }        
    }

    //---------------------------------------------------------------------------


    //Methods are triggered by html buttons and update the state of the app
    togglePause() : void {
    if (this.running){ 
        if (this.animationObj == undefined){
            throw new Error(appState.ANIMATIONOBJERROR); 
        }
        this.animationObj.togglePause(); 
        this.paused = !this.paused;
        this._pauseButtonText = this.paused === true ? appState.RESUMEBUTTONTEXT : appState.PAUSEBUTTONTEXT; 
        } 
    }


    startAlgorithm(mazeCanvasRef : ElementRef<HTMLCanvasElement>|undefined) : void {
        if (!this.running) {
            if (mazeCanvasRef == undefined){
                throw new Error(appState.MAZECANVASREFERROR); 
            }
            this.running = true; 
            this._startButtonText = appState.RUNNINGBUTTONTEXT;
            const canvas : Canvas = new Canvas(this.mazeHeight, this.mazeWidth, mazeCanvasRef); 
            const maze : Maze = new Maze (this.mazeWidth, this.mazeHeight); 
            this.animationObj = new Animation(canvas, maze); 
            this.animationObj.createNewInterval(this.delay);   
        }
    }


    reset(mazeCanvasRef : ElementRef<HTMLCanvasElement> | undefined ) : void{
        if (this.running) {
            if (this.animationObj == undefined){
                throw new Error(appState.ANIMATIONOBJERROR); 
            }

            //Reset buttontexts
            this._startButtonText = appState.STARTBUTTONTEXT;
            this._pauseButtonText = appState.PAUSEBUTTONTEXT;

            //Reset state
            this.running = false; 
            this.paused = false; 
            
            //Clear interval and dereference animationObj variable
            this.animationObj.stopAlgorithm(); 
            this.animationObj = undefined; 
            
            this.drawMaze(mazeCanvasRef); 
        }
    }

    //Used in html
    get pauseButtonText(){
        return this._pauseButtonText; 
    }


    get startButtonText(){
        return this._startButtonText; 
    }

    //---------------------------------------------------------------------------


    //Only used when algorithm is not running, in getMazeWidth/Height (and reset?)
    drawMaze(mazeCanvasRef : ElementRef<HTMLCanvasElement> | undefined ):void{
        if (mazeCanvasRef == undefined){
            throw new Error(appState.MAZECANVASREFERROR); 
        }
      
        if (isPlatformBrowser(this.platfrom_id)){
            const canvas : Canvas = new Canvas(this.mazeHeight, this.mazeWidth, mazeCanvasRef!); 
            canvas.drawGraphicalMaze(); 
        }
    }
}