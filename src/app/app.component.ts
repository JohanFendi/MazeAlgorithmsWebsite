import { Component, ElementRef, ViewChild, PLATFORM_ID, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgFor, isPlatformBrowser } from '@angular/common';

import { Maze } from './algorithms/app.maze';
import { MazeAlgos } from './algorithms/app.mazeAlgos';
import { unwatchFile } from 'fs';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'maze-generation-visualizer';
  readonly canvasError : string = "CanvasError: mazeCanvasRef is undefined"
  private mazeHeight : number = 25; //Number of cells
  private mazeWidth : number = 25; // Number of cells

  private readonly platform_id = inject(PLATFORM_ID); 
  @ViewChild('mazeCanvas') private mazeCanvasRef: ElementRef<HTMLCanvasElement> | undefined;    


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



  //Runs important checks before drawing mazw
  drawMaze(): void {
    if (this.mazeCanvasRef === undefined){
      throw new Error(this.canvasError); 
    }

    if (isPlatformBrowser(this.platform_id)){
      requestAnimationFrame(() => MazeAlgos.drawGraphicalMaze(this.mazeHeight, this.mazeWidth, this.mazeCanvasRef!)); 
    }
  }
}
