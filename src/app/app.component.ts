import { Component, ElementRef, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgFor } from '@angular/common';

import { HeaderComponent } from './pageComponents/header/header.component';
import { appState } from './IOcomponents/appState';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgFor, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'maze-generation-visualizer';
  
  //Maze dimensions (y) have to be on line 3 + 2x = y.
  readonly MINMAZESIDE : number = 3; 
  readonly INITIALMAZESIDE : number = 25; 
  readonly MAXMAZESIDE : number = 3 + this.INITIALMAZESIDE * 2; 

  //Algorithm delay variables.
  readonly initialDelay : number = 150; 
  readonly maxDelay : number = this.initialDelay * 2; 
  
  //Used for animation of maze.
  @ViewChild('mazeCanvas') mazeCanvasRef: ElementRef<HTMLCanvasElement> | undefined;   
  
  //Main IO object. 
  protected appStateObj : appState = new appState(this.INITIALMAZESIDE, this.initialDelay); 
  
  ngAfterViewInit() : void{
    if (this.mazeCanvasRef === undefined){
      throw new Error("Bombaclat"); 
  }
    this.appStateObj.drawMaze(this.mazeCanvasRef); 
  }
}
