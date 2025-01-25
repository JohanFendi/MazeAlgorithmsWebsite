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
    private static readonly RESUMEBUTTONTEXT : string = "RESUME"; 
    private static readonly STARTBUTTONTEXT : string = "START"; 
    private static readonly RESETBUTTONTEXT : string = "RESET"; 


    //Instance variables
    private animationObj : Animation | undefined;
    private mazeHeight : number; 
    private mazeWidth : number;  
    private delay : number;  
    private running : boolean = false; 
    private paused : boolean = false; 
    private platfrom_id = inject(PLATFORM_ID); 
    private _pauseButtonText : string = appState.PAUSEBUTTONTEXT; 
    private _startButtonText : string = appState.STARTBUTTONTEXT; 

    
    //Takes inital maze side value from app component.
    constructor(mazeSide : number, initialDelay : number){
        this.mazeHeight = mazeSide; 
        this.mazeWidth = mazeSide; 
        this.delay = initialDelay; 
    }
   

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
    //Calculates delay as maxDelay - algorithmSpeed
    setAlgorithmDelay(speedSlider : HTMLInputElement, maxDelay : number) : void {
        this.delay = maxDelay - Number(speedSlider.value); 

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


    toggleRunning(mazeCanvasRef : ElementRef<HTMLCanvasElement>|undefined) : void {
        if (mazeCanvasRef === undefined){
            throw new Error(appState.MAZECANVASREFERROR); 
        }
        if (this.running) {
            this.resetAlgorithm(mazeCanvasRef); 
        } 
        else {
            this.startAlgorithm(mazeCanvasRef); 
        }
    }


    //Used in toggleRunning
    private startAlgorithm(mazeCanvasRef : ElementRef<HTMLCanvasElement>|undefined) {
        if (mazeCanvasRef === undefined){
            throw new Error(appState.MAZECANVASREFERROR); 
        }
        this.running = true; 
        this._startButtonText = appState.RESETBUTTONTEXT;
        const canvas : Canvas = new Canvas(this.mazeHeight, this.mazeWidth, mazeCanvasRef); 
        const maze : Maze = new Maze (this.mazeWidth, this.mazeHeight); 
        this.animationObj = new Animation(canvas, maze); 
        this.animationObj.createNewInterval(this.delay);   
    }


    //Used in toggleRunning
    private resetAlgorithm(mazeCanvasRef : ElementRef<HTMLCanvasElement>|undefined):void {
        if (this.animationObj === undefined){
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


    //Used in html
    get pauseButtonText(){
        return this._pauseButtonText; 
    }

    //Used in html
    get startButtonText(){
        return this._startButtonText; 
    }

    //---------------------------------------------------------------------------


    //Only used when algorithm is not running, in getMazeWidth/Height and resetAlgorithm
    drawMaze(mazeCanvasRef : ElementRef<HTMLCanvasElement> | undefined ):void{
        if (mazeCanvasRef === undefined){
            throw new Error(appState.MAZECANVASREFERROR); 
        }
      
        if (isPlatformBrowser(this.platfrom_id)){
            const canvas : Canvas = new Canvas(this.mazeHeight, this.mazeWidth, mazeCanvasRef!); 
            canvas.drawGraphicalMaze(); 
        }
    }
}