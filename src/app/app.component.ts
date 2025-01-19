import { Component, ElementRef, ViewChild, PLATFORM_ID, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgFor, isPlatformBrowser } from '@angular/common';

import { Maze } from './datastructures/app.maze';
import { drawGraphicalMaze } from './algorithms/app.drawGraphicalMaze';
import { PrimsObj } from './algorithms/app.prims';
import { KruskalsObj } from './algorithms/app.kruskals';
import { Algorithm } from './algorithms/app.algorithm';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'maze-generation-visualizer';
  static readonly canvasError : string = "CanvasError: mazeCanvasRef is undefined"

  private readonly platform_id = inject(PLATFORM_ID); 
  @ViewChild('mazeCanvas') private mazeCanvasRef: ElementRef<HTMLCanvasElement> | undefined;    


  private mazeWidth : number = 25; // Number of cells
  private mazeHeight : number = 25; //Number of cells
  private delay : {value : number} = {value : 100} ; //Delay in ms between each step of the algorithm
  private running: { value: boolean } = { value : false };
  private paused: { value: boolean } = { value : false }; 
  pauseButtonText: string = "PAUSE"; 

  private algorithmObj : Algorithm | undefined;

  //Gets value of maze height from html slider
  getMazeHeight(heightSlider : HTMLInputElement) : void {
    this.mazeHeight = Number(heightSlider.value); 
    this.drawMaze();
  }


  //Gets value of maze width from html slider
  getMazeWidth(widthSlider : HTMLInputElement) : void {
    this.mazeWidth = Number(widthSlider.value); 
    this.drawMaze();
  }


  //Gets value of delay from html slider
  getAlgorithmDelay(delaySlider : HTMLInputElement) : void {
    this.delay.value = Number(delaySlider.value); 

    if (this.algorithmObj !== undefined){
      this.algorithmObj.updateDelay(); 
    }
  }

  
  ngAfterViewInit() : void{
    this.drawMaze(); 
  }


  startAlgorithm() : void {
    if (this.running.value){
      return;
    }

    if (this.mazeCanvasRef === undefined){
      throw new Error(AppComponent.canvasError); 
    }

    this.running.value = true; 
    const maze : Maze = new Maze(this.mazeWidth, this.mazeHeight); 
    this.algorithmObj = new KruskalsObj(this.delay, maze, this.mazeCanvasRef, this.running, this.paused);
    this.algorithmObj.run();
  }


  //User can only pause while the algorithm is running.
  togglePause() : void {
    if (this.running.value === true){ 
      this.paused.value = !this.paused.value;
      this.pauseButtonText = this.paused.value === true ? "RESUME" : "PAUSE"; 
    } 
  }


  resetMaze():void{
    this.running.value = false; 
    this.paused.value = false; 
    this.pauseButtonText = "PAUSE";
    drawGraphicalMaze(this.mazeHeight, this.mazeWidth, this.mazeCanvasRef!); 
  }


  //Makes sure device is client and canvas is defined before drawing
  drawMaze() : void {
    if (this.mazeCanvasRef === undefined){
      throw new Error(AppComponent.canvasError); 
    }

    if (isPlatformBrowser(this.platform_id)){
      requestAnimationFrame(() => drawGraphicalMaze(this.mazeHeight, this.mazeWidth, this.mazeCanvasRef!)); 
    }
  }
}
