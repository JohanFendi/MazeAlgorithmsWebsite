import { Component, ElementRef, ViewChild, PLATFORM_ID, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NgFor, isPlatformBrowser } from '@angular/common';

import { Maze } from './datastructures/maze';
import { Prims } from './algorithms/prims';
import { Kruskals } from './algorithms/kruskals';
import { Algorithm } from './algorithms/algorithm';
import { appState } from './IOmodules/appState';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NgFor],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})


export class AppComponent {
  title = 'maze-generation-visualizer';
  
  
  @ViewChild('mazeCanvas') mazeCanvasRef: ElementRef<HTMLCanvasElement> | undefined;    
  protected appStateObj : appState = new appState();

  
  ngAfterViewInit() : void{
    this.appStateObj.drawMaze(this.mazeCanvasRef); 
  }
}
