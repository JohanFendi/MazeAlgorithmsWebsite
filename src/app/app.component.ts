import { Component, ElementRef, ViewChild, PLATFORM_ID, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgFor, isPlatformBrowser } from '@angular/common';

import { Maze } from './datastructures/maze';
import { drawGraphicalMaze } from './algorithms/drawGraphicalMaze';
import { Prims } from './algorithms/prims';
import { Kruskals } from './algorithms/kruskals';
import { Algorithm } from './algorithms/algorithm';


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
    this.algorithmObj = new Prims(this.delay, maze, this.mazeCanvasRef, this.running, this.paused);
    this.algorithmObj.run();
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
