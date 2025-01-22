import { Animation } from "./animation";


//Handles IO. Manipulates the animation object bassed on the IO values
export class appState {
    private animationObj : Animation | undefined;

    constructor(private mazeHeight : number, 
                private mazeWidth : number, 
                private delay : number, 
                private running : boolean, 
                private paused : boolean, 
                private pauseButtonText : string){}


    //Methods get values from key html sliders and update the state of the app.
    getMazeHeight(heightSlider : HTMLInputElement) : void {
        if (!this.running){
            this.mazeHeight = Number(heightSlider.value); 
        }
    }


    getMazeWidth(widthSlider : HTMLInputElement) : void {
        if (!this.running){
            this.mazeWidth = Number(widthSlider.value); 
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
        this.pauseButtonText = this.paused === true ? "RESUME" : "PAUSE"; 
        } 
    }
    

    startAlgorithm() : void {
        this.running = true; 

        //Create new instance of algorithm class
        //Call run method of algorithm class
    }


    resetMaze():void{
        this.running = false; 
        this.paused = false; 
        this.pauseButtonText = "PAUSE";
    }

    //---------------------------------------------------------------------------


}