import { Component, ElementRef, ViewChild, PLATFORM_ID, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgFor, isPlatformBrowser } from '@angular/common';

import { Maze } from './datastructures/app.maze';
import { drawGraphicalMaze } from './algorithms/app.drawGraphicalMaze';
import { KruskalsObj } from './algorithms/app.kruskals';


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
  private running: { value: boolean } = { value : false };
  private paused: { value: boolean } = { value : false }; 
  
  pauseButtonText: string = "PAUSE"; 

  //Gets value of maze height from html slider
  public getMazeHeight(heightSlider : HTMLInputElement) : void {
    this.mazeHeight = Number(heightSlider.value); 
    this.drawMaze();
  }


  //Gets value of maze width from html slider
  public getMazeWidth(widthSlider : HTMLInputElement) : void {
    this.mazeWidth = Number(widthSlider.value); 
    this.drawMaze();
  }


  ngOnInit():void{
  }

  
  ngAfterViewInit() : void{
    this.drawMaze(); 
  }


  startKruskals() : void {
    if (this.running.value){
      return;
    }

    if (this.mazeCanvasRef === undefined){
      throw new Error(AppComponent.canvasError); 
    }

    this.running.value = true; 
    const maze : Maze = new Maze(this.mazeWidth, this.mazeHeight); 
    const kruskals = new KruskalsObj(500, maze, this.mazeCanvasRef, this.running, this.paused); 
    kruskals.run(); 
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
    drawGraphicalMaze(this.mazeHeight, this.mazeWidth, this.mazeCanvasRef!); 
  }


  //Makes sure device is client and canvas is defined before drawing
  drawMaze(): void {
    if (this.mazeCanvasRef === undefined){
      throw new Error(AppComponent.canvasError); 
    }

    if (isPlatformBrowser(this.platform_id)){
      requestAnimationFrame(() => drawGraphicalMaze(this.mazeHeight, this.mazeWidth, this.mazeCanvasRef!)); 
    }
  }
}
